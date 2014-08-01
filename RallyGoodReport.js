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
    		},
    		Vars : {
    			NavPieSliceValue : null,
    			highChartTitle : ""
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
            var rallyDataSource = new rally.sdk.data.RallyDataSource('__WORKSPACE_OID__',
                               '__PROJECT_OID__',
                               '__PROJECT_SCOPING_UP__',
                               '__PROJECT_SCOPING_DOWN__'),

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

                        if (!(selectedObject[categorization] in categoryCount))
                        {
                            //insert the severity value into category count
                            categoryCount[selectedObject[categorization]] = 1;
                        }
                        else
                        {
                            //increment the severity value in the category count
                            categoryCount[selectedObject[categorization]] = categoryCount[selectedObject[categorization]] + 1;
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
                    ShowHighChart(highChartInputData, GoodRallyReportProperties.Vars.highChartTitle);

                };

                GoodRallyReportHelpers.Helpers.MakeHighChartTitle(objectType, selectedAttribute, selectedAttributeValue, categorization);
                rallyDataSource.findAll(queryConfig, queryCallBack);
        },

    	displayCategories = function() {
    		var dialog = new rally.sdk.ui.basic.Dialog({ 
            	title: "Select a category",
				width: 300, 
				content: "<div id='categories'><h1 class='rally-good-title'>Categorise by:</h1><select class='categories-dropdown'><option value='Severity'>Severity</option><option value='Priority'>Priority *COMING SOON*</option><option value='Owner'>Owner *COMING SOON*</option></select></div>",
                closable: true,
                buttons: [GoodRallyReportProperties.Consts.Buttons.GO_BTN]
			});

    		dialog.addEventListener("onButtonClick", GoodRallyReportHelpers.Events.ClickEvent.OnDialogButtonClicked);
			dialog.display();
    	},
    	
    	ShowHighChart = function(data, title){
    		var chart = new Highcharts.Chart({
						chart: {
							renderTo: GoodRallyReportProperties.Consts.PIE_CHART,
    						plotBackgroundColor: null,
    						plotBorderWidth: 1,//null,
    						plotShadow: false
						},
						title: {
    						text: title
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
					        data: data
					    }]
					});
    	},

	 	GoodRallyReportHelpers = {
    		Helpers : {
				GenerateNavPie: function() {
					$(".charts div").addClass(GoodRallyReportProperties.Consts.PIE_CHART)
									.attr("id", GoodRallyReportProperties.Consts.PIE_CHART);

					ShowPie($(".object-type-option").val(), GoodRallyReportProperties.Consts.Attributes.STATE);
    			},
    			MakeHighChartTitle: function(objectType, selectedAttribute, selectedAttributeValue, categorization) {
    				GoodRallyReportProperties.Vars.highChartTitle = objectType + ' ' + selectedAttribute + ' ' + selectedAttributeValue
    																+ ' ' + categorization;
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
                        GoodRallyReportProperties.Vars.NavPieSliceValue = eventArgs.value;
                    },
                    OnDialogButtonClicked : function(dialog, eventArgs) {
                    	if (eventArgs.button === GoodRallyReportProperties.Consts.Buttons.GO_BTN) {
                    		var categorizedBy = $(".categories-dropdown").val();
                    		pieChart.destroy();

                    		ShowPieWithFiltering("Defects", GoodRallyReportProperties.Consts.Attributes.STATE, GoodRallyReportProperties.Vars.NavPieSliceValue, categorizedBy);

                    		
							
                    	}
                    	dialog.destroy();
                    }
                }
    		}

    	};

    $(".btn-Generate-nav-chart").click(GoodRallyReportHelpers.Events.ButtonEvent.GenerateNavChartClicked);

}
rally.addOnLoad(onLoad);
