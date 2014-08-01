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
                }
    		}
    	},

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
    	},


        ShowPieWithFiltering = function(objectType, selectedAttribute, selectedAttributeValue, categorization)
        {
            var rallyDataSource = new rally.sdk.data.RallyDataSource('__WORKSPACE_OID__',
               '__PROJECT_OID__',
               '__PROJECT_SCOPING_UP__',
               '__PROJECT_SCOPING_DOWN__'),

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



                    categorizedResults = categorizedResults(results, categorizedby);
                    //var pie = initiateHighChart(categorizedResults;
                    //pie.display();
                };
                rallyDataSource.findAll(queryConfig, queryCallBack);
        },


	 	GoodRallyReportHelpers = {
    		Helpers : {
				GenerateNavPie: function() {
    					$(".charts div").addClass(GoodRallyReportProperties.Consts.PIE_CHART)
    									.attr("id", GoodRallyReportProperties.Consts.PIE_CHART);

    					//ShowPie($(".object-type-option").val(), GoodRallyReportProperties.Consts.Attributes.STATE);
                        ShowPieWithFiltering($(".object-type-option").val(), GoodRallyReportProperties.Consts.Attributes.STATE, "Open", "Priority");
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
    			}
    		}
    	};

    $(".btn-Generate-nav-chart").click(GoodRallyReportHelpers.Events.ButtonEvent.GenerateNavChartClicked);
}

rally.addOnLoad(onLoad);
