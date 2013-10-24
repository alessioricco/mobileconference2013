function Controller() {
    function onSuccess(object) {
        try {
            $.lbGreetings.text = "Hello " + object.Firstname + " " + object.Lastname;
            object.Color && ($.lbGreetings.color = object.Color);
            object.Top && ($.lbGreetings.top = object.Top);
            if (object.Properties) {
                for (key in object.Properties) object.Properties[key] && ($.lbGreetings2[key] = object.Properties[key]);
                object.Properties["top"] || ($.lbGreetings2["top"] = null);
                object.Properties["left"] || ($.lbGreetings2["left"] = null);
            }
        } catch (e) {
            alert(e.error);
        }
    }
    function refresh() {
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onload = function() {
            var jsonObject = JSON.parse(this.responseText);
            Ti.API.debug(this.responseText);
            jsonObject && onSuccess(jsonObject);
        };
        xhr.onerror = function(e) {
            Ti.API.debug(e.error);
            alert(e.error);
        };
        xhr.open("GET", Alloy.Globals.url);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "main";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.lbGreetings = Ti.UI.createLabel({
        top: "10",
        text: "Hello",
        id: "lbGreetings"
    });
    $.__views.main.add($.__views.lbGreetings);
    $.__views.lbGreetings2 = Ti.UI.createLabel({
        text: "How are you?",
        id: "lbGreetings2"
    });
    $.__views.main.add($.__views.lbGreetings2);
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Refresh",
        bottom: "20px",
        id: "__alloyId7"
    });
    $.__views.main.add($.__views.__alloyId7);
    refresh ? $.__views.__alloyId7.addEventListener("click", refresh) : __defers["$.__views.__alloyId7!click!refresh"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    refresh();
    __defers["$.__views.__alloyId7!click!refresh"] && $.__views.__alloyId7.addEventListener("click", refresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;