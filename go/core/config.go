package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "MonsterHunterWorld",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://mhw-db.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "protection",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "recovery",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "ailment",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/ailments",
								"parts": []any{
									"ailments",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/ailments/{id}",
								"parts": []any{
									"ailments",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"armor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "armor_set",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "asset",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "attribute",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "crafting",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "defense",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "rank",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "rarity",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "resistance",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "skill",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "slot",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 11,
					},
					map[string]any{
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 12,
					},
				},
				"name": "armor",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/armor",
								"parts": []any{
									"armor",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/armor/{id}",
								"parts": []any{
									"armor",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "piece",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "rank",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "armor_set",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/armor/sets",
								"parts": []any{
									"armor",
									"sets",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/armor/sets/{id}",
								"parts": []any{
									"armor",
									"sets",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "rarity",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "skill",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "charm",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/charms",
								"parts": []any{
									"charms",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/charms/{id}",
								"parts": []any{
									"charms",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "rarity",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "skill",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "slot",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "decoration",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/decorations",
								"parts": []any{
									"decorations",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/decorations/{id}",
								"parts": []any{
									"decorations",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "end_timestamp",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "exclusive",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "expansion",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "location",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "platform",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "quest_rank",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "requirement",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "start_timestamp",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 10,
					},
					map[string]any{
						"name": "success_condition",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 11,
					},
					map[string]any{
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 12,
					},
				},
				"name": "event",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/events",
								"parts": []any{
									"events",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/events/{id}",
								"parts": []any{
									"events",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"item": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "buy_price",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "carry_limit",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "rarity",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "sell_price",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "value",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 7,
					},
				},
				"name": "item",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/items",
								"parts": []any{
									"items",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/items/{id}",
								"parts": []any{
									"items",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"location": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "camp",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "zone_count",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "location",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/locations",
								"parts": []any{
									"locations",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/locations/{id}",
								"parts": []any{
									"locations",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"monster": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ailment",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "element",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "location",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "resistance",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "reward",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "species",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "weakness",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 10,
					},
				},
				"name": "monster",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/monsters",
								"parts": []any{
									"monsters",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/monsters/{id}",
								"parts": []any{
									"monsters",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"motion_value": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "damage_type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "exhaust",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "hit",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "stun",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "weapon_type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
				},
				"name": "motion_value",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/motion-values",
								"parts": []any{
									"motion-values",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/motion-values/{id}",
								"parts": []any{
									"motion-values",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "rank",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "skill",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/skills",
								"parts": []any{
									"skills",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/skills/{id}",
								"parts": []any{
									"skills",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"weapon": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asset",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "attack",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "attribute",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "crafting",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "damage_type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "element",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "rarity",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "slot",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 9,
					},
					map[string]any{
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 10,
					},
				},
				"name": "weapon",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/weapons",
								"parts": []any{
									"weapons",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "p",
											"orig": "p",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/weapons/{id}",
								"parts": []any{
									"weapons",
									"{id}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
