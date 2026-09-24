-- MonsterHunterWorld SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MonsterHunterWorld",
      slug = "monster-hunter-world",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://mhw-db.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["ailment"] = {},
        ["armor"] = {},
        ["armor_set"] = {},
        ["charm"] = {},
        ["decoration"] = {},
        ["event"] = {},
        ["item"] = {},
        ["location"] = {},
        ["monster"] = {},
        ["motion_value"] = {},
        ["skill"] = {},
        ["weapon"] = {},
      },
    },
    entity = {
      ["ailment"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "A short description of the ailment",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the ailment",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the ailment",
          },
          {
            ["name"] = "protection",
            ["title"] = "Protection",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "recovery",
            ["title"] = "Recovery",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "ailment",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ailments",
                ["segments"] = {
                  {
                    ["lit"] = "ailments",
                  },
                },
                ["parts"] = {
                  "ailments",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ailments/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "ailments",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "ailments",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["armor"] = {
        ["fields"] = {
          {
            ["name"] = "armorSet",
            ["title"] = "Armor Set",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "assets",
            ["title"] = "Assets",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "attributes",
            ["title"] = "Attributes",
            ["type"] = "`$OBJECT`",
            ["short"] = "Dictionary of attribute modifiers attached to the armor piece",
          },
          {
            ["name"] = "crafting",
            ["title"] = "Crafting",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "defense",
            ["title"] = "Defense",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the armor piece",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the armor piece",
          },
          {
            ["name"] = "rank",
            ["title"] = "Rank",
            ["type"] = "`$STRING`",
            ["short"] = "The rank of the armor piece",
          },
          {
            ["name"] = "rarity",
            ["title"] = "Rarity",
            ["type"] = "`$INTEGER`",
            ["short"] = "The rarity of the armor piece",
          },
          {
            ["name"] = "resistances",
            ["title"] = "Resistances",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "skills",
            ["title"] = "Skills",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of skill ranks granted by the armor",
          },
          {
            ["name"] = "slots",
            ["title"] = "Slots",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of decoration slot information",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["short"] = "The slot the armor piece fits in",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "armor",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/armor",
                ["segments"] = {
                  {
                    ["lit"] = "armor",
                  },
                },
                ["parts"] = {
                  "armor",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/armor/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "armor",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "armor",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["armor_set"] = {
        ["fields"] = {
          {
            ["name"] = "bonus",
            ["title"] = "Bonus",
            ["type"] = "`$OBJECT`",
            ["short"] = "The set bonus, if any",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the armor set",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the armor set",
          },
          {
            ["name"] = "pieces",
            ["title"] = "Pieces",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of armor pieces in the set",
          },
          {
            ["name"] = "rank",
            ["title"] = "Rank",
            ["type"] = "`$STRING`",
            ["short"] = "The rank of the armor set",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "armor_set",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/armor/sets",
                ["segments"] = {
                  {
                    ["lit"] = "armor",
                  },
                  {
                    ["lit"] = "sets",
                  },
                },
                ["parts"] = {
                  "armor",
                  "sets",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/armor/sets/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "armor",
                  },
                  {
                    ["lit"] = "sets",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "armor",
                  "sets",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["charm"] = {
        ["fields"] = {
          {
            ["name"] = "crafting",
            ["title"] = "Crafting",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the charm",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the charm",
          },
          {
            ["name"] = "rarity",
            ["title"] = "Rarity",
            ["type"] = "`$INTEGER`",
            ["short"] = "The rarity of the charm",
          },
          {
            ["name"] = "skills",
            ["title"] = "Skills",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of skill ranks granted by the charm",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "charm",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/charms",
                ["segments"] = {
                  {
                    ["lit"] = "charms",
                  },
                },
                ["parts"] = {
                  "charms",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/charms/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "charms",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "charms",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["decoration"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the decoration",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the decoration",
          },
          {
            ["name"] = "rarity",
            ["title"] = "Rarity",
            ["type"] = "`$INTEGER`",
            ["short"] = "The rarity of the decoration",
          },
          {
            ["name"] = "skills",
            ["title"] = "Skills",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of skill ranks granted by the decoration",
          },
          {
            ["name"] = "slot",
            ["title"] = "Slot",
            ["type"] = "`$INTEGER`",
            ["short"] = "The slot rank required for the decoration",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "decoration",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/decorations",
                ["segments"] = {
                  {
                    ["lit"] = "decorations",
                  },
                },
                ["parts"] = {
                  "decorations",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/decorations/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "decorations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "decorations",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["event"] = {
        ["fields"] = {
          {
            ["name"] = "camps",
            ["title"] = "Camps",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of camps in the location",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "A description of the event",
          },
          {
            ["name"] = "endTimestamp",
            ["title"] = "End Timestamp",
            ["type"] = "`$STRING`",
            ["short"] = "The end time of the event",
            ["format"] = "date-time",
          },
          {
            ["name"] = "exclusive",
            ["title"] = "Exclusive",
            ["type"] = "`$STRING`",
            ["short"] = "Whether the event is exclusive to a platform",
          },
          {
            ["name"] = "expansion",
            ["title"] = "Expansion",
            ["type"] = "`$STRING`",
            ["short"] = "The expansion the event belongs to",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the location",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the location",
          },
          {
            ["name"] = "platform",
            ["title"] = "Platform",
            ["type"] = "`$STRING`",
            ["short"] = "The platform for the event",
          },
          {
            ["name"] = "questRank",
            ["title"] = "Quest Rank",
            ["type"] = "`$STRING`",
            ["short"] = "The quest rank of the event",
          },
          {
            ["name"] = "requirements",
            ["title"] = "Requirements",
            ["type"] = "`$STRING`",
            ["short"] = "Requirements for the event",
          },
          {
            ["name"] = "startTimestamp",
            ["title"] = "Start Timestamp",
            ["type"] = "`$STRING`",
            ["short"] = "The start time of the event",
            ["format"] = "date-time",
          },
          {
            ["name"] = "successConditions",
            ["title"] = "Success Conditions",
            ["type"] = "`$STRING`",
            ["short"] = "Conditions for success",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["short"] = "The type of event",
          },
          {
            ["name"] = "zoneCount",
            ["title"] = "Zone Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of zones in the location",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "event",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/events",
                ["segments"] = {
                  {
                    ["lit"] = "events",
                  },
                },
                ["parts"] = {
                  "events",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/events/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "events",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "events",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.location`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["item"] = {
        ["fields"] = {
          {
            ["name"] = "buyPrice",
            ["title"] = "Buy Price",
            ["type"] = "`$INTEGER`",
            ["short"] = "The price when buying the item",
          },
          {
            ["name"] = "carryLimit",
            ["title"] = "Carry Limit",
            ["type"] = "`$INTEGER`",
            ["short"] = "The maximum number of this item that can be carried",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "A description of the item",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the item",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the item",
          },
          {
            ["name"] = "rarity",
            ["title"] = "Rarity",
            ["type"] = "`$INTEGER`",
            ["short"] = "The rarity of the item",
          },
          {
            ["name"] = "sellPrice",
            ["title"] = "Sell Price",
            ["type"] = "`$INTEGER`",
            ["short"] = "The price when selling the item",
          },
          {
            ["name"] = "value",
            ["title"] = "Value",
            ["type"] = "`$INTEGER`",
            ["short"] = "The value of the item",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "item",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/items",
                ["segments"] = {
                  {
                    ["lit"] = "items",
                  },
                },
                ["parts"] = {
                  "items",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/items/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "items",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "items",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["location"] = {
        ["fields"] = {
          {
            ["name"] = "camps",
            ["title"] = "Camps",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of camps in the location",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the location",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the location",
          },
          {
            ["name"] = "zoneCount",
            ["title"] = "Zone Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of zones in the location",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "location",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/locations",
                ["segments"] = {
                  {
                    ["lit"] = "locations",
                  },
                },
                ["parts"] = {
                  "locations",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/locations/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "locations",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "locations",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["monster"] = {
        ["fields"] = {
          {
            ["name"] = "ailments",
            ["title"] = "Ailments",
            ["type"] = "`$ARRAY`",
            ["short"] = "Ailments the monster can inflict",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "A description of the monster",
          },
          {
            ["name"] = "elements",
            ["title"] = "Elements",
            ["type"] = "`$ARRAY`",
            ["short"] = "Elements the monster uses",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the monster",
          },
          {
            ["name"] = "locations",
            ["title"] = "Locations",
            ["type"] = "`$ARRAY`",
            ["short"] = "Locations where the monster can be found",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the monster",
          },
          {
            ["name"] = "resistances",
            ["title"] = "Resistances",
            ["type"] = "`$ARRAY`",
            ["short"] = "Resistances of the monster",
          },
          {
            ["name"] = "rewards",
            ["title"] = "Rewards",
            ["type"] = "`$ARRAY`",
            ["short"] = "Rewards obtained from the monster",
          },
          {
            ["name"] = "species",
            ["title"] = "Species",
            ["type"] = "`$STRING`",
            ["short"] = "The species of the monster",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["short"] = "The type of monster",
          },
          {
            ["name"] = "weaknesses",
            ["title"] = "Weaknesses",
            ["type"] = "`$ARRAY`",
            ["short"] = "Weaknesses of the monster",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "monster",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/monsters",
                ["segments"] = {
                  {
                    ["lit"] = "monsters",
                  },
                },
                ["parts"] = {
                  "monsters",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/monsters/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "monsters",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "monsters",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["motion_value"] = {
        ["fields"] = {
          {
            ["name"] = "damageType",
            ["title"] = "Damage Type",
            ["type"] = "`$STRING`",
            ["short"] = "The type of damage",
          },
          {
            ["name"] = "exhaust",
            ["title"] = "Exhaust",
            ["type"] = "`$INTEGER`",
            ["short"] = "Exhaust value",
          },
          {
            ["name"] = "hits",
            ["title"] = "Hits",
            ["type"] = "`$ARRAY`",
            ["short"] = "Hit information",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the motion value",
          },
          {
            ["name"] = "stun",
            ["title"] = "Stun",
            ["type"] = "`$INTEGER`",
            ["short"] = "Stun value",
          },
          {
            ["name"] = "weaponType",
            ["title"] = "Weapon Type",
            ["type"] = "`$STRING`",
            ["short"] = "The type of weapon",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "motion_value",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/motion-values",
                ["segments"] = {
                  {
                    ["lit"] = "motion-values",
                  },
                },
                ["parts"] = {
                  "motion-values",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/motion-values/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "motion-values",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "motion-values",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["skill"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "A description of the skill",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the skill",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the skill",
          },
          {
            ["name"] = "ranks",
            ["title"] = "Ranks",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of skill ranks",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "skill",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/skills",
                ["segments"] = {
                  {
                    ["lit"] = "skills",
                  },
                },
                ["parts"] = {
                  "skills",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/skills/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "skills",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "skills",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["weapon"] = {
        ["fields"] = {
          {
            ["name"] = "assets",
            ["title"] = "Assets",
            ["type"] = "`$OBJECT`",
            ["short"] = "Asset URLs for the weapon",
          },
          {
            ["name"] = "attack",
            ["title"] = "Attack",
            ["type"] = "`$OBJECT`",
            ["short"] = "Attack values for the weapon",
          },
          {
            ["name"] = "attributes",
            ["title"] = "Attributes",
            ["type"] = "`$OBJECT`",
            ["short"] = "Additional weapon attributes",
          },
          {
            ["name"] = "crafting",
            ["title"] = "Crafting",
            ["type"] = "`$OBJECT`",
            ["short"] = "Crafting information for the weapon",
          },
          {
            ["name"] = "damageType",
            ["title"] = "Damage Type",
            ["type"] = "`$STRING`",
            ["short"] = "The damage type of the weapon",
          },
          {
            ["name"] = "elements",
            ["title"] = "Elements",
            ["type"] = "`$ARRAY`",
            ["short"] = "Elemental damage information",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The ID of the weapon",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the weapon",
          },
          {
            ["name"] = "rarity",
            ["title"] = "Rarity",
            ["type"] = "`$INTEGER`",
            ["short"] = "The rarity of the weapon",
          },
          {
            ["name"] = "slots",
            ["title"] = "Slots",
            ["type"] = "`$ARRAY`",
            ["short"] = "An array of decoration slot information",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
            ["short"] = "The type of weapon",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "weapon",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/weapons",
                ["segments"] = {
                  {
                    ["lit"] = "weapons",
                  },
                },
                ["parts"] = {
                  "weapons",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "p",
                    "q",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/weapons/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "weapons",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "weapons",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "p",
                      ["orig"] = "p",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "p",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
