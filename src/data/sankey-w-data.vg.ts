export default
{
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"autosize": {
		"type": "fit",
		"contains": "padding"
	},
	"signals": [
		{
			"name": "width",
			"init": "containerSize()[0]",
			"on": [
				{
					"events": "window:resize",
					"update": "containerSize()[0]"
				}
			]
		},
		{
			"name": "height",
			"init": "containerSize()[0]/16*9",
			"on": [
				{
					"events": "window:resize",
					"update": "containerSize()[0]/16*9"
				}
			]
		},
		{
			"name": "fontSize",
			"init": "containerSize()[0]/70",
			"on": [
				{
					"events": "window:resize",
					"update": "containerSize()[0]/70"
				}
			]
		},
		{
			"name": "standardGap",
			"value": 14,
			"description": "Gap as a percentage of full domain"
		},
		{
			"name": "maxValue",
			"init": "data('maxValue')[0].value"
		},
		{
			"name": "spacer",
			"init": "maxValue/(100 * 1.)*standardGap"
		}
	],
	"data": [
		{
			"name": "entries",
			"format": {
				"type": "csv",
				"parse": {
					"category": "string",
					"stack": "number",
					"sort": "number",
					"labels": "string",
					"color": "string"
				}
			},
			"values": "name,category,stack,sort,labels,color,\r\nMar '22,bill_mar_22,1,1,left,blue,\"USAA 2022, March 2022\"\r\nMay '22,bill_may_22,1,2,left,blue,\"+USAA 2022, May 2022\"\r\nSep '22,bill_sep_22,1,3,left,blue,\"USAA 2023, September 2022\"\r\nDec '22,bill_dec_22,1,4,left,blue,\"+USAA 2023, December 2022\"\r\nTotal,total_budget,2,1,left,blue,\r\nDirect aid to Ukraine,direct,3,1,left,green,\r\nOther,other,3,2,left,grey,\r\nMilitary Aid,military,4,1,left,green,\r\nHumanitarian & Economic Aid,human,4,2,left,pink,\r\nInstant aid (PDA),instant_total,5,1,left,green,\r\nCommitted,instant_committed,6,1,right,green,\r\nAvailable,instant_available,6,2,right,green,\r\nExpired funds,instant_expired,6,3,right,red,\r\nDeferred aid (USAI & FMF),deferred_total,5,2,left,#f2cf5b,\r\nCommitted.,deferred_committed,6,4,right,#f2cf5b,\r\nAvailable.,deferred_available,6,5,right,#f2cf5b,"
		},
		{
			"name": "connections",
			"format": {
				"type": "csv",
				"parse": {
					"source": "string",
					"destination": "string",
					"value": "number"
				}
			},
			"values": "source,value,destination,\r\nbill_mar_22,13.6005,total_budget,\"USAA 2022, March 2022\"\r\nbill_may_22,40.143,total_budget,\"+USAA 2022, May 2022\"\r\nbill_sep_22,11.837,total_budget,\"USAA 2023, September 2022\"\r\nbill_dec_22,47.3218,total_budget,\"+USAA 2023, December 2022\"\r\ntotal_budget,80.7233,direct,\r\ntotal_budget,32.179,other,\r\ndirect,45.877,military,\r\ndirect,34.8463,human,\r\nmilitary,25.5,instant_total,\r\ninstant_total,15.535,instant_committed,\r\ninstant_total,5.59,instant_available,\r\ninstant_total,4.375,instant_expired,\r\nmilitary,20.377,deferred_total,\r\ndeferred_total,18.242,deferred_committed,\r\ndeferred_total,2.135,deferred_available,"
		},
		{
			"name": "preStacks",
			"source": "connections",
			"transform": [
				{
					"type": "formula",
					"as": "end",
					"expr": "['source','destination']"
				},
				{
					"type": "formula",
					"as": "name",
					"expr": "[datum.source,datum.destination]"
				},
				{
					"type": "project",
					"fields": [
						"end",
						"name",
						"value"
					]
				},
				{
					"type": "flatten",
					"fields": [
						"end",
						"name"
					]
				},
				{
					"type": "aggregate",
					"fields": [
						"value"
					],
					"groupby": [
						"end",
						"name"
					],
					"ops": [
						"sum"
					],
					"as": [
						"value"
					]
				},
				{
					"type": "aggregate",
					"fields": [
						"value"
					],
					"groupby": [
						"name"
					],
					"ops": [
						"max"
					],
					"as": [
						"value"
					]
				}
			]
		},
		{
			"name": "stacks",
			"source": "preStacks",
			"transform": [
				{
					"type": "lookup",
					"from": "entries",
					"key": "category",
					"fields": [
						"name"
					],
					"values": [
						"stack",
						"sort",
						"gap",
						"labels",
						"color"
					],
					"as": [
						"stack",
						"sort",
						"gap",
						"labels",
						"color"
					]
				},
				{
					"type": "formula",
					"as": "gap",
					"expr": "datum.gap?datum.gap:0"
				}
			]
		},
		{
			"name": "maxValue",
			"source": [
				"stacks"
			],
			"transform": [
				{
					"type": "aggregate",
					"fields": [
						"value"
					],
					"groupby": [
						"stack"
					],
					"ops": [
						"sum"
					],
					"as": [
						"value"
					]
				},
				{
					"type": "aggregate",
					"fields": [
						"value"
					],
					"ops": [
						"max"
					],
					"as": [
						"value"
					]
				}
			]
		},
		{
			"name": "plottedStacks",
			"source": [
				"stacks"
			],
			"transform": [
				{
					"type": "formula",
					"as": "type",
					"expr": "['data','spacer']"
				},
				{
					"type": "formula",
					"as": "spacedValue",
					"expr": "[datum.value,spacer]"
				},
				{
					"type": "flatten",
					"fields": [
						"type",
						"spacedValue"
					]
				},
				{
					"type": "stack",
					"groupby": [
						"stack"
					],
					"sort": {
						"field": "sort",
						"order": "descending"
					},
					"field": "spacedValue",
					"offset": "center"
				},
				{
					"type": "formula",
					"expr": "((datum.value)/2)+datum.y0",
					"as": "yc"
				}
			]
		},
		{
			"name": "finalTable",
			"source": [
				"plottedStacks"
			],
			"transform": [
				{
					"type": "filter",
					"expr": "datum.type == 'data'"
				}
			]
		},
		{
			"name": "linkTable",
			"source": [
				"connections"
			],
			"transform": [
				{
					"type": "lookup",
					"from": "finalTable",
					"key": "name",
					"values": [
						"y0",
						"y1",
						"stack",
						"sort"
					],
					"fields": [
						"source"
					],
					"as": [
						"sourceStacky0",
						"sourceStacky1",
						"sourceStack",
						"sourceSort"
					]
				},
				{
					"type": "lookup",
					"from": "finalTable",
					"key": "name",
					"values": [
						"y0",
						"y1",
						"stack",
						"sort",
						"color"
					],
					"fields": [
						"destination"
					],
					"as": [
						"destinationStacky0",
						"destinationStacky1",
						"destinationStack",
						"destinationSort",
						"color"
					]
				},
				{
					"type": "stack",
					"groupby": [
						"source"
					],
					"sort": {
						"field": "destinationSort",
						"order": "descending"
					},
					"field": "value",
					"offset": "zero",
					"as": [
						"syi0",
						"syi1"
					]
				},
				{
					"type": "formula",
					"expr": "datum.syi0+datum.sourceStacky0",
					"as": "sy0"
				},
				{
					"type": "formula",
					"expr": "datum.sy0+datum.value",
					"as": "sy1"
				},
				{
					"type": "stack",
					"groupby": [
						"destination"
					],
					"sort": {
						"field": "sourceSort",
						"order": "descending"
					},
					"field": "value",
					"offset": "zero",
					"as": [
						"dyi0",
						"dyi1"
					]
				},
				{
					"type": "formula",
					"expr": "datum.dyi0+datum.destinationStacky0",
					"as": "dy0"
				},
				{
					"type": "formula",
					"expr": "(datum.dy0+datum.value)",
					"as": "dy1"
				},
				{
					"type": "formula",
					"expr": "((datum.value)/2)+datum.sy0",
					"as": "syc"
				},
				{
					"type": "formula",
					"expr": "((datum.value)/2)+datum.dy0",
					"as": "dyc"
				},
				{
					"type": "formula",
					"expr": "range('y')[0]-scale('y', datum.value)",
					"as": "sample"
				},
				{
					"type": "linkpath",
					"orient": "horizontal",
					"shape": "diagonal",
					"sourceY": {
						"expr": "scale('y', datum.syc)"
					},
					"sourceX": {
						"expr": "scale('x', toNumber(datum.sourceStack)) + bandwidth('x')"
					},
					"targetY": {
						"expr": "scale('y', datum.dyc)"
					},
					"targetX": {
						"expr": "scale('x', datum.destinationStack)"
					}
				},
				{
					"type": "formula",
					"expr": "(range('y')[0]-scale('y', datum.value)) / 1.",
					"as": "strokeWidth"
				}
			]
		}
	],
	"scales": [
		{
			"name": "x",
			"type": "band",
			"range": "width",
			"domain": {
				"data": "finalTable",
				"field": "stack"
			},
			"paddingInner": 0.9
		},
		{
			"name": "y",
			"type": "linear",
			"range": "height",
			"domain": {
				"data": "finalTable",
				"field": "y1"
			},
			"reverse": false
		}
	],
	"marks": [
		{
			"type": "rect",
			"from": {
				"data": "finalTable"
			},
			"encode": {
				"update": {
					"x": {
						"scale": "x",
						"field": "stack"
					},
					"width": {
						"scale": "x",
						"band": 1
					},
					"y": {
						"scale": "y",
						"field": "y0"
					},
					"y2": {
						"scale": "y",
						"field": "y1"
					},
					"fill": {
						"field": "color"
					},
					"fillOpacity": {
						"value": 0.75
					},
					"strokeWidth": {
						"value": 0
					},
					"stroke": {
						"field": "color"
					}
				},
				"hover": {
					"_tooltip": {
						"signal": "{'Name':datum.name, 'Value':format(datum.value, '$') + ' B'}"
					},
					"fillOpacity": {
						"value": 1
					}
				}
			}
		},
		{
			"type": "path",
			"name": "links",
			"from": {
				"data": "linkTable"
			},
			"clip": true,
			"encode": {
				"update": {
					"strokeWidth": {
						"field": "strokeWidth"
					},
					"path": {
						"field": "path"
					},
					"strokeOpacity": {
						"signal": "0.3"
					},
					"stroke": {
						"field": "color"
					}
				},
				"hover": {
					"strokeOpacity": {
						"value": 1
					},
					"_tooltip": {
						"signal": "{'Source':datum.source,'Destination':datum.destination, 'Value':format(datum.value, '$') + ' B'}"
					}
				}
			}
		},
		{
			"type": "group",
			"name": "labelText",
			"zindex": 1,
			"from": {
				"facet": {
					"data": "finalTable",
					"name": "labelFacet",
					"groupby": [
						"name",
						"stack",
						"yc",
						"value",
						"labels"
					]
				}
			},
			"clip": false,
			"encode": {
				"update": {
					"strokeWidth": {
						"value": 1
					},
					"stroke": {
						"value": "red"
					},
					"x": {
						"signal": "datum.labels=='left'?scale('x', datum.stack) - 8 : scale('x', datum.stack) + (bandwidth('x')) + 8"
					},
					"yc": {
						"scale": "y",
						"signal": "datum.yc"
					},
					"width": {
						"signal": "0"
					},
					"height": {
						"signal": "0"
					},
					"fillOpacity": {
						"signal": "0.1"
					}
				}
			},
			"marks": [
				{
					"type": "text",
					"name": "heading",
					"from": {
						"data": "labelFacet"
					},
					"encode": {
						"update": {
							"x": {
								"value": 0
							},
							"y": {
								"value": -2
							},
							"text": {
								"field": "name"
							},
							"align": {
								"signal": "datum.labels=='left'?'right':'left'"
							},
							"fontWeight": {
								"value": "normal"
							}
						}
					}
				},
				{
					"type": "text",
					"name": "amount",
					"from": {
						"data": "labelFacet"
					},
					"encode": {
						"update": {
							"x": {
								"value": 0
							},
							"y": {
								"signal": "fontSize"
							},
							"text": {
								"signal": " format(datum.value, '$.2f') + ' B'"
							},
							"align": {
								"signal": "datum.labels=='left'?'right':'left'"
							}
						}
					}
				}
			]
		},
		{
			"type": "rect",
			"from": {
				"data": "labelText"
			},
			"encode": {
				"update": {
					"x": {
						"field": "bounds.x1",
						"offset": -4
					},
					"x2": {
						"field": "bounds.x2",
						"offset": 4
					},
					"y": {
						"field": "bounds.y1",
						"offset": -4
					},
					"y2": {
						"field": "bounds.y2",
						"offset": 4
					},
					"fill": {
						"value": "white"
					},
					"opacity": {
						"value": 0.7
					},
					"cornerRadius": {
						"value": 4
					}
				}
			}
		}
	],
	"config": {
		"view": {
			"stroke": "transparent"
		},
		"text": {
			"fontSize": {
				"signal": "fontSize"
			},
			"fill": "#333333"
		}
	}
}