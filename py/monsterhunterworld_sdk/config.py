# MonsterHunterWorld SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "protection",
            "type": "`$OBJECT`",
          },
          {
            "name": "recovery",
            "type": "`$OBJECT`",
          },
        ],
        "name": "ailment",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "armor": {
        "fields": [
          {
            "name": "armorSet",
            "type": "`$OBJECT`",
          },
          {
            "name": "assets",
            "type": "`$OBJECT`",
          },
          {
            "name": "attributes",
            "type": "`$OBJECT`",
          },
          {
            "name": "crafting",
            "type": "`$OBJECT`",
          },
          {
            "name": "defense",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "type": "`$INTEGER`",
          },
          {
            "name": "resistances",
            "type": "`$OBJECT`",
          },
          {
            "name": "skills",
            "type": "`$ARRAY`",
          },
          {
            "name": "slots",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "name": "armor",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "armor_set": {
        "fields": [
          {
            "name": "bonus",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "pieces",
            "type": "`$ARRAY`",
          },
          {
            "name": "rank",
            "type": "`$STRING`",
          },
        ],
        "name": "armor_set",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "charm": {
        "fields": [
          {
            "name": "crafting",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "type": "`$INTEGER`",
          },
          {
            "name": "skills",
            "type": "`$ARRAY`",
          },
        ],
        "name": "charm",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "decoration": {
        "fields": [
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "type": "`$INTEGER`",
          },
          {
            "name": "skills",
            "type": "`$ARRAY`",
          },
          {
            "name": "slot",
            "type": "`$INTEGER`",
          },
        ],
        "name": "decoration",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "event": {
        "fields": [
          {
            "name": "camps",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "endTimestamp",
            "type": "`$STRING`",
          },
          {
            "name": "exclusive",
            "type": "`$STRING`",
          },
          {
            "name": "expansion",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "platform",
            "type": "`$STRING`",
          },
          {
            "name": "questRank",
            "type": "`$STRING`",
          },
          {
            "name": "requirements",
            "type": "`$STRING`",
          },
          {
            "name": "startTimestamp",
            "type": "`$STRING`",
          },
          {
            "name": "successConditions",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "zoneCount",
            "type": "`$INTEGER`",
          },
        ],
        "name": "event",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.location`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "item": {
        "fields": [
          {
            "name": "buyPrice",
            "type": "`$INTEGER`",
          },
          {
            "name": "carryLimit",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "type": "`$INTEGER`",
          },
          {
            "name": "sellPrice",
            "type": "`$INTEGER`",
          },
          {
            "name": "value",
            "type": "`$INTEGER`",
          },
        ],
        "name": "item",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "location": {
        "fields": [
          {
            "name": "camps",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "zoneCount",
            "type": "`$INTEGER`",
          },
        ],
        "name": "location",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "monster": {
        "fields": [
          {
            "name": "ailments",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "elements",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "locations",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "resistances",
            "type": "`$ARRAY`",
          },
          {
            "name": "rewards",
            "type": "`$ARRAY`",
          },
          {
            "name": "species",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "weaknesses",
            "type": "`$ARRAY`",
          },
        ],
        "name": "monster",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "motion_value": {
        "fields": [
          {
            "name": "damageType",
            "type": "`$STRING`",
          },
          {
            "name": "exhaust",
            "type": "`$INTEGER`",
          },
          {
            "name": "hits",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "stun",
            "type": "`$INTEGER`",
          },
          {
            "name": "weaponType",
            "type": "`$STRING`",
          },
        ],
        "name": "motion_value",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "skill": {
        "fields": [
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "ranks",
            "type": "`$ARRAY`",
          },
        ],
        "name": "skill",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "weapon": {
        "fields": [
          {
            "name": "assets",
            "type": "`$OBJECT`",
          },
          {
            "name": "attack",
            "type": "`$OBJECT`",
          },
          {
            "name": "attributes",
            "type": "`$OBJECT`",
          },
          {
            "name": "crafting",
            "type": "`$OBJECT`",
          },
          {
            "name": "damageType",
            "type": "`$STRING`",
          },
          {
            "name": "elements",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "type": "`$INTEGER`",
          },
          {
            "name": "slots",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "name": "weapon",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "p",
                      "orig": "p",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
