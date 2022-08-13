---
sidebar_position: 11
title: NoSQL Data Stores
---

So-called "Schema-less" databases allow for arbitrary keys and values within the
entries in the database.  K/V stores and Objects add additional restrictions.

:::note

These data stores are capable of storing structured data.  Those use cases are
covered in the [Database demo](./database).

:::

## Arbitrary Data to Spreadsheets

There is no natural way to translate arbitrarily shaped schemas to worksheets
in a workbook.  One common trick is to dedicate one worksheet to holding named
keys.  For example, considering the JS object:

```json
{
  "title": "SheetDB",
  "metadata": {
    "author": "SheetJS",
    "code": 7262
  },
  "data": [
    { "Name": "Barack Obama", "Index": 44 },
    { "Name": "Donald Trump", "Index": 45 },
  ]
}
```

A dedicated worksheet should store the one-off named values:

```
XXX|        A        |    B    |
---+-----------------+---------+
 1 | Path            | Value   |
 2 | title           | SheetDB |
 3 | metadata.author | SheetJS |
 4 | metadata.code   |    7262 |
```

## Data Stores

### Redis

Redis has 5 core data types: "String", List", "Set", "Sorted Set", and "Hash".
Since the keys and values are limited to simple strings (and numbers), it is
possible to store complete databases in a single worksheet.

<details open><summary><b>Sample Mapping</b> (click to hide)</summary>

The first row holds the data type and the second row holds the property name.

Strings can be stored in a unified String table. The first column holds keys
and the second column holds values:

```
XXX|    A    |   B   |
---+---------+-------+
 1 | Strings |       |
 2 |         |       |
 3 | Hello   | World |
 4 | Sheet   | JS    |
```

Lists and Sets are unidimensional and can be stored in their own columns.  The
second row holds the list name:

```
XXX|    C    |   D   |
---+---------+-------+
 1 | List    | Set   |
 2 | List1   | Set1  |
 3 | List1V1 | Set1A |
 4 | List1V2 | Set1B |
```

Sorted Sets have an associated score which can be stored in the second column:

```
XXX|    E    | F |
---+---------+---+
 1 | Sorted  |   |
 2 | ZSet1   |   |
 3 | Key1    | 1 |
 4 | Key2    | 2 |
```

Hashes are stored like the string table, with key and value columns in order:

```
XXX|   G   |   H   |
---+-------+-------+
 1 | Hash  |       |
 2 | Hash1 |       |
 3 | Key1  | Val1  |
 4 | Key2  | Val2  |
```

</details>
