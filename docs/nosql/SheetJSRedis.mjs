/* sheetjs (C) 2013-present SheetJS -- https://sheetjs.com */
import { utils } from "xlsx";

/* Generate worksheet from database */
async function redis_to_ws(client) {
  /* Get a list of every item in the database */
  const keys = await client.KEYS("*");

  /* Collect the full contents */
  const data = [];
  for(let key of keys) {
    const type = await client.TYPE(key);
    let value;
    switch(type) {
      case "string": value = await client.GET(key); break;
      case "list": value = await client.LRANGE(key, 0, -1); break;
      case "set": value = await client.SMEMBERS(key); break;
      case "zset": value = await client.ZRANGE_WITHSCORES(key, 0, -1); break;
      case "hash": value = await client.HGETALL(key); break;
      default: console.warn(`unsupported type ${type}`); break
    }
    data.push({key, type, value});
  }

  /* Create a new worksheet and add the string table */
  const ws = utils.aoa_to_sheet([["Strings"]]);
  utils.sheet_add_aoa(ws, data.filter(r => r.type == "string").map(r => [r.key, r.value]), {origin: "A3"});

  /* Add the other types */
  let C = 2;
  data.forEach(row => {
    switch(row.type) {
      case "set":
      case "list": {
        /* `value` is an array.  aoa prepends type and key, then transposes to make a column */
        var aoa = [row.type == "set" ? "Set" : "List", row.key].concat(row.value).map(x => ([x]));
        utils.sheet_add_aoa(ws, aoa, {origin: utils.encode_col(C) + "1"});
        ++C;
      } break;
      case "zset": {
        /* `value` is an object with value/score keys. generate array with map and prepend metadata */
        var aoa = [["Sorted"], [row.key]].concat(row.value.map(r => ([r.value, r.score])));
        utils.sheet_add_aoa(ws, aoa, {origin: utils.encode_col(C) + "1"});
        C += 2;
      } break;
      case "hash": {
        /* `value` is an object.  Object.entries returns an array of arrays */
        var aoa = [["Hash"], [row.key]].concat(Object.entries(row.value));
        utils.sheet_add_aoa(ws, aoa, {origin: utils.encode_col(C) + "1"});
        C += 2;
      } break;
      case "string": break;
    }
  });

  return ws;
}

/* Generate array of Redis commands */
async function ws_to_redis(ws) {
  const cmds = [];
  /* Extract data from the worksheet */
  const aoa = utils.sheet_to_json(ws, { header: 1 });
  /* Iterate over the values in the first row */
  aoa[0].forEach((type, C) => {
    /* The name is exepcted in the second row, same column, unless type is Strings */
    if(type != "Strings" && !aoa[1][C]) throw new Error(`Column ${utils.encode_col(C)} missing name!`)
    switch(type) {
      case "Strings": {
        if(aoa[0][C+1]) throw new Error(`${type} requires 2 columns!`);
        /* For each row starting with SheetJS 2, check if key and value are present */
        for(let R = 2; R < aoa.length; ++R)
          if(aoa[R]?.[C] != null && aoa[R]?.[C+1] != null)
            /* When key and value are present, emit a SET command */
            cmds.push(["SET", [aoa[R][C], aoa[R][C+1]]]);
      } break;
      case "Set":
      case "List": {
        /* SADD (Set) / RPUSH (List) second argument is an array of values to add to the set */
        cmds.push([ type == "Set" ? "SADD" : "RPUSH",  [ aoa[1][C], aoa.slice(2).map(r => r[C]).filter(x => x != null) ]]);
      } break;
      case "Sorted": {
        /* ZADD second argument is an array of objects with `value` and `score` */
        if(aoa[0][C+1]) throw new Error(`${type} requires 2 columns!`);
        cmds.push([ "ZADD", [ aoa[1][C], aoa.slice(2).map(r => ({value: r[C], score:r[C+1]})).filter(x => x.value != null && x.score != null) ]]);
      } break;
      case "Hash": {
        /* HSET second argument is an object. `Object.fromEntries` generates object from an array of K/V pairs */
        if(aoa[0][C+1]) throw new Error(`${type} requires 2 columns!`);
        cmds.push([ "HSET", [ aoa[1][C], Object.fromEntries(aoa.slice(2).map(r => [r[C], r[C+1]]).filter(x => x[0] != null && x[1] != null)) ]]);
      } break;
      default: console.error(`Unrecognized column type ${type}`); break;
    }
  })
  return cmds;
}

export { ws_to_redis, redis_to_ws };