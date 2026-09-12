package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MonsterHunterWorld",
			"slug": "monster-hunter-world",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://mhw-db.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"ailment": map[string]any{},
				"armor": map[string]any{},
				"armor_set": map[string]any{},
				"charm": map[string]any{},
				"decoration": map[string]any{},
				"event": map[string]any{},
				"item": map[string]any{},
				"location": map[string]any{},
				"monster": map[string]any{},
				"motion_value": map[string]any{},
				"skill": map[string]any{},
				"weapon": map[string]any{},
			},
		},
		"entity": map[string]any{
			"ailment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "A short description of the ailment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the ailment",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the ailment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "protection",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "recovery",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "ailment",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ailments",
								"segments": []any{
									map[string]any{
										"lit": "ailments",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"ailments",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ailments/{id}",
								"segments": []any{
									map[string]any{
										"lit": "ailments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"ailments",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"armor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "armorSet",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "assets",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "attributes",
						"short": "Dictionary of attribute modifiers attached to the armor piece",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "crafting",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "defense",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the armor piece",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the armor piece",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "The rank of the armor piece",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rarity",
						"short": "The rarity of the armor piece",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "resistances",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "skills",
						"short": "An array of skill ranks granted by the armor",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "slots",
						"short": "An array of decoration slot information",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"short": "The slot the armor piece fits in",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "armor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/armor",
								"segments": []any{
									map[string]any{
										"lit": "armor",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"armor",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/armor/{id}",
								"segments": []any{
									map[string]any{
										"lit": "armor",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"armor",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"armor_set": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bonus",
						"short": "The set bonus, if any",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the armor set",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the armor set",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pieces",
						"short": "Array of armor pieces in the set",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rank",
						"short": "The rank of the armor set",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "armor_set",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/armor/sets",
								"segments": []any{
									map[string]any{
										"lit": "armor",
									},
									map[string]any{
										"lit": "sets",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"armor",
									"sets",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/armor/sets/{id}",
								"segments": []any{
									map[string]any{
										"lit": "armor",
									},
									map[string]any{
										"lit": "sets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"armor",
									"sets",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"charm": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "crafting",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the charm",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the charm",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rarity",
						"short": "The rarity of the charm",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "skills",
						"short": "An array of skill ranks granted by the charm",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "charm",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/charms",
								"segments": []any{
									map[string]any{
										"lit": "charms",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"charms",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/charms/{id}",
								"segments": []any{
									map[string]any{
										"lit": "charms",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"charms",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"decoration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "The ID of the decoration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the decoration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rarity",
						"short": "The rarity of the decoration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "skills",
						"short": "An array of skill ranks granted by the decoration",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "slot",
						"short": "The slot rank required for the decoration",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "decoration",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/decorations",
								"segments": []any{
									map[string]any{
										"lit": "decorations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"decorations",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/decorations/{id}",
								"segments": []any{
									map[string]any{
										"lit": "decorations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"decorations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "camps",
						"short": "An array of camps in the location",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"short": "A description of the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "endTimestamp",
						"short": "The end time of the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "exclusive",
						"short": "Whether the event is exclusive to a platform",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expansion",
						"short": "The expansion the event belongs to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the location",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "platform",
						"short": "The platform for the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "questRank",
						"short": "The quest rank of the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "requirements",
						"short": "Requirements for the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "startTimestamp",
						"short": "The start time of the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "successConditions",
						"short": "Conditions for success",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "The type of event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "zoneCount",
						"short": "The number of zones in the location",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/events",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"events",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/events/{id}",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.location`",
								},
								"parts": []any{
									"events",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"item": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "buyPrice",
						"short": "The price when buying the item",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "carryLimit",
						"short": "The maximum number of this item that can be carried",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "A description of the item",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the item",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the item",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rarity",
						"short": "The rarity of the item",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sellPrice",
						"short": "The price when selling the item",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "value",
						"short": "The value of the item",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "item",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/items",
								"segments": []any{
									map[string]any{
										"lit": "items",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"items",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/items/{id}",
								"segments": []any{
									map[string]any{
										"lit": "items",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"items",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"location": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "camps",
						"short": "An array of camps in the location",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the location",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "zoneCount",
						"short": "The number of zones in the location",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "location",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/locations",
								"segments": []any{
									map[string]any{
										"lit": "locations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"locations",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/locations/{id}",
								"segments": []any{
									map[string]any{
										"lit": "locations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"locations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"monster": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ailments",
						"short": "Ailments the monster can inflict",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"short": "A description of the monster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elements",
						"short": "Elements the monster uses",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the monster",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "locations",
						"short": "Locations where the monster can be found",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the monster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "resistances",
						"short": "Resistances of the monster",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "rewards",
						"short": "Rewards obtained from the monster",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "species",
						"short": "The species of the monster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "The type of monster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "weaknesses",
						"short": "Weaknesses of the monster",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "monster",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/monsters",
								"segments": []any{
									map[string]any{
										"lit": "monsters",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"monsters",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/monsters/{id}",
								"segments": []any{
									map[string]any{
										"lit": "monsters",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"monsters",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"motion_value": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "damageType",
						"short": "The type of damage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "exhaust",
						"short": "Exhaust value",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "hits",
						"short": "Hit information",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the motion value",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stun",
						"short": "Stun value",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "weaponType",
						"short": "The type of weapon",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "motion_value",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/motion-values",
								"segments": []any{
									map[string]any{
										"lit": "motion-values",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"motion-values",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/motion-values/{id}",
								"segments": []any{
									map[string]any{
										"lit": "motion-values",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"motion-values",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"skill": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "A description of the skill",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the skill",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the skill",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ranks",
						"short": "An array of skill ranks",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "skill",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/skills",
								"segments": []any{
									map[string]any{
										"lit": "skills",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"skills",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/skills/{id}",
								"segments": []any{
									map[string]any{
										"lit": "skills",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"skills",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"weapon": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "assets",
						"short": "Asset URLs for the weapon",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "attack",
						"short": "Attack values for the weapon",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "attributes",
						"short": "Additional weapon attributes",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "crafting",
						"short": "Crafting information for the weapon",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "damageType",
						"short": "The damage type of the weapon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elements",
						"short": "Elemental damage information",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "The ID of the weapon",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the weapon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rarity",
						"short": "The rarity of the weapon",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "slots",
						"short": "An array of decoration slot information",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"short": "The type of weapon",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "weapon",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/weapons",
								"segments": []any{
									map[string]any{
										"lit": "weapons",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"p",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"weapons",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/weapons/{id}",
								"segments": []any{
									map[string]any{
										"lit": "weapons",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"p",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"weapons",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
