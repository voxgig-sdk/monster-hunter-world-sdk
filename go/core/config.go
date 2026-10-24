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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "A short description of the ailment",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the ailment",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the ailment",
					},
					map[string]any{
						"name": "protection",
						"title": "Protection",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "recovery",
						"title": "Recovery",
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
								"kind": "http",
								"method": "GET",
								"orig": "/ailments",
								"segments": []any{
									map[string]any{
										"lit": "ailments",
									},
								},
								"parts": []any{
									"ailments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"ailments",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Armor Set",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "assets",
						"title": "Assets",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "attributes",
						"title": "Attributes",
						"type": "`$OBJECT`",
						"short": "Dictionary of attribute modifiers attached to the armor piece",
					},
					map[string]any{
						"name": "crafting",
						"title": "Crafting",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "defense",
						"title": "Defense",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the armor piece",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the armor piece",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$STRING`",
						"short": "The rank of the armor piece",
					},
					map[string]any{
						"name": "rarity",
						"title": "Rarity",
						"type": "`$INTEGER`",
						"short": "The rarity of the armor piece",
					},
					map[string]any{
						"name": "resistances",
						"title": "Resistances",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
						"short": "An array of skill ranks granted by the armor",
					},
					map[string]any{
						"name": "slots",
						"title": "Slots",
						"type": "`$ARRAY`",
						"short": "An array of decoration slot information",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The slot the armor piece fits in",
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
								"kind": "http",
								"method": "GET",
								"orig": "/armor",
								"segments": []any{
									map[string]any{
										"lit": "armor",
									},
								},
								"parts": []any{
									"armor",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"armor",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Bonus",
						"type": "`$OBJECT`",
						"short": "The set bonus, if any",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the armor set",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the armor set",
					},
					map[string]any{
						"name": "pieces",
						"title": "Pieces",
						"type": "`$ARRAY`",
						"short": "Array of armor pieces in the set",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$STRING`",
						"short": "The rank of the armor set",
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
								"parts": []any{
									"armor",
									"sets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"armor",
									"sets",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Crafting",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the charm",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the charm",
					},
					map[string]any{
						"name": "rarity",
						"title": "Rarity",
						"type": "`$INTEGER`",
						"short": "The rarity of the charm",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
						"short": "An array of skill ranks granted by the charm",
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
								"kind": "http",
								"method": "GET",
								"orig": "/charms",
								"segments": []any{
									map[string]any{
										"lit": "charms",
									},
								},
								"parts": []any{
									"charms",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"charms",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the decoration",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the decoration",
					},
					map[string]any{
						"name": "rarity",
						"title": "Rarity",
						"type": "`$INTEGER`",
						"short": "The rarity of the decoration",
					},
					map[string]any{
						"name": "skills",
						"title": "Skills",
						"type": "`$ARRAY`",
						"short": "An array of skill ranks granted by the decoration",
					},
					map[string]any{
						"name": "slot",
						"title": "Slot",
						"type": "`$INTEGER`",
						"short": "The slot rank required for the decoration",
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
								"kind": "http",
								"method": "GET",
								"orig": "/decorations",
								"segments": []any{
									map[string]any{
										"lit": "decorations",
									},
								},
								"parts": []any{
									"decorations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"decorations",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A description of the event",
					},
					map[string]any{
						"name": "endTimestamp",
						"title": "End Timestamp",
						"type": "`$STRING`",
						"short": "The end time of the event",
						"format": "date-time",
					},
					map[string]any{
						"name": "exclusive",
						"title": "Exclusive",
						"type": "`$STRING`",
						"short": "Whether the event is exclusive to a platform",
					},
					map[string]any{
						"name": "expansion",
						"title": "Expansion",
						"type": "`$STRING`",
						"short": "The expansion the event belongs to",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the event",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the event",
					},
					map[string]any{
						"name": "platform",
						"title": "Platform",
						"type": "`$STRING`",
						"short": "The platform for the event",
					},
					map[string]any{
						"name": "questRank",
						"title": "Quest Rank",
						"type": "`$STRING`",
						"short": "The quest rank of the event",
					},
					map[string]any{
						"name": "requirements",
						"title": "Requirements",
						"type": "`$STRING`",
						"short": "Requirements for the event",
					},
					map[string]any{
						"name": "startTimestamp",
						"title": "Start Timestamp",
						"type": "`$STRING`",
						"short": "The start time of the event",
						"format": "date-time",
					},
					map[string]any{
						"name": "successConditions",
						"title": "Success Conditions",
						"type": "`$STRING`",
						"short": "Conditions for success",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of event",
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
								"kind": "http",
								"method": "GET",
								"orig": "/events",
								"segments": []any{
									map[string]any{
										"lit": "events",
									},
								},
								"parts": []any{
									"events",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"events",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Buy Price",
						"type": "`$INTEGER`",
						"short": "The price when buying the item",
					},
					map[string]any{
						"name": "carryLimit",
						"title": "Carry Limit",
						"type": "`$INTEGER`",
						"short": "The maximum number of this item that can be carried",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A description of the item",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the item",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the item",
					},
					map[string]any{
						"name": "rarity",
						"title": "Rarity",
						"type": "`$INTEGER`",
						"short": "The rarity of the item",
					},
					map[string]any{
						"name": "sellPrice",
						"title": "Sell Price",
						"type": "`$INTEGER`",
						"short": "The price when selling the item",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$INTEGER`",
						"short": "The value of the item",
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
								"kind": "http",
								"method": "GET",
								"orig": "/items",
								"segments": []any{
									map[string]any{
										"lit": "items",
									},
								},
								"parts": []any{
									"items",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"items",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Camps",
						"type": "`$ARRAY`",
						"short": "An array of camps in the location",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the location",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the location",
					},
					map[string]any{
						"name": "zoneCount",
						"title": "Zone Count",
						"type": "`$INTEGER`",
						"short": "The number of zones in the location",
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
								"kind": "http",
								"method": "GET",
								"orig": "/locations",
								"segments": []any{
									map[string]any{
										"lit": "locations",
									},
								},
								"parts": []any{
									"locations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"locations",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Ailments",
						"type": "`$ARRAY`",
						"short": "Ailments the monster can inflict",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "A description of the monster",
					},
					map[string]any{
						"name": "elements",
						"title": "Elements",
						"type": "`$ARRAY`",
						"short": "Elements the monster uses",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the monster",
					},
					map[string]any{
						"name": "locations",
						"title": "Locations",
						"type": "`$ARRAY`",
						"short": "Locations where the monster can be found",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the monster",
					},
					map[string]any{
						"name": "resistances",
						"title": "Resistances",
						"type": "`$ARRAY`",
						"short": "Resistances of the monster",
					},
					map[string]any{
						"name": "rewards",
						"title": "Rewards",
						"type": "`$ARRAY`",
						"short": "Rewards obtained from the monster",
					},
					map[string]any{
						"name": "species",
						"title": "Species",
						"type": "`$STRING`",
						"short": "The species of the monster",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of monster",
					},
					map[string]any{
						"name": "weaknesses",
						"title": "Weaknesses",
						"type": "`$ARRAY`",
						"short": "Weaknesses of the monster",
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
								"kind": "http",
								"method": "GET",
								"orig": "/monsters",
								"segments": []any{
									map[string]any{
										"lit": "monsters",
									},
								},
								"parts": []any{
									"monsters",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"monsters",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Damage Type",
						"type": "`$STRING`",
						"short": "The type of damage",
					},
					map[string]any{
						"name": "exhaust",
						"title": "Exhaust",
						"type": "`$INTEGER`",
						"short": "Exhaust value",
					},
					map[string]any{
						"name": "hits",
						"title": "Hits",
						"type": "`$ARRAY`",
						"short": "Hit information",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the motion value",
					},
					map[string]any{
						"name": "stun",
						"title": "Stun",
						"type": "`$INTEGER`",
						"short": "Stun value",
					},
					map[string]any{
						"name": "weaponType",
						"title": "Weapon Type",
						"type": "`$STRING`",
						"short": "The type of weapon",
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
								"kind": "http",
								"method": "GET",
								"orig": "/motion-values",
								"segments": []any{
									map[string]any{
										"lit": "motion-values",
									},
								},
								"parts": []any{
									"motion-values",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"motion-values",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Description",
						"type": "`$STRING`",
						"short": "A description of the skill",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the skill",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the skill",
					},
					map[string]any{
						"name": "ranks",
						"title": "Ranks",
						"type": "`$ARRAY`",
						"short": "An array of skill ranks",
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
								"kind": "http",
								"method": "GET",
								"orig": "/skills",
								"segments": []any{
									map[string]any{
										"lit": "skills",
									},
								},
								"parts": []any{
									"skills",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"skills",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Assets",
						"type": "`$OBJECT`",
						"short": "Asset URLs for the weapon",
					},
					map[string]any{
						"name": "attack",
						"title": "Attack",
						"type": "`$OBJECT`",
						"short": "Attack values for the weapon",
					},
					map[string]any{
						"name": "attributes",
						"title": "Attributes",
						"type": "`$OBJECT`",
						"short": "Additional weapon attributes",
					},
					map[string]any{
						"name": "crafting",
						"title": "Crafting",
						"type": "`$OBJECT`",
						"short": "Crafting information for the weapon",
					},
					map[string]any{
						"name": "damageType",
						"title": "Damage Type",
						"type": "`$STRING`",
						"short": "The damage type of the weapon",
					},
					map[string]any{
						"name": "elements",
						"title": "Elements",
						"type": "`$ARRAY`",
						"short": "Elemental damage information",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ID of the weapon",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the weapon",
					},
					map[string]any{
						"name": "rarity",
						"title": "Rarity",
						"type": "`$INTEGER`",
						"short": "The rarity of the weapon",
					},
					map[string]any{
						"name": "slots",
						"title": "Slots",
						"type": "`$ARRAY`",
						"short": "An array of decoration slot information",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The type of weapon",
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
								"kind": "http",
								"method": "GET",
								"orig": "/weapons",
								"segments": []any{
									map[string]any{
										"lit": "weapons",
									},
								},
								"parts": []any{
									"weapons",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"weapons",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "p",
											"orig": "p",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
