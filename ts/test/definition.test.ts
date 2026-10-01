import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "ailment",
    "accessor": "Ailment",
    "op": "list",
    "method": "GET",
    "path": "/ailments",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "recovery": {
          "actions": [
            "crouch"
          ],
          "items": [
            {
              "id": 1,
              "name": "x",
              "description": "x",
              "rarity": 1,
              "carryLimit": 1,
              "sellPrice": 1,
              "buyPrice": 1,
              "value": 1
            }
          ]
        },
        "protection": {
          "items": [
            {
              "id": 1,
              "name": "x",
              "description": "x",
              "rarity": 1,
              "carryLimit": 1,
              "sellPrice": 1,
              "buyPrice": 1,
              "value": 1
            }
          ],
          "skills": [
            {
              "id": 1,
              "name": "x",
              "description": "x",
              "ranks": [
                {}
              ]
            }
          ]
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "ailment",
    "accessor": "Ailment",
    "op": "load",
    "method": "GET",
    "path": "/ailments/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "recovery": {
        "actions": [
          "crouch"
        ],
        "items": [
          {
            "id": 1,
            "name": "x",
            "description": "x",
            "rarity": 1,
            "carryLimit": 1,
            "sellPrice": 1,
            "buyPrice": 1,
            "value": 1
          }
        ]
      },
      "protection": {
        "items": [
          {
            "id": 1,
            "name": "x",
            "description": "x",
            "rarity": 1,
            "carryLimit": 1,
            "sellPrice": 1,
            "buyPrice": 1,
            "value": 1
          }
        ],
        "skills": [
          {
            "id": 1,
            "name": "x",
            "description": "x",
            "ranks": [
              {
                "id": 1,
                "level": 1,
                "description": "x",
                "modifiers": [],
                "skill": 1,
                "skillName": "x"
              }
            ]
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "armor",
    "accessor": "Armor",
    "op": "list",
    "method": "GET",
    "path": "/armor",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "type": "head",
        "rank": "low",
        "rarity": 1,
        "defense": {
          "base": 1,
          "max": 1,
          "augmented": 1
        },
        "resistances": {
          "fire": 1,
          "water": 1,
          "ice": 1,
          "thunder": 1,
          "dragon": 1
        },
        "slots": [
          {
            "rank": 1
          }
        ],
        "attributes": {},
        "skills": [
          {
            "id": 1,
            "level": 1,
            "description": "x",
            "modifiers": [
              {}
            ],
            "skill": 1,
            "skillName": "x"
          }
        ],
        "armorSet": {
          "id": 1,
          "name": "x",
          "rank": "low",
          "pieces": [
            1
          ]
        },
        "assets": {
          "imageMale": "x",
          "imageFemale": "x"
        },
        "crafting": {
          "materials": [
            {
              "quantity": 1,
              "item": {
                "id": 1,
                "name": "x",
                "description": "x",
                "rarity": 1,
                "carryLimit": 1,
                "sellPrice": 1,
                "buyPrice": 1,
                "value": 1
              }
            }
          ]
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "armor",
    "accessor": "Armor",
    "op": "load",
    "method": "GET",
    "path": "/armor/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "type": "head",
      "rank": "low",
      "rarity": 1,
      "defense": {
        "base": 1,
        "max": 1,
        "augmented": 1
      },
      "resistances": {
        "fire": 1,
        "water": 1,
        "ice": 1,
        "thunder": 1,
        "dragon": 1
      },
      "slots": [
        {
          "rank": 1
        }
      ],
      "attributes": {},
      "skills": [
        {
          "id": 1,
          "level": 1,
          "description": "x",
          "modifiers": [
            {}
          ],
          "skill": 1,
          "skillName": "x"
        }
      ],
      "armorSet": {
        "id": 1,
        "name": "x",
        "rank": "low",
        "pieces": [
          1
        ]
      },
      "assets": {
        "imageMale": "x",
        "imageFemale": "x"
      },
      "crafting": {
        "materials": [
          {
            "quantity": 1,
            "item": {
              "id": 1,
              "name": "x",
              "description": "x",
              "rarity": 1,
              "carryLimit": 1,
              "sellPrice": 1,
              "buyPrice": 1,
              "value": 1
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "armor_set",
    "accessor": "ArmorSet",
    "op": "list",
    "method": "GET",
    "path": "/armor/sets",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "rank": "low",
        "pieces": [
          {
            "id": 1,
            "name": "x",
            "type": "head",
            "rank": "low",
            "rarity": 1,
            "defense": {
              "base": 1,
              "max": 1,
              "augmented": 1
            },
            "resistances": {
              "fire": 1,
              "water": 1,
              "ice": 1,
              "thunder": 1,
              "dragon": 1
            },
            "slots": [
              {
                "rank": 1
              }
            ],
            "attributes": {},
            "skills": [
              {
                "id": 1,
                "level": 1,
                "description": "x",
                "modifiers": [],
                "skill": 1,
                "skillName": "x"
              }
            ],
            "armorSet": {
              "id": 1,
              "name": "x",
              "rank": "low",
              "pieces": [
                1
              ]
            },
            "assets": {
              "imageMale": "x",
              "imageFemale": "x"
            },
            "crafting": {
              "materials": [
                {}
              ]
            }
          }
        ],
        "bonus": {
          "id": 1,
          "name": "x",
          "ranks": [
            {
              "pieces": 1,
              "skill": {
                "id": 1,
                "level": 1,
                "description": "x",
                "modifiers": [],
                "skill": 1,
                "skillName": "x"
              }
            }
          ]
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "armor_set",
    "accessor": "ArmorSet",
    "op": "load",
    "method": "GET",
    "path": "/armor/sets/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "rank": "low",
      "pieces": [
        {
          "id": 1,
          "name": "x",
          "type": "head",
          "rank": "low",
          "rarity": 1,
          "defense": {
            "base": 1,
            "max": 1,
            "augmented": 1
          },
          "resistances": {
            "fire": 1,
            "water": 1,
            "ice": 1,
            "thunder": 1,
            "dragon": 1
          },
          "slots": [
            {
              "rank": 1
            }
          ],
          "attributes": {},
          "skills": [
            {
              "id": 1,
              "level": 1,
              "description": "x",
              "modifiers": [
                {}
              ],
              "skill": 1,
              "skillName": "x"
            }
          ],
          "armorSet": {
            "id": 1,
            "name": "x",
            "rank": "low",
            "pieces": [
              1
            ]
          },
          "assets": {
            "imageMale": "x",
            "imageFemale": "x"
          },
          "crafting": {
            "materials": [
              {
                "quantity": 1,
                "item": {}
              }
            ]
          }
        }
      ],
      "bonus": {
        "id": 1,
        "name": "x",
        "ranks": [
          {
            "pieces": 1,
            "skill": {
              "id": 1,
              "level": 1,
              "description": "x",
              "modifiers": [
                {}
              ],
              "skill": 1,
              "skillName": "x"
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "charm",
    "accessor": "Charm",
    "op": "list",
    "method": "GET",
    "path": "/charms",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "rarity": 1,
        "skills": [
          {
            "id": 1,
            "level": 1,
            "description": "x",
            "modifiers": [
              {}
            ],
            "skill": 1,
            "skillName": "x"
          }
        ],
        "crafting": {
          "materials": [
            {
              "quantity": 1,
              "item": {
                "id": 1,
                "name": "x",
                "description": "x",
                "rarity": 1,
                "carryLimit": 1,
                "sellPrice": 1,
                "buyPrice": 1,
                "value": 1
              }
            }
          ]
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "charm",
    "accessor": "Charm",
    "op": "load",
    "method": "GET",
    "path": "/charms/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "rarity": 1,
      "skills": [
        {
          "id": 1,
          "level": 1,
          "description": "x",
          "modifiers": [
            {}
          ],
          "skill": 1,
          "skillName": "x"
        }
      ],
      "crafting": {
        "materials": [
          {
            "quantity": 1,
            "item": {
              "id": 1,
              "name": "x",
              "description": "x",
              "rarity": 1,
              "carryLimit": 1,
              "sellPrice": 1,
              "buyPrice": 1,
              "value": 1
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "decoration",
    "accessor": "Decoration",
    "op": "list",
    "method": "GET",
    "path": "/decorations",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "rarity": 1,
        "slot": 1,
        "skills": [
          {
            "id": 1,
            "level": 1,
            "description": "x",
            "modifiers": [
              {}
            ],
            "skill": 1,
            "skillName": "x"
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "decoration",
    "accessor": "Decoration",
    "op": "load",
    "method": "GET",
    "path": "/decorations/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "rarity": 1,
      "slot": 1,
      "skills": [
        {
          "id": 1,
          "level": 1,
          "description": "x",
          "modifiers": [
            {}
          ],
          "skill": 1,
          "skillName": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "event",
    "accessor": "Event",
    "op": "list",
    "method": "GET",
    "path": "/events",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "platform": "x",
        "exclusive": "x",
        "type": "x",
        "expansion": "x",
        "description": "x",
        "requirements": "x",
        "questRank": "x",
        "successConditions": "x",
        "startTimestamp": "2026-01-01T00:00:00Z",
        "endTimestamp": "2026-01-01T00:00:00Z",
        "location": {
          "id": 1,
          "name": "x",
          "zoneCount": 1,
          "camps": [
            {
              "id": 1,
              "name": "x",
              "zone": 1
            }
          ]
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "event",
    "accessor": "Event",
    "op": "load",
    "method": "GET",
    "path": "/events/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "platform": "x",
      "exclusive": "x",
      "type": "x",
      "expansion": "x",
      "description": "x",
      "requirements": "x",
      "questRank": "x",
      "successConditions": "x",
      "startTimestamp": "2026-01-01T00:00:00Z",
      "endTimestamp": "2026-01-01T00:00:00Z",
      "location": {
        "id": 1,
        "name": "x",
        "zoneCount": 1,
        "camps": [
          {
            "id": 1,
            "name": "x",
            "zone": 1
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "item",
    "accessor": "Item",
    "op": "list",
    "method": "GET",
    "path": "/items",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "rarity": 1,
        "carryLimit": 1,
        "sellPrice": 1,
        "buyPrice": 1,
        "value": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "item",
    "accessor": "Item",
    "op": "load",
    "method": "GET",
    "path": "/items/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "rarity": 1,
      "carryLimit": 1,
      "sellPrice": 1,
      "buyPrice": 1,
      "value": 1
    },
    "idField": "id"
  },
  {
    "entity": "location",
    "accessor": "Location",
    "op": "list",
    "method": "GET",
    "path": "/locations",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "zoneCount": 1,
        "camps": [
          {
            "id": 1,
            "name": "x",
            "zone": 1
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "location",
    "accessor": "Location",
    "op": "load",
    "method": "GET",
    "path": "/locations/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "zoneCount": 1,
      "camps": [
        {
          "id": 1,
          "name": "x",
          "zone": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "monster",
    "accessor": "Monster",
    "op": "list",
    "method": "GET",
    "path": "/monsters",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "type": "x",
        "species": "x",
        "description": "x",
        "elements": [
          "x"
        ],
        "ailments": [
          {
            "id": 1,
            "name": "x",
            "description": "x",
            "recovery": {
              "actions": [
                "crouch"
              ],
              "items": [
                {}
              ]
            },
            "protection": {
              "items": [
                {}
              ],
              "skills": [
                {}
              ]
            }
          }
        ],
        "locations": [
          {
            "id": 1,
            "name": "x",
            "zoneCount": 1,
            "camps": [
              {
                "id": 1,
                "name": "x",
                "zone": 1
              }
            ]
          }
        ],
        "resistances": [
          {
            "element": "x",
            "condition": "x"
          }
        ],
        "weaknesses": [
          {
            "element": "x",
            "stars": 1,
            "condition": "x"
          }
        ],
        "rewards": [
          {
            "id": 1,
            "item": {
              "id": 1,
              "name": "x",
              "description": "x",
              "rarity": 1,
              "carryLimit": 1,
              "sellPrice": 1,
              "buyPrice": 1,
              "value": 1
            },
            "conditions": [
              {}
            ]
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "monster",
    "accessor": "Monster",
    "op": "load",
    "method": "GET",
    "path": "/monsters/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "type": "x",
      "species": "x",
      "description": "x",
      "elements": [
        "x"
      ],
      "ailments": [
        {
          "id": 1,
          "name": "x",
          "description": "x",
          "recovery": {
            "actions": [
              "crouch"
            ],
            "items": [
              {
                "id": 1,
                "name": "x",
                "description": "x",
                "rarity": 1,
                "carryLimit": 1,
                "sellPrice": 1,
                "buyPrice": 1,
                "value": 1
              }
            ]
          },
          "protection": {
            "items": [
              {
                "id": 1,
                "name": "x",
                "description": "x",
                "rarity": 1,
                "carryLimit": 1,
                "sellPrice": 1,
                "buyPrice": 1,
                "value": 1
              }
            ],
            "skills": [
              {
                "id": 1,
                "name": "x",
                "description": "x",
                "ranks": []
              }
            ]
          }
        }
      ],
      "locations": [
        {
          "id": 1,
          "name": "x",
          "zoneCount": 1,
          "camps": [
            {
              "id": 1,
              "name": "x",
              "zone": 1
            }
          ]
        }
      ],
      "resistances": [
        {
          "element": "x",
          "condition": "x"
        }
      ],
      "weaknesses": [
        {
          "element": "x",
          "stars": 1,
          "condition": "x"
        }
      ],
      "rewards": [
        {
          "id": 1,
          "item": {
            "id": 1,
            "name": "x",
            "description": "x",
            "rarity": 1,
            "carryLimit": 1,
            "sellPrice": 1,
            "buyPrice": 1,
            "value": 1
          },
          "conditions": [
            {}
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "motion_value",
    "accessor": "MotionValue",
    "op": "list",
    "method": "GET",
    "path": "/motion-values",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "weaponType": "x",
        "damageType": "x",
        "stun": 1,
        "exhaust": 1,
        "hits": [
          {
            "type": "x",
            "value": 1
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "motion_value",
    "accessor": "MotionValue",
    "op": "load",
    "method": "GET",
    "path": "/motion-values/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "weaponType": "x",
      "damageType": "x",
      "stun": 1,
      "exhaust": 1,
      "hits": [
        {
          "type": "x",
          "value": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "skill",
    "accessor": "Skill",
    "op": "list",
    "method": "GET",
    "path": "/skills",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "description": "x",
        "ranks": [
          {
            "id": 1,
            "level": 1,
            "description": "x",
            "modifiers": [
              {}
            ],
            "skill": 1,
            "skillName": "x"
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "skill",
    "accessor": "Skill",
    "op": "load",
    "method": "GET",
    "path": "/skills/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "description": "x",
      "ranks": [
        {
          "id": 1,
          "level": 1,
          "description": "x",
          "modifiers": [
            {}
          ],
          "skill": 1,
          "skillName": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "weapon",
    "accessor": "Weapon",
    "op": "list",
    "method": "GET",
    "path": "/weapons",
    "args": [],
    "select": {
      "p": "v1",
      "q": "v1"
    },
    "headers": [],
    "query": [
      "p",
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": 1,
        "name": "x",
        "type": "x",
        "rarity": 1,
        "attack": {
          "display": 1,
          "raw": 1
        },
        "slots": [
          {
            "rank": 1
          }
        ],
        "elements": [
          {
            "type": "x",
            "damage": 1,
            "hidden": true
          }
        ],
        "crafting": {
          "craftable": true,
          "previous": 1,
          "branches": [
            1
          ],
          "craftingMaterials": [
            {
              "quantity": 1,
              "item": {
                "id": 1,
                "name": "x",
                "description": "x",
                "rarity": 1,
                "carryLimit": 1,
                "sellPrice": 1,
                "buyPrice": 1,
                "value": 1
              }
            }
          ],
          "upgradeMaterials": [
            {
              "quantity": 1,
              "item": {
                "id": 1,
                "name": "x",
                "description": "x",
                "rarity": 1,
                "carryLimit": 1,
                "sellPrice": 1,
                "buyPrice": 1,
                "value": 1
              }
            }
          ]
        },
        "assets": {
          "icon": "x",
          "image": "x"
        },
        "damageType": "x",
        "attributes": {}
      }
    ],
    "idField": "id"
  },
  {
    "entity": "weapon",
    "accessor": "Weapon",
    "op": "load",
    "method": "GET",
    "path": "/weapons/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "p": "v1"
    },
    "headers": [],
    "query": [
      "p"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 1,
      "name": "x",
      "type": "x",
      "rarity": 1,
      "attack": {
        "display": 1,
        "raw": 1
      },
      "slots": [
        {
          "rank": 1
        }
      ],
      "elements": [
        {
          "type": "x",
          "damage": 1,
          "hidden": true
        }
      ],
      "crafting": {
        "craftable": true,
        "previous": 1,
        "branches": [
          1
        ],
        "craftingMaterials": [
          {
            "quantity": 1,
            "item": {
              "id": 1,
              "name": "x",
              "description": "x",
              "rarity": 1,
              "carryLimit": 1,
              "sellPrice": 1,
              "buyPrice": 1,
              "value": 1
            }
          }
        ],
        "upgradeMaterials": [
          {
            "quantity": 1,
            "item": {
              "id": 1,
              "name": "x",
              "description": "x",
              "rarity": 1,
              "carryLimit": 1,
              "sellPrice": 1,
              "buyPrice": 1,
              "value": 1
            }
          }
        ]
      },
      "assets": {
        "icon": "x",
        "image": "x"
      },
      "damageType": "x",
      "attributes": {}
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
