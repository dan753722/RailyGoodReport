function displayCategories() {
            
    var config = { 
            title: "Hello World",
			width: 300, id:"helloWorld",
			content: "<div>Hello World!</div>"
			}

	var dialog = new rally.sdk.ui.basic.Dialog({ 
            title: "Hello World",
			width: 300, id:"helloWorld",
			content: "<div>Hello World!</div>"
			})

	}

	dialog.display;
}
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
    				}
    			}
    		},

    	};

    $(".btn-Generate-nav-chart").click(GoodRallyReportHelpers.Events.ButtonEvent.GenerateNavChartClicked);

}
rally.addOnLoad(onLoad);
