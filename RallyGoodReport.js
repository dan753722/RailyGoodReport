function onLoad() {
    //Add app code here
    var self = this,
    	GoodRallyReportProperties = {
    		Consts : {
    			PIE_CHART : "pieChartDiv",
    			ChartOptions : {
	    			PIE  	  : "pie",
    				BAR 	  : "bar",
    				LINE 	  : "line",
    				BURN_DOWN : "burndown"
    			},
                Attributes : {
                    STATE : "State"
                },
                Buttons : {
                	GO_BTN : "Go!"
                }
    		}
    	},
    	pieChart = null,
    	ShowPie = function(objectType, selectedAttribute) {
    		var rallyDataSource = new rally.sdk.data.RallyDataSource('__WORKSPACE_OID__',
                               '__PROJECT_OID__',
                               '__PROJECT_SCOPING_UP__',
                               '__PROJECT_SCOPING_DOWN__'),
       		    pieConfig = {
                    type : objectType,
                    attribute: selectedAttribute,
                    title : objectType + " by " + selectedAttribute,
                    height : 200,
                    width : 200
                };

			pieChart = new rally.sdk.ui.PieChart(pieConfig, rallyDataSource);
            pieChart.addEventListener("onSliceClick", GoodRallyReportHelpers.Events.ClickEvent.OnPieSliceClicked);
	        pieChart.display(GoodRallyReportProperties.Consts.PIE_CHART);
    	},
    	ShowPieWithFiltering = function(objectType, selectedAttribute, selectedAttributeValue, categorization)
        {
            var rallyDataSource = new rally.sdk.data.RallyDataSource('18597073842',
               '18937514918',
               'false',
               'true'),

                pieConfig = {
                    type : objectType,
                    attribute : categorization,
                    title : "BLANK",
                    height : 200,
                    width : 200
                },

                queryConfig = {
                    type : objectType,
                    key : "queryResults",
                    //Query both object type and selected attribute value
                    query : '(' + selectedAttribute + ' = "' + selectedAttributeValue + '")',
                    fetch : true
                },

                queryCallBack = function(results)
                {
                    // Get the filtered query results from the callback
                    var filteredResults         = results["queryResults"],
                        categoryCount           = {},
                        totalCount              = 0,
                        highChartInputData      = [],
                        highChartInputDataIndex = 0;

                    for (var i = 0; i < filteredResults.length; i++)
                    {

                        var selectedObject = filteredResults[i];
                        if (!(selectedObject.Severity in categoryCount))
                        {
                            //insert the severity value into category count
                            categoryCount[selectedObject.Severity] = 1;
                        }
                        else
                        {
                            //increment the severity value in the category count
                            categoryCount[selectedObject.Severity] = categoryCount[selectedObject.Severity] + 1;
                        }
                        totalCount++;
                    }

                    for (var key in categoryCount)
                    {
                        var percentageValue = (categoryCount[key] / totalCount) * 100;
                        highChartInputData[highChartInputDataIndex] = [key, percentageValue];
                        highChartInputDataIndex++;
                    }

                    // ADD HIGHCHART CALL HERE
                };
                rallyDataSource.findAll(queryConfig, queryCallBack);
        },

    	displayCategories = function() {
    		var dialog = new rally.sdk.ui.basic.Dialog({ 
            	title: "Select a category",
				width: 300, 
				content: "<div id='categories'><h1 class='rally-good-title'>Categorise by:</h1><select class='categories-dropdown'><option value='severity'>Severity</option><option value='priority'>Priority *COMING SOON*</option><option value='owner'>Owner *COMING SOON*</option></select></div>",
                closable: true,
                buttons: [GoodRallyReportProperties.Consts.Buttons.GO_BTN]
			});

    		dialog.addEventListener("onButtonClick", GoodRallyReportHelpers.Events.ClickEvent.OnDialogButtonClicked);
			dialog.display();
    	},
	 	GoodRallyReportHelpers = {
    		Helpers : {
				GenerateNavPie: function() {
    					$(".charts div").addClass(GoodRallyReportProperties.Consts.PIE_CHART)
    									.attr("id", GoodRallyReportProperties.Consts.PIE_CHART);

    					ShowPie($(".object-type-option").val(), GoodRallyReportProperties.Consts.Attributes.STATE);
    			}
    		},
    		Events : {
    			ButtonEvent : {
    				GenerateNavChartClicked : function() {
    					var chartType = $(".chart-option").val();
    					if (chartType === GoodRallyReportProperties.Consts.ChartOptions.PIE) {
    						GoodRallyReportHelpers.Helpers.GenerateNavPie();
    					}

    					if (chartType === GoodRallyReportProperties.Consts.ChartOptions.BAR) {

    					}

    					if (chartType === GoodRallyReportProperties.Consts.ChartOptions.LINE) {

    					}

    					if (chartType === GoodRallyReportProperties.Consts.ChartOptions.BURN_DOWN) {

    					}
    				}
    			},
    			
    			ClickEvent : {
                    OnPieSliceClicked : function(p, eventArgs) {
                        displayCategories();
                    },
                    OnDialogButtonClicked : function(dialog, eventArgs) {
                    	if (eventArgs.button === GoodRallyReportProperties.Consts.Buttons.GO_BTN) {
                    		// TODO:
                    		var categorizedBy = $(".categories-dropdown").val();
                    		pieChart.destroy();

                    		$("#" + GoodRallyReportProperties.Consts.PIE_CHART).highcharts({
        						chart: {
            						plotBackgroundColor: null,
            						plotBorderWidth: 1,//null,
            						plotShadow: false
        						},
        						title: {
            						text: 'Browser market shares at a specific website, 2014'
        						},
        						tooltip: {
            						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        						},
							    plotOptions: {
							        pie: {
							            allowPointSelect: true,
							            cursor: 'pointer',
							            dataLabels: {
							                enabled: true,
							                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							                style: {
							                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							                }
							            }
							        }
							    },
							    series: [{
							        type: 'pie',
							        name: 'Browser share',
							        data: [
							            ["Firefox",   45.0],
							            ['IE',       26.8],
							            {
							                name: 'Chrome',
							                y: 12.8,
							                sliced: true,
							                selected: true
							            },
							            ['Safari',    8.5],
							            ['Opera',     6.2],
							            ['Others',   0.7]
							        ]
							    }]
							});
							
                    	}
                    	dialog.destroy();
                    }
                }
    		}

    	};

    $(".btn-Generate-nav-chart").click(GoodRallyReportHelpers.Events.ButtonEvent.GenerateNavChartClicked);

}
rally.addOnLoad(onLoad);
