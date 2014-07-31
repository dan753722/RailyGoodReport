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

function onLoad() {


}


rally.addOnLoad(onLoad);
