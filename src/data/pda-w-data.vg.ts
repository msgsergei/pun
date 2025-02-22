export default
{
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"autosize": {
		"type": "fit",
		"contains": "padding"
	},
	"background": null,
	"padding": 5,
	"style": "cell",
	"data": [
		{
			"name": "PDA",
			"format": {
				"type": "csv",
				"parse": {
					"Date": "date",
					"PDA_adjusted": "number"
				}
			},
			"transform": [
				{
					"type": "filter",
					"expr": "datum.Date > datetime(2022, 1, 1)"
				},
				{
					"type": "formula",
					"expr": "datum.PDA_adjusted / 1000",
					"as": "PDA_adjusted"
				},
				{
					"field": "Date",
					"type": "timeunit",
					"units": [
						"year",
						"month"
					],
					"as": [
						"label",
						"label_end"
					]
				},
				{
					"type": "aggregate",
					"groupby": [
						"label"
					],
					"ops": [
						"sum"
					],
					"fields": [
						"PDA_adjusted"
					],
					"as": [
						"amount"
					]
				},
				{
					"type": "filter",
					"expr": "datum.amount != 0"
				},
				{
					"type": "window",
					"params": [
						null
					],
					"as": [
						"sum"
					],
					"ops": [
						"sum"
					],
					"fields": [
						"amount"
					],
					"sort": {
						"field": [],
						"order": []
					}
				},
				{
					"type": "window",
					"params": [
						null
					],
					"as": [
						"lead"
					],
					"ops": [
						"lead"
					],
					"fields": [
						"label"
					],
					"sort": {
						"field": [],
						"order": []
					}
				},
				{
					"type": "formula",
					"expr": "datum.lead === null ? datum.label : datum.lead",
					"as": "lead"
				},
				{
					"type": "formula",
					"expr": "datum.label === 'End' ? 0 : datum.sum - datum.amount",
					"as": "previous_sum"
				},
				{
					"type": "formula",
					"expr": "datum.label === 'End' ? datum.sum : datum.amount",
					"as": "amount"
				},
				{
					"type": "formula",
					"expr": "join(['$', format(datum.amount, '.2f'), 'B'], '')",
					"as": "text_amount"
				},
				{
					"type": "formula",
					"expr": "(datum.sum + datum.previous_sum) / 2",
					"as": "center"
				},
				{
					"type": "formula",
					"expr": "datum.sum < datum.previous_sum ? datum.sum : ''",
					"as": "sum_dec"
				},
				{
					"type": "formula",
					"expr": "datum.sum > datum.previous_sum ? datum.sum : ''",
					"as": "sum_inc"
				}
			],
			"values": "Date,PDA,USAI,FMF,Notes,Source,,Relevant Appropriation Bill,FY,PDA cap,PDA replenishment,USAI,FMF,(FMF Ukr),(FMF not Ukr),Total Ukr,,PDA_corrected,PDA_adjusted\r\n2021-12-23,200,,,,https://www.defense.gov/News/Tag/215492/StartDate/2021-12-23/EndDate/2021-12-23,,2022-03-15,2022,\"3,000\",\"3,500\",,650,318,,,,200,160\r\n2022-02-25,350,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-02-25/EndDate/2022-02-25,,2022-05-21,2022,\"11,000\",\"9,050\",\"6,000\",\"4,000\",\"1,000\",\"1,069\",,,350,280\r\n2022-03-12,200,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-03-12/EndDate/2022-03-12,,2022-09-30,2023,\"3,700\",\"1,500\",\"3,000\",,,,,,200,160\r\n2022-03-16,800,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-03-16/EndDate/2022-03-16,,2022-12-29,2023,\"14,500\",\"11,880\",\"9,000\",,,,,,800,639\r\n2022-04-01,,300,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-04-01/EndDate/2022-04-01,,2023-09-30,2024,0,,300,,,,,,,0\r\n2022-04-06,100,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-04-06/EndDate/2022-04-06,,Total Appropriated,,\"25,500\",\"25,930\",\"18,900\",\"4,650\",\"1,318\",\"1,069\",\"45,718\",,100,80\r\n2022-04-13,800,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-04-13/EndDate/2022-04-13,,Notified Congress & Announced,2022,\"9,225\",,\"4,795\",\"2,913\",\"1,318\",\"1,595\",,,800,639\r\n2022-04-21,800,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-04-21/EndDate/2022-04-21,,Notified Congress & Announced,2023,\"14,650\",,\"13,805\",\"1,200\",325,875,,,800,639\r\n2022-04-24,,,318,713 total,https://www.state.gov/u-s-security-cooperation-with-ukraine/,,Notified Congress & Announced,2024,0,,300,0,0,,,,,0\r\n2022-05-06,150,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-05-06/EndDate/2022-05-06,,Total Notified & Announced,,\"23,875\",,\"18,900\",\"4,113\",\"1,643\",\"2,470\",\"44,418\",,150,120\r\n2022-05-19,100,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-05-19/EndDate/2022-05-19,,Revaluation due to Accounting Error,2022,\"2,600\",,,,,,,,100,80\r\n2022-06-01,700,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-06-01/EndDate/2022-06-01,,Revaluation due to Accounting Error,2023,\"3,600\",,,,,,,,700,559\r\n2022-06-14,,650,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-06-14/EndDate/2022-06-14,,Total Revaluation,,\"6,200\",,,,,,,,,0\r\n2022-06-15,350,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-06-15/EndDate/2022-06-15,,Announced from Revaluation,2023,800,,,,,,,,350,280\r\n2022-06-23,450,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-06-23/EndDate/2022-06-23,,Announced from Revaluation,2024,\"1,200\",,,,,,,,450,359\r\n2022-06-30,,770,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-06-30/EndDate/2022-06-30,,Total Announced from Revaluation,,\"2,000\",,,,,,,,,0\r\n2022-07-01,50,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-07-01/EndDate/2022-07-01,,Announced Corrected,2022,\"6,625\",,,,,,,,50,40\r\n2022-07-08,400,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-07-08/EndDate/2022-07-08,,Announced Corrected,2023,\"11,850\",,,,,,,,400,320\r\n2022-07-22,175,95,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-07-22/EndDate/2022-07-22,,Announced Corrected,2024,\"1,200\",,,,,,,,175,139.7969052\r\n2022-08-01,550,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-08-01/EndDate/2022-08-01,,Total Announced Corrected,,\"19,675\",,\"18,900\",\"4,113\",\"1,643\",\"2,470\",\"40,218\",,550,439.3617021\r\n2022-08-08,1000,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-08-08/EndDate/2022-08-08,,FY 2022-23 Announced Corrected,,\"18,475\",,,,,,,,1000,798.8394584\r\n2022-08-19,775,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-08-19/EndDate/2022-08-19,,FY 2022-23 Unused,,\"7,025\",,,,,,,,775,619.1005803\r\n2022-08-24,,2980,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-08-24/EndDate/2022-08-24,,FY 2022 Expired,,\"1,625\",,,,,,,,,0\r\n2022-09-08,675,,1000,,https://www.defense.gov/News/Releases/Release/Article/3152071/675-million-in-additional-security-assistance-for-ukraine/,,Available,,\"4,200\",0,0,537,,,\"4,200\",,675,539.2166344\r\n2022-09-15,600,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-09-15/EndDate/2022-09-15,,,,,,,,,,,,600,479.303675\r\n2022-09-28,,1105,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-09-28/EndDate/2022-09-28,,Total Reported by Pentagon,,,,,,,,\"44,200\",,,0\r\n2022-10-04,625,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-10-04/EndDate/2022-10-04,,The same calculated,,,,,,,,\"44,218\",,625,499.2746615\r\n2022-10-14,725,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-10-14/EndDate/2022-10-14,,,,,,,,,,,,725,579.1586074\r\n2022-10-28,275,,,,https://comptroller.defense.gov/Budget-Execution/PDA_Announcements/,,,,,,,,,,,,275,219.6808511\r\n2022-11-04,,400,,,https://comptroller.defense.gov/Budget-Execution/USAI_Announcements/,,,,,,,,,,,,,0\r\n2022-11-10,400,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-11-10/EndDate/2022-11-10,,,,,,,,,,,,400,319.5357834\r\n2022-11-23,400,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-11-23/EndDate/2022-11-23,,,,,,,,,,,,400,319.5357834\r\n2022-12-09,275,,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-12-09/EndDate/2022-12-09,,,,,,,,,,,,275,219.6808511\r\n2022-12-21,1000,850,,,https://www.defense.gov/News/Tag/215492/StartDate/2022-12-21/EndDate/2022-12-21,,,,,,,,,,,,1000,798.8394584\r\n2023-01-06,2850,,225,,https://www.defense.gov/News/Releases/Release/Article/3261263/more-than-3-billion-in-additional-security-assistance-for-ukraine/,,,,,,,,,,,,2850,1680.769231\r\n2023-01-19,2500,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-01-19/EndDate/2023-01-19,,,,,,,,,,,,2500,1474.358974\r\n2023-01-25,,400,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-01-25/EndDate/2023-01-25,,,,,,,,,,,,,0\r\n2023-02-03,425,1750,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-02-03/EndDate/2023-02-03,,,,,,,,,,,,425,250.6410256\r\n2023-02-20,450,,,,https://www.whitehouse.gov/briefing-room/presidential-actions/2023/02/20/memorandum-on-delegation-of-authority-under-sections-506a1-and-552c2-of-the-foreign-assistance-act-of-1961/,,,,,,,,,,,,450,265.3846154\r\n2023-02-24,,2000,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-02-24/EndDate/2023-02-24,,,,,,,,,,,,,0\r\n2023-03-03,400,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-03-03/EndDate/2023-03-03,,,,,,,,,,,,400,235.8974359\r\n2023-03-20,350,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-03-20/EndDate/2023-03-20,,,,,,,,,,,,350,206.4102564\r\n2023-04-04,500,2100,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-04-04/EndDate/2023-04-04,https://media.defense.gov/2023/Apr/04/2003192566/-1/-1/1/UKRAINE-FACT-SHEET-APR-4.PDF,,,,,,,,,,,500,294.8717949\r\n2023-04-19,325,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-04-19/EndDate/2023-04-19,,,,,,,,,,,,325,191.6666667\r\n2023-05-03,300,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-05-03/EndDate/2023-05-03,,,,,,,,,,,,300,176.9230769\r\n2023-05-09,,1200,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-05-09/EndDate/2023-05-09,,,,,,,,,,,,,0\r\n2023-05-21,375,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-05-21/EndDate/2023-05-21,,,,,,,,,,,,375,221.1538462\r\n2023-05-31,300,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-05-31/EndDate/2023-05-31,https://media.defense.gov/2023/May/31/2003232961/-1/-1/1/UKRAINE-FACT-SHEET-PDA-39.PDF,,,,,,,,,,,300,176.9230769\r\n2023-06-09,,2100,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-06-09/EndDate/2023-06-09,,,,,,,,,,,,-6200,0\r\n2023-06-13,325,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-06-13/EndDate/2023-06-13,,,,,,,,,,,,325,325\r\n2023-06-27,500,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-06-27/EndDate/2023-06-27,,,,,,,,,,,,500,500\r\n2023-07-07,800,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-07-07/EndDate/2023-07-07,https://media.defense.gov/2023/Jul/07/2003255319/-1/-1/1/UKRAINE-FACT-SHEET.PDF,,,,,,,,,,,800,800\r\n2023-07-19,,1300,,,https://www.defense.gov/News/Releases/Release/Article/3463890/biden-administration-announces-additional-security-assistance-for-ukraine/,,,,,,,,,,,,,\r\n2023-07-25,400,,,,https://www.defense.gov/News/Tag/215492/StartDate/2023-07-25/EndDate/2023-07-25,https://media.defense.gov/2023/Jul/25/2003267256/-1/-1/0/UKRAINE-FACT-SHEET.PDF,,,,,,,,,,,400,400\r\n2023-08-14,200,,,,https://www.defense.gov/News/Releases/Release/Article/3491937/biden-administration-announces-additional-security-assistance-for-ukraine/,https://media.defense.gov/2023/Aug/14/2003280324/-1/-1/1/UKRAINE_FACT_SHEET_PDA%2044_.PDF,,,,,,,,,,,200,200\r\n2023-08-29,250,,,,https://www.defense.gov/News/News-Stories/Article/Article/3509657/aim-9m-missiles-250-million-in-additional-security-assistance-headed-for-ukraine/,https://media.defense.gov/2023/Aug/29/2003290634/-1/-1/1/20230829_UKRAINE_FACT_SHEET.PDF,,,,,,,,,,,250,250\r\n2023-09-06,175,,,,https://www.defense.gov/News/News-Stories/Article/Article/3517088/dod-announces-175m-in-additional-security-assistance-for-ukraine/,https://media.defense.gov/2023/Sep/06/2003295126/-1/-1/1/UKRAINE_FACT_SHEET_PDA_46.PDF,,,,,,,,,,,175,175\r\n2023-09-07,,600,100,,https://www.defense.gov/News/Releases/Release/Article/3518903/biden-administration-announces-additional-security-assistance-for-ukraine/,https://media.defense.gov/2023/Sep/07/2003296114/-1/-1/0/UKRAINE-FACT-SHEET.PDF,https://www.state.gov/secretary-blinkens-travel-to-ukraine-2/,,,,,,,,,,,\r\n2023-09-21,325,,,,https://www.defense.gov/News/Releases/Release/Article/3534283/biden-administration-announces-additional-security-assistance-for-ukraine/,https://media.defense.gov/2023/Sep/21/2003306164/-1/-1/0/Ukraine-Fact-Sheet.PDF,,,,,,,,,,,325,325\r\n2023-10-11,200,,,,https://www.defense.gov/News/Releases/Release/Article/3553644/biden-administration-announces-additional-security-assistance-for-ukraine/,https://media.defense.gov/2023/Oct/11/2003317334/-1/-1/0/UKRAINE-FACT-SHEET-PDA-48.PDF,,,,,,,,,,,200,200\r\n2023-10-26,150,,,,https://www.defense.gov/News/News-Stories/Article/Article/3570190/dod-announces-up-to-150m-in-aid-for-ukraine/,https://media.defense.gov/2023/Oct/26/2003328546/-1/-1/0/UKRAINE-FACT-SHEET-PDA-49.PDF,,,,,,,,,,,150,150\r\n2023-11-03,125,300,,,https://www.defense.gov/News/Releases/Release/Article/3578754/biden-administration-announces-new-security-assistance-for-ukraine/,https://media.defense.gov/2023/Nov/03/2003333874/-1/-1/1/UKRAINE_FACT_SHEET_3_NOV.PDF,,,,,,,,,,,125,125\r\n2023-11-20,100,,,,https://www.defense.gov/News/Releases/Release/Article/3594318/biden-administration-announces-new-security-assistance-for-ukraine/,https://media.defense.gov/2023/Nov/20/2003344157/-1/-1/1/202311017_UKRAINE_FACT_SHEET_PDA_51.PDF,,,,,,,,,,,100,100\r\n2023-12-06,175,,,,https://www.defense.gov/News/Releases/Release/Article/3608913/biden-administration-announces-new-security-assistance-for-ukraine/,https://media.defense.gov/2023/Dec/06/2003352825/-1/-1/1/202311206_UKRAINE_FACT_SHEET_PDA_52_003.PDF,,,,,,,,,,,175,175\r\n2023-12-12,200,,,,https://www.defense.gov/News/Releases/Release/Article/3615582/biden-administration-announces-new-security-assistance-for-ukraine/,https://media.defense.gov/2023/Dec/12/2003357747/-1/-1/1/UKRAINE-FACT-SHEET-DEC-12.PDF,,,,,,,,,,,200,200\r\n2023-12-27,250,,,,https://www.defense.gov/News/Releases/Release/Article/3627179/biden-administration-announces-new-security-assistance-for-ukraine/,https://media.defense.gov/2023/Dec/27/2003366049/-1/-1/1/UKRAINE-FACT-SHEET-27-DEC.PDF,,,,,,,,,,,250,250"
		},
		{
			"name": "data_0",
			"source": "PDA",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"previous_sum\"]) && isFinite(+datum[\"previous_sum\"])"
				}
			]
		},
		{
			"name": "data_1",
			"source": "PDA",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"sum\"]) && isFinite(+datum[\"sum\"])"
				}
			]
		},
		{
			"name": "data_2",
			"source": "PDA",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"sum_inc\"]) && isFinite(+datum[\"sum_inc\"])"
				}
			]
		},
		{
			"name": "data_3",
			"source": "PDA",
			"transform": [
				{
					"type": "filter",
					"expr": "(isDate(datum[\"label\"]) || (isValid(datum[\"label\"]) && isFinite(+datum[\"label\"]))) && isValid(datum[\"sum_dec\"]) && isFinite(+datum[\"sum_dec\"])"
				}
			]
		}
	],
	"signals": [
		{
			"name": "width",
			"init": "isFinite(containerSize()[0]) ? containerSize()[0] : 200",
			"on": [
				{
					"update": "isFinite(containerSize()[0]) ? containerSize()[0] : 200",
					"events": "window:resize"
				}
			]
		},
		{
			"name": "height",
			"init": "isFinite(containerSize()[1]) ? containerSize()[1] : 200",
			"on": [
				{
					"update": "isFinite(containerSize()[1]) ? containerSize()[1] : 200",
					"events": "window:resize"
				}
			]
		},
		{
			"name": "fontSize",
			"update": "width/70"
		}
	],
	"marks": [
		{
			"name": "layer_0_marks",
			"type": "rect",
			"style": [
				"bar"
			],
			"from": {
				"data": "data_0"
			},
			"encode": {
				"update": {
					"fill": [
						{
							"test": "indexof([\"Begin\",\"End\"], datum[\"datum.label\"]) !== -1",
							"value": "#f7e0b6"
						},
						{
							"test": "datum.sum < datum.previous_sum",
							"value": "#f78a64"
						},
						{
							"value": "#93c4aa"
						}
					],
					"ariaRoleDescription": {
						"value": "bar"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b`%y')) + \"; Amount: \" + (format(datum[\"previous_sum\"], \"$\")) + \"; sum: \" + (format(datum[\"sum\"], \"\"))"
					},
					"xc": {
						"scale": "x",
						"field": "label"
					},
					"width": {
						"value": 30
					},
					"y": {
						"scale": "y",
						"field": "previous_sum"
					},
					"y2": {
						"scale": "y",
						"field": "sum"
					}
				}
			}
		},
		{
			"name": "layer_1_marks",
			"type": "rule",
			"style": [
				"rule"
			],
			"from": {
				"data": "data_1"
			},
			"encode": {
				"update": {
					"opacity": {
						"value": 1
					},
					"strokeWidth": {
						"value": 1.5
					},
					"stroke": {
						"value": "#404040"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b`%y')) + \"; sum: \" + (format(datum[\"sum\"], \"$\")) + \"; lead: \" + (timeFormat(datum[\"lead\"], '%b %d, %Y'))"
					},
					"x": {
						"scale": "x",
						"field": "label",
						"offset": -15
					},
					"x2": {
						"scale": "x",
						"field": "lead",
						"offset": 15
					},
					"y": {
						"scale": "y",
						"field": "sum"
					}
				}
			}
		},
		{
			"name": "layer_2_marks",
			"type": "text",
			"style": [
				"text"
			],
			"from": {
				"data": "data_2"
			},
			"encode": {
				"update": {
					"baseline": {
						"value": "bottom"
					},
					"dy": {
						"value": -4
					},
					"fontSize": {
						"signal": "fontSize"
					},
					"fill": {
						"value": "#404040"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b`%y')) + \"; sum_inc: \" + (format(datum[\"sum_inc\"], \"$\")) + \"; text_amount: \" + (isValid(datum[\"text_amount\"]) ? datum[\"text_amount\"] : \"\"+datum[\"text_amount\"])"
					},
					"x": {
						"scale": "x",
						"field": "label"
					},
					"y": {
						"scale": "y",
						"field": "sum_inc"
					},
					"text": {
						"signal": "isValid(datum[\"text_amount\"]) ? datum[\"text_amount\"] : \"\"+datum[\"text_amount\"]"
					},
					"align": {
						"value": "center"
					}
				}
			}
		},
		{
			"name": "layer_3_marks",
			"type": "text",
			"style": [
				"text"
			],
			"from": {
				"data": "data_3"
			},
			"encode": {
				"update": {
					"baseline": {
						"value": "top"
					},
					"dy": {
						"value": 4
					},
					"fill": {
						"value": "#404040"
					},
					"description": {
						"signal": "\"label: \" + (timeFormat(datum[\"label\"], '%b`%y')) + \"; sum_dec: \" + (format(datum[\"sum_dec\"], \"$\"))"
					},
					"x": {
						"scale": "x",
						"field": "label"
					},
					"y": {
						"scale": "y",
						"field": "sum_dec"
					},
					"text": {
						"signal": "isValid(datum[\"sum_dec\"]) ? datum[\"sum_dec\"] : \"\"+datum[\"sum_dec\"]"
					},
					"align": {
						"value": "center"
					}
				}
			}
		}
	],
	"scales": [
		{
			"name": "x",
			"type": "time",
			"domain": {
				"fields": [
					{
						"data": "data_0",
						"field": "label"
					},
					{
						"data": "data_1",
						"field": "label"
					},
					{
						"data": "data_1",
						"field": "lead"
					},
					{
						"data": "data_2",
						"field": "label"
					},
					{
						"data": "data_3",
						"field": "label"
					}
				]
			},
			"range": [
				0,
				{
					"signal": "width"
				}
			],
			"padding": 5
		},
		{
			"name": "y",
			"type": "linear",
			"domain": {
				"fields": [
					{
						"data": "data_0",
						"field": "previous_sum"
					},
					{
						"data": "data_0",
						"field": "sum"
					},
					{
						"data": "data_1",
						"field": "sum"
					},
					{
						"data": "data_2",
						"field": "sum_inc"
					},
					{
						"data": "data_3",
						"field": "sum_dec"
					}
				]
			},
			"range": [
				{
					"signal": "height"
				},
				0
			],
			"nice": true,
			"zero": true
		}
	],
	"axes": [
		{
			"scale": "y",
			"orient": "left",
			"tickCount": 5,
			"gridScale": "x",
			"grid": true,
			"domain": false,
			"labels": false,
			"aria": false,
			"maxExtent": 0,
			"minExtent": 0,
			"ticks": false,
			"zindex": 0
		},
		{
			"scale": "x",
			"orient": "bottom",
			"grid": false,
			"format": "%b`%y",
			"labelAngle": 0,
			"tickCount": {
				"interval": "month",
				"step": 1
			},
			"labelBaseline": "top",
			"labelFlush": true,
			"labelOverlap": true,
			"encode": {
				"labels": {
					"update": {
						"fontSize": {
							"signal": "fontSize"
						}
					}
				}
			},
			"zindex": 0
		},
		{
			"scale": "y",
			"orient": "left",
			"grid": false,
			"format": "$",
			"labelAngle": 0,
			"tickCount": 5,
			"labelAlign": "right",
			"labelOverlap": true,
			"encode": {
				"labels": {
					"update": {
						"fontSize": {
							"signal": "fontSize"
						},
						"text": {
							"signal": "datum.label + 'B'"
						}
					}
				}
			},
			"zindex": 0
		}
	],
	"config": {
		"style": {
			"text": {
				"fontWeight": "bold"
			}
		}
	}
}