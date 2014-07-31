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
                },
                pieChart = new rally.sdk.ui.PieChart(pieConfig, rallyDataSource);

            pieChart.addEventListener("onSliceClick", GoodRallyReportHelpers.Events.ClickEvent.OnPieSliceClicked);
	        pieChart.display(GoodRallyReportProperties.Consts.PIE_CHART);
    	},
    	displayCategories = function() {
    		var dialog = new rally.sdk.ui.basic.Dialog({ 
            	title: "Select a category",
				width: 300, 
				content: "	<div id='categories'><h1 class='rally-good-title'>Categorise by:</h1><select class='categories-dropdown'><option value='severity'>Severity</option><option value='priority'>Priority *COMING SOON*</option><option value='owner'>Owner *COMING SOON*</option></select></div>",
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
                    	}
                    	
                    	dialog.destroy();
                    }
                }
    		},

    	};

    $(".btn-Generate-nav-chart").click(GoodRallyReportHelpers.Events.ButtonEvent.GenerateNavChartClicked);

}
rally.addOnLoad(onLoad);
