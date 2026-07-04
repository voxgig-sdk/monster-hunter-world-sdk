# MonsterHunterWorld SDK configuration


def make_config():
    return {
        "main": {
            "name": "MonsterHunterWorld",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://mhw-db.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "ailment": {},
                "armor": {},
                "armor_set": {},
                "charm": {},
                "decoration": {},
                "event": {},
                "item": {},
                "location": {},
                "monster": {},
                "motion_value": {},
                "skill": {},
                "weapon": {},
            },
        },
        "entity": {
      "ailment": {
        "fields": [
          {
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "protection",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "recovery",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 4,
          },
        ],
        "name": "ailment",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/ailments",
                "parts": [
                  "ailments",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/ailments/{id}",
                "parts": [
                  "ailments",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "armor": {
        "fields": [
          {
            "active": True,
            "name": "armor_set",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "asset",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "attribute",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "crafting",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "defense",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "rank",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "rarity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "resistance",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "skill",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "slot",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
        ],
        "name": "armor",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/armor",
                "parts": [
                  "armor",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/armor/{id}",
                "parts": [
                  "armor",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "armor_set": {
        "fields": [
          {
            "active": True,
            "name": "bonus",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "piece",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "rank",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
        ],
        "name": "armor_set",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/armor/sets",
                "parts": [
                  "armor",
                  "sets",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/armor/sets/{id}",
                "parts": [
                  "armor",
                  "sets",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "charm": {
        "fields": [
          {
            "active": True,
            "name": "crafting",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "rarity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "skill",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
        ],
        "name": "charm",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/charms",
                "parts": [
                  "charms",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/charms/{id}",
                "parts": [
                  "charms",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "decoration": {
        "fields": [
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "rarity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "skill",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "slot",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
        ],
        "name": "decoration",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/decorations",
                "parts": [
                  "decorations",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/decorations/{id}",
                "parts": [
                  "decorations",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "event": {
        "fields": [
          {
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "end_timestamp",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "exclusive",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "expansion",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "location",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "platform",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "quest_rank",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "requirement",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "start_timestamp",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "success_condition",
            "req": False,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
        ],
        "name": "event",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/events",
                "parts": [
                  "events",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/events/{id}",
                "parts": [
                  "events",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "item": {
        "fields": [
          {
            "active": True,
            "name": "buy_price",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "carry_limit",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "rarity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "sell_price",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "value",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
        ],
        "name": "item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/items",
                "parts": [
                  "items",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/items/{id}",
                "parts": [
                  "items",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "location": {
        "fields": [
          {
            "active": True,
            "name": "camp",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "zone_count",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
        ],
        "name": "location",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/locations",
                "parts": [
                  "locations",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/locations/{id}",
                "parts": [
                  "locations",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "monster": {
        "fields": [
          {
            "active": True,
            "name": "ailment",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "element",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "location",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "resistance",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "reward",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "species",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "weakness",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 10,
          },
        ],
        "name": "monster",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/monsters",
                "parts": [
                  "monsters",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/monsters/{id}",
                "parts": [
                  "monsters",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "motion_value": {
        "fields": [
          {
            "active": True,
            "name": "damage_type",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "exhaust",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "hit",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "stun",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "weapon_type",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
        ],
        "name": "motion_value",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/motion-values",
                "parts": [
                  "motion-values",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/motion-values/{id}",
                "parts": [
                  "motion-values",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "skill": {
        "fields": [
          {
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "rank",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 3,
          },
        ],
        "name": "skill",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/skills",
                "parts": [
                  "skills",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/skills/{id}",
                "parts": [
                  "skills",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "weapon": {
        "fields": [
          {
            "active": True,
            "name": "asset",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "attack",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "attribute",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "crafting",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "damage_type",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "element",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "rarity",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "slot",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
        ],
        "name": "weapon",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/weapons",
                "parts": [
                  "weapons",
                ],
                "select": {
                  "exist": [
                    "p",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/weapons/{id}",
                "parts": [
                  "weapons",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "p",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
