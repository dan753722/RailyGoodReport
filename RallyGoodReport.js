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
    			}
    		}
    	},
    	ShowPie = function() {
    		var rallyDataSource = new rally.sdk.data.RallyDataSource('__WORKSPACE_OID__',
                               '__PROJECT_OID__',
                               '__PROJECT_SCOPING_UP__',
                               '__PROJECT_SCOPING_DOWN__');
       		var pieConfig = {
            	type : "Defect",
           		attribute: "Priority",
           		title : "Defects by Priority",
           		height : 200,
           		width : 200
         	};
       		var pieChart = new rally.sdk.ui.PieChart(pieConfig, rallyDataSource);
	        pieChart.display(GoodRallyReportProperties.Consts.PIE_CHART);
    	},
    	displayCategories = function() {
    		var dialog = new rally.sdk.ui.basic.Dialog({ 
            	title: "Select a category",
				width: 300, 
				content: "	<div id='categories'><h1 class='rally-good-title'>Categorise by:</h1><select class='categories-dropdown'><option value='severity'>Severity</option><option value='priority'>Priority *COMING SOON*</option><option value='owner'>Owner *COMING SOON*</option></select><button class='rally-good'>Go!</button></div>"
			});

			dialog.display();
    	},
	 	GoodRallyReportHelpers = {
    		Helpers : {
				GenerateNavPie: function() {
    					$(".charts div").addClass(GoodRallyReportProperties.Consts.PIE_CHART)
    									.attr("id", GoodRallyReportProperties.Consts.PIE_CHART);

    					ShowPie();
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
    				},
    				FirstClicked : function() {
    					displayCategories();
    				}
    			}
    		},

    	};

    $(".btn-Generate-nav-chart").click(GoodRallyReportHelpers.Events.ButtonEvent.GenerateNavChartClicked);
    $(".categories-button").click(GoodRallyReportHelpers.Events.ButtonEvent.FirstClicked);

}
rally.addOnLoad(onLoad);
