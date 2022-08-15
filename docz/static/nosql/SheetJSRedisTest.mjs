/* sheetjs (C) 2013-present SheetJS -- https://sheetjs.com */
import { utils, writeFile, set_fs } from "xlsx";
import { createClient } from "redis";
import { ws_to_redis, redis_to_ws } from "./SheetJSRedis.mjs";
import * as fs from 'fs';
set_fs(fs);

const client = createClient();
client.on("error", err => console.error("REDIS", err));
await client.connect();

/* This data is based on the Try Redis tutorial */
var init = [
  ["FLUSHALL", []],
  ["SADD",  ["birdpowers", ["flight", "pecking"]]],
  ["SET",   ["foo", "bar"]],
  ["SET",   ["baz", 0]],
  ["RPUSH", ["friends", ["sam", "alice", "bob"]]],
  ["ZADD",  ["hackers", [
    { score: 1906, value: 'Grace Hopper' },
    { score: 1912, value: 'Alan Turing' },
    { score: 1916, value: 'Claude Shannon'},
    { score: 1940, value: 'Alan Kay'},
    { score: 1953, value: 'Richard Stallman'},
    { score: 1957, value: 'Sophie Wilson'},
    { score: 1965, value: 'Yukihiro Matsumoto'},
    { score: 1969, value: 'Linus Torvalds'}
  ] ] ],
  ["SADD",  ["superpowers", ["flight", 'x-ray vision']]],
  ["HSET", ["user:1000", {
    "name": 'John Smith',
    "email": 'john.smith@example.com',
    "password": "s3cret",
    "visits": 1}]],
  ["HSET", ["user:1001", {
    "name": 'Mary Jones',
    "email": 'mjones@example.com',
    "password": "hunter2"}]]
];

/* Execute each command in order */
for(var i = 0; i < init.length; ++i) await client[init[i][0]](...init[i][1]);

/* Generate worksheet and disconnect */
const ws = await redis_to_ws(client);
await client.disconnect();

/* Create a workbook, add worksheet, and write to SheetJSRedis.xlsx */
const wb = utils.book_new();
utils.book_append_sheet(wb, ws, "database");
writeFile(wb, "SheetJSRedis.xlsx");

/* Generate and show the equivalent Redis commands from the worksheet */
const cmds = await ws_to_redis(ws);
cmds.forEach(x => console.log(x[0], x[1]));