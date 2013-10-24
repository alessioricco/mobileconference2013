function onSuccess(object){
	
	// change my UI
	try{
		
		// 1st example
		$.lbGreetings.text = "Hello " + object.Firstname + " " + object.Lastname;	
		if (object.Color) $.lbGreetings.color = object.Color;
		if (object.Top) $.lbGreetings.top = object.Top;
	
		// 2nd example
		if (object.Properties){
			// set UI properties on lbGreetings2
			// "Properties":{"text":"Welcome","top":"","left":"","color":"green"}
			for (key in object.Properties)
			{
				if (object.Properties[key]){
					$.lbGreetings2[key] = object.Properties[key];
				}
			}
			// fix position
			if (!object.Properties['top']) $.lbGreetings2['top'] = null;
			if (!object.Properties['left']) $.lbGreetings2['left'] = null;
		}
		
		// 3th example: the list
		
	}
	catch (e)
	{
		alert(e.error);
	}

}	
	
	
function refresh(){
	
	// read remote web service 
	var xhr = Titanium.Network.createHTTPClient();
	
	// success handler
	xhr.onload = function() {
		
		// response
		
		var jsonObject = JSON.parse(this.responseText);
		Ti.API.debug(this.responseText);

		// make it global...
		Alloy.Globals.json = jsonObject;

		// do things...
		if (jsonObject) {
			onSuccess(jsonObject);
		}
		
	};

	// failure handler
	xhr.onerror = function(e) {
		Ti.API.debug(e.error);
		alert(e.error);
	};

	// read
	xhr.open("GET", Alloy.Globals.url);
	xhr.send();
}
	

refresh();
