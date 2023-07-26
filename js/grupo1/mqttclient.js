/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

//var wsbroker = "192.168.0.3";  //mqtt websocket enabled broker
//var wsbroker = "localhost";
//var wsbroker = "0.tcp.sa.ngrok.io";

//var wsport = 8083 // port for above
//var wsport = 14792; // port for above
//var client = new Paho.MQTT.Client(
	//wsbroker,
	//Number(wsport),
	//"myclientid_" + parseInt(Math.random() * 100, 10)
//);
var wsbroker = "broker.hivemq.com";

//var wsport = 8083 // port for above
var wsport = 1883; // port for above

var client = new Paho.MQTT.Client(
	wsbroker,
	Number(8000),
	"myclientid_" + parseInt(Math.random() * 100, 10)
);
client.onConnectionLost = function (responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};

/*################################################################################################*/
/*####################################### LLEGA EL MENSAJE########################################*/
/*################################################################################################*/

client.onMessageArrived = function (message) {
	let destination = message.destinationName;
	if (destination === "probar1234") {
		let response = JSON.parse(message.payloadString);
		dataFormat = response;
		console.log(parseFloat(dataFormat.CPU));
		console.log(parseFloat(dataFormat.Memoria));
		console.log(parseFloat(dataFormat.Disco));
		addData(
			myChartCPU,
			parseFloat(dataFormat.CPU),
		);
		addData(
			myChartMemory,
			parseFloat(dataFormat.Memoria),
		);
		addData(
			myChartDisck,
			parseFloat(dataFormat.Disco),
		);
	}
};

var options = {
	timeout: 3,
	onSuccess: function () {
		console.log("mqtt connected");
		// Connection succeeded; subscribe to our topic, you can add multile lines of these
		client.subscribe("/test_uce_monitor", { qos: 1 });
	},
	onFailure: function (message) {
		console.log("Connection failed: " + message.errorMessage);
	},
};


function testMqtt(){
	console.log("hi");
}
function initMqtt() {
	client.connect(options);
}