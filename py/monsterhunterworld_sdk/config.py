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
            "slug": "monster-hunter-world",
            "version": "0.0.1",
            "target": "py",
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
            "short": "A short description of the ailment",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ID of the ailment",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the ailment",
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
            "short": "Dictionary of attribute modifiers attached to the armor piece",
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
            "short": "The ID of the armor piece",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the armor piece",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "short": "The rank of the armor piece",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "short": "The rarity of the armor piece",
            "type": "`$INTEGER`",
          },
          {
            "name": "resistances",
            "type": "`$OBJECT`",
          },
          {
            "name": "skills",
            "short": "An array of skill ranks granted by the armor",
            "type": "`$ARRAY`",
          },
          {
            "name": "slots",
            "short": "An array of decoration slot information",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "short": "The slot the armor piece fits in",
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
            "short": "The set bonus, if any",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "short": "The ID of the armor set",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the armor set",
            "type": "`$STRING`",
          },
          {
            "name": "pieces",
            "short": "Array of armor pieces in the set",
            "type": "`$ARRAY`",
          },
          {
            "name": "rank",
            "short": "The rank of the armor set",
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
            "short": "The ID of the charm",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the charm",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "short": "The rarity of the charm",
            "type": "`$INTEGER`",
          },
          {
            "name": "skills",
            "short": "An array of skill ranks granted by the charm",
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
            "short": "The ID of the decoration",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the decoration",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "short": "The rarity of the decoration",
            "type": "`$INTEGER`",
          },
          {
            "name": "skills",
            "short": "An array of skill ranks granted by the decoration",
            "type": "`$ARRAY`",
          },
          {
            "name": "slot",
            "short": "The slot rank required for the decoration",
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
            "short": "An array of camps in the location",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "short": "A description of the event",
            "type": "`$STRING`",
          },
          {
            "name": "endTimestamp",
            "short": "The end time of the event",
            "type": "`$STRING`",
          },
          {
            "name": "exclusive",
            "short": "Whether the event is exclusive to a platform",
            "type": "`$STRING`",
          },
          {
            "name": "expansion",
            "short": "The expansion the event belongs to",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ID of the location",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "short": "The name of the location",
            "type": "`$STRING`",
          },
          {
            "name": "platform",
            "short": "The platform for the event",
            "type": "`$STRING`",
          },
          {
            "name": "questRank",
            "short": "The quest rank of the event",
            "type": "`$STRING`",
          },
          {
            "name": "requirements",
            "short": "Requirements for the event",
            "type": "`$STRING`",
          },
          {
            "name": "startTimestamp",
            "short": "The start time of the event",
            "type": "`$STRING`",
          },
          {
            "name": "successConditions",
            "short": "Conditions for success",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "The type of event",
            "type": "`$STRING`",
          },
          {
            "name": "zoneCount",
            "short": "The number of zones in the location",
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
            "short": "The price when buying the item",
            "type": "`$INTEGER`",
          },
          {
            "name": "carryLimit",
            "short": "The maximum number of this item that can be carried",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "short": "A description of the item",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ID of the item",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the item",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "short": "The rarity of the item",
            "type": "`$INTEGER`",
          },
          {
            "name": "sellPrice",
            "short": "The price when selling the item",
            "type": "`$INTEGER`",
          },
          {
            "name": "value",
            "short": "The value of the item",
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
            "short": "An array of camps in the location",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "The ID of the location",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the location",
            "type": "`$STRING`",
          },
          {
            "name": "zoneCount",
            "short": "The number of zones in the location",
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
            "short": "Ailments the monster can inflict",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "short": "A description of the monster",
            "type": "`$STRING`",
          },
          {
            "name": "elements",
            "short": "Elements the monster uses",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "The ID of the monster",
            "type": "`$INTEGER`",
          },
          {
            "name": "locations",
            "short": "Locations where the monster can be found",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "short": "The name of the monster",
            "type": "`$STRING`",
          },
          {
            "name": "resistances",
            "short": "Resistances of the monster",
            "type": "`$ARRAY`",
          },
          {
            "name": "rewards",
            "short": "Rewards obtained from the monster",
            "type": "`$ARRAY`",
          },
          {
            "name": "species",
            "short": "The species of the monster",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "The type of monster",
            "type": "`$STRING`",
          },
          {
            "name": "weaknesses",
            "short": "Weaknesses of the monster",
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
            "short": "The type of damage",
            "type": "`$STRING`",
          },
          {
            "name": "exhaust",
            "short": "Exhaust value",
            "type": "`$INTEGER`",
          },
          {
            "name": "hits",
            "short": "Hit information",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "The ID of the motion value",
            "type": "`$INTEGER`",
          },
          {
            "name": "stun",
            "short": "Stun value",
            "type": "`$INTEGER`",
          },
          {
            "name": "weaponType",
            "short": "The type of weapon",
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
            "short": "A description of the skill",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ID of the skill",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the skill",
            "type": "`$STRING`",
          },
          {
            "name": "ranks",
            "short": "An array of skill ranks",
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
            "short": "Asset URLs for the weapon",
            "type": "`$OBJECT`",
          },
          {
            "name": "attack",
            "short": "Attack values for the weapon",
            "type": "`$OBJECT`",
          },
          {
            "name": "attributes",
            "short": "Additional weapon attributes",
            "type": "`$OBJECT`",
          },
          {
            "name": "crafting",
            "short": "Crafting information for the weapon",
            "type": "`$OBJECT`",
          },
          {
            "name": "damageType",
            "short": "The damage type of the weapon",
            "type": "`$STRING`",
          },
          {
            "name": "elements",
            "short": "Elemental damage information",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "The ID of the weapon",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "The name of the weapon",
            "type": "`$STRING`",
          },
          {
            "name": "rarity",
            "short": "The rarity of the weapon",
            "type": "`$INTEGER`",
          },
          {
            "name": "slots",
            "short": "An array of decoration slot information",
            "type": "`$ARRAY`",
          },
          {
            "name": "type",
            "short": "The type of weapon",
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
