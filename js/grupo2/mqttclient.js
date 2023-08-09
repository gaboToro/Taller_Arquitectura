/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

//var wsbroker = "192.168.0.3";  //mqtt websocket enabled broker
//var wsbroker = "localhost";
//var wsbroker = "0.tcp.sa.ngrok.io";
var wsbroker = "broker.hivemq.com";


//var wsport = 8083 // port for above
//var wsport = 14792; // port for above
var wsport = 1883; // port for above

var client = new Paho.MQTT.Client(
	wsbroker,
	Number(8000),
	//Number(wsport),
//var wsport = 8083 // port for above
//var wsport = 14792; // port for above
var wsport = 1883;
var client = new Paho.MQTT.Client(
	wsbroker,
	//Number(wsport),
	Number(8000)
	"myclientid_" + parseInt(Math.random() * 100, 10)
);

client.onConnectionLost = function (responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};

/*################################################################################################*/
/*####################################### LLEGA EL MENSAJE########################################*/
/*################################################################################################*/
let primero = 1
client.onMessageArrived = function (message) {
	let destination = message.destinationName;
	if (destination === "gabito") {
		let response = JSON.parse(message.payloadString);
		let dataFormat = response;

		let dataCPU = dataFormat.CPU;
		let dataMemory = dataFormat.Memory;
		let dataDisk = dataFormat.Disk;
		let dataCache = dataFormat.Cache;


		//Cargar datos CPU , Memoria y Almacenamiento
		addData(
			myChartCPU,
			parseFloat(dataCPU),
		);

		addData(
			myChartMemory,
			parseFloat(dataMemory),
		);

		addData(
			myChartDisk,
			parseFloat(dataDisk),
		);

		//Envio de valores estáticos.
		let dateCPU = dataCPU + '%';
		document.getElementById('cpuValue').innerText = dateCPU;

		let dateMemory = dataMemory.toLocaleString() + ' %';
		document.getElementById('memoryValue').innerText = dateMemory;

		let dateDisk = dataDisk.toLocaleString() + ' GB';
		document.getElementById('diskValue').innerText = dateDisk;

		let dateCache = dataCache.toLocaleString() + ' %';
		document.getElementById('cacheValue').innerText = dateCache;

		console.log(dataFormat);
		let dataMemoria = dataFormat.Memoria;
		let dataDisco = dataFormat.Disco;
                let dataVelocidadD = dataFormat.Descarga;
		let dataVelocidadS = dataFormat.Subida;
	        console.log(dataFormat);
		console.log(parseFloat(dataFormat.value));
		if (primero == 1){
			const dataCPUElement = document.getElementById("dataCPUElement");
			dataCPUElement.textContent = "Valor de CPU: " + dataCPU.toFixed(2);

			const dataMemoryElement = document.getElementById("dataMemoryElement");
			dataMemoryElement.textContent = "Valor de Memoria: " + dataMemory.toFixed(2);

			const dataDiscoElement = document.getElementById("dataDiscoElement");
			dataDiscoElement.textContent = "Valor de Disco: " + dataDisco.toFixed(2);

			const dataVelocidadDercarga = document.getElementById("dataVelocidadDescarga");
			dataVelocidadDercarga.textContent = "Velocidad de descarga: " + dataVelocidadD.toFixed(2);

			const dataVelocidadSubida = document.getElementById("dataVelocidadSubida");
			dataVelocidadSubida.textContent = "Velocidad de carga: " + dataVelocidadS.toFixed(2);

			primero = 0;
		}

		//Cargar datos CPU , Memoria y Almacenamiento
		addData(
			chart_bars,
			parseFloat(dataCPU),
		);

		addData_memory(
			chart_line,
			parseFloat(dataMemoria),
		);

		addData_Disco(
			chart_line_tasks,
			parseFloat(dataDisco),
			);
	}
};

var options = {
	timeout: 3,
	onSuccess: function () {
		console.log("mqtt connected");
		// Connection succeeded; subscribe to our topic, you can add multile lines of these
		client.subscribe("gabito", { qos: 1 });
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
