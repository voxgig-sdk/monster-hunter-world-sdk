
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MonsterHunterWorld',
        slug: "monster-hunter-world",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://mhw-db.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      ailment: {
      },

      armor: {
      },

      armor_set: {
      },

      charm: {
      },

      decoration: {
      },

      event: {
      },

      item: {
      },

      location: {
      },

      monster: {
      },

      motion_value: {
      },

      skill: {
      },

      weapon: {
      },

    }
  }


  entity = {
    "ailment": {
      "fields": [
        {
          "name": "description",
          "short": "A short description of the ailment",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "The ID of the ailment",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the ailment",
          "type": "`$STRING`"
        },
        {
          "name": "protection",
          "type": "`$OBJECT`"
        },
        {
          "name": "recovery",
          "type": "`$OBJECT`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/ailments",
              "segments": [
                {
                  "lit": "ailments"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "ailments"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/ailments/{id}",
              "segments": [
                {
                  "lit": "ailments"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "ailments",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "armor": {
      "fields": [
        {
          "name": "armorSet",
          "type": "`$OBJECT`"
        },
        {
          "name": "assets",
          "type": "`$OBJECT`"
        },
        {
          "name": "attributes",
          "short": "Dictionary of attribute modifiers attached to the armor piece",
          "type": "`$OBJECT`"
        },
        {
          "name": "crafting",
          "type": "`$OBJECT`"
        },
        {
          "name": "defense",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "short": "The ID of the armor piece",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the armor piece",
          "type": "`$STRING`"
        },
        {
          "name": "rank",
          "short": "The rank of the armor piece",
          "type": "`$STRING`"
        },
        {
          "name": "rarity",
          "short": "The rarity of the armor piece",
          "type": "`$INTEGER`"
        },
        {
          "name": "resistances",
          "type": "`$OBJECT`"
        },
        {
          "name": "skills",
          "short": "An array of skill ranks granted by the armor",
          "type": "`$ARRAY`"
        },
        {
          "name": "slots",
          "short": "An array of decoration slot information",
          "type": "`$ARRAY`"
        },
        {
          "name": "type",
          "short": "The slot the armor piece fits in",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/armor",
              "segments": [
                {
                  "lit": "armor"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "armor"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/armor/{id}",
              "segments": [
                {
                  "lit": "armor"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "armor",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "armor_set": {
      "fields": [
        {
          "name": "bonus",
          "short": "The set bonus, if any",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "short": "The ID of the armor set",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the armor set",
          "type": "`$STRING`"
        },
        {
          "name": "pieces",
          "short": "Array of armor pieces in the set",
          "type": "`$ARRAY`"
        },
        {
          "name": "rank",
          "short": "The rank of the armor set",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/armor/sets",
              "segments": [
                {
                  "lit": "armor"
                },
                {
                  "lit": "sets"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "armor",
                "sets"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/armor/sets/{id}",
              "segments": [
                {
                  "lit": "armor"
                },
                {
                  "lit": "sets"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "armor",
                "sets",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "charm": {
      "fields": [
        {
          "name": "crafting",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "short": "The ID of the charm",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the charm",
          "type": "`$STRING`"
        },
        {
          "name": "rarity",
          "short": "The rarity of the charm",
          "type": "`$INTEGER`"
        },
        {
          "name": "skills",
          "short": "An array of skill ranks granted by the charm",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/charms",
              "segments": [
                {
                  "lit": "charms"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "charms"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/charms/{id}",
              "segments": [
                {
                  "lit": "charms"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "charms",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "decoration": {
      "fields": [
        {
          "name": "id",
          "short": "The ID of the decoration",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the decoration",
          "type": "`$STRING`"
        },
        {
          "name": "rarity",
          "short": "The rarity of the decoration",
          "type": "`$INTEGER`"
        },
        {
          "name": "skills",
          "short": "An array of skill ranks granted by the decoration",
          "type": "`$ARRAY`"
        },
        {
          "name": "slot",
          "short": "The slot rank required for the decoration",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/decorations",
              "segments": [
                {
                  "lit": "decorations"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "decorations"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/decorations/{id}",
              "segments": [
                {
                  "lit": "decorations"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "decorations",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "event": {
      "fields": [
        {
          "name": "camps",
          "short": "An array of camps in the location",
          "type": "`$ARRAY`"
        },
        {
          "name": "description",
          "short": "A description of the event",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "endTimestamp",
          "short": "The end time of the event",
          "type": "`$STRING`"
        },
        {
          "name": "exclusive",
          "short": "Whether the event is exclusive to a platform",
          "type": "`$STRING`"
        },
        {
          "name": "expansion",
          "short": "The expansion the event belongs to",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "The ID of the location",
          "type": "`$INTEGER`"
        },
        {
          "name": "location",
          "type": "`$OBJECT`"
        },
        {
          "name": "name",
          "short": "The name of the location",
          "type": "`$STRING`"
        },
        {
          "name": "platform",
          "short": "The platform for the event",
          "type": "`$STRING`"
        },
        {
          "name": "questRank",
          "short": "The quest rank of the event",
          "type": "`$STRING`"
        },
        {
          "name": "requirements",
          "short": "Requirements for the event",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "startTimestamp",
          "short": "The start time of the event",
          "type": "`$STRING`"
        },
        {
          "name": "successConditions",
          "short": "Conditions for success",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "short": "The type of event",
          "type": "`$STRING`"
        },
        {
          "name": "zoneCount",
          "short": "The number of zones in the location",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/events",
              "segments": [
                {
                  "lit": "events"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "events"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/events/{id}",
              "segments": [
                {
                  "lit": "events"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.location`"
              },
              "parts": [
                "events",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "item": {
      "fields": [
        {
          "name": "buyPrice",
          "short": "The price when buying the item",
          "type": "`$INTEGER`"
        },
        {
          "name": "carryLimit",
          "short": "The maximum number of this item that can be carried",
          "type": "`$INTEGER`"
        },
        {
          "name": "description",
          "short": "A description of the item",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "The ID of the item",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the item",
          "type": "`$STRING`"
        },
        {
          "name": "rarity",
          "short": "The rarity of the item",
          "type": "`$INTEGER`"
        },
        {
          "name": "sellPrice",
          "short": "The price when selling the item",
          "type": "`$INTEGER`"
        },
        {
          "name": "value",
          "short": "The value of the item",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/items",
              "segments": [
                {
                  "lit": "items"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "items"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/items/{id}",
              "segments": [
                {
                  "lit": "items"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "items",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "location": {
      "fields": [
        {
          "name": "camps",
          "short": "An array of camps in the location",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "short": "The ID of the location",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the location",
          "type": "`$STRING`"
        },
        {
          "name": "zoneCount",
          "short": "The number of zones in the location",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/locations",
              "segments": [
                {
                  "lit": "locations"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "locations"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/locations/{id}",
              "segments": [
                {
                  "lit": "locations"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "locations",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "monster": {
      "fields": [
        {
          "name": "ailments",
          "short": "Ailments the monster can inflict",
          "type": "`$ARRAY`"
        },
        {
          "name": "description",
          "short": "A description of the monster",
          "type": "`$STRING`"
        },
        {
          "name": "elements",
          "short": "Elements the monster uses",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "short": "The ID of the monster",
          "type": "`$INTEGER`"
        },
        {
          "name": "locations",
          "short": "Locations where the monster can be found",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "short": "The name of the monster",
          "type": "`$STRING`"
        },
        {
          "name": "resistances",
          "short": "Resistances of the monster",
          "type": "`$ARRAY`"
        },
        {
          "name": "rewards",
          "short": "Rewards obtained from the monster",
          "type": "`$ARRAY`"
        },
        {
          "name": "species",
          "short": "The species of the monster",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "short": "The type of monster",
          "type": "`$STRING`"
        },
        {
          "name": "weaknesses",
          "short": "Weaknesses of the monster",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/monsters",
              "segments": [
                {
                  "lit": "monsters"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "monsters"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/monsters/{id}",
              "segments": [
                {
                  "lit": "monsters"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "monsters",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "motion_value": {
      "fields": [
        {
          "name": "damageType",
          "short": "The type of damage",
          "type": "`$STRING`"
        },
        {
          "name": "exhaust",
          "short": "Exhaust value",
          "type": "`$INTEGER`"
        },
        {
          "name": "hits",
          "short": "Hit information",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "short": "The ID of the motion value",
          "type": "`$INTEGER`"
        },
        {
          "name": "stun",
          "short": "Stun value",
          "type": "`$INTEGER`"
        },
        {
          "name": "weaponType",
          "short": "The type of weapon",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/motion-values",
              "segments": [
                {
                  "lit": "motion-values"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "motion-values"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/motion-values/{id}",
              "segments": [
                {
                  "lit": "motion-values"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "motion-values",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "skill": {
      "fields": [
        {
          "name": "description",
          "short": "A description of the skill",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "The ID of the skill",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the skill",
          "type": "`$STRING`"
        },
        {
          "name": "ranks",
          "short": "An array of skill ranks",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/skills",
              "segments": [
                {
                  "lit": "skills"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "skills"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/skills/{id}",
              "segments": [
                {
                  "lit": "skills"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "skills",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "weapon": {
      "fields": [
        {
          "name": "assets",
          "short": "Asset URLs for the weapon",
          "type": "`$OBJECT`"
        },
        {
          "name": "attack",
          "short": "Attack values for the weapon",
          "type": "`$OBJECT`"
        },
        {
          "name": "attributes",
          "short": "Additional weapon attributes",
          "type": "`$OBJECT`"
        },
        {
          "name": "crafting",
          "short": "Crafting information for the weapon",
          "type": "`$OBJECT`"
        },
        {
          "name": "damageType",
          "short": "The damage type of the weapon",
          "type": "`$STRING`"
        },
        {
          "name": "elements",
          "short": "Elemental damage information",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "short": "The ID of the weapon",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "The name of the weapon",
          "type": "`$STRING`"
        },
        {
          "name": "rarity",
          "short": "The rarity of the weapon",
          "type": "`$INTEGER`"
        },
        {
          "name": "slots",
          "short": "An array of decoration slot information",
          "type": "`$ARRAY`"
        },
        {
          "name": "type",
          "short": "The type of weapon",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/weapons",
              "segments": [
                {
                  "lit": "weapons"
                }
              ],
              "select": {
                "exist": [
                  "p",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "weapons"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "p",
                    "orig": "p",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/weapons/{id}",
              "segments": [
                {
                  "lit": "weapons"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "p"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "weapons",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

