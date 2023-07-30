/*################################################################################################*/
/*####################################### DESPLIEGUE DEL GRAFICO #################################*/
/*################################################################################################*/
/** 
const ctx20 = document.getElementById("chart-bars").getContext("2d");
let labels_n = [];
let data_n = [];
let data_n2 = [];
let data_n3 = [];
let data_n4 = [];
let myChart = new Chart(ctx20, {
	type: "line",
	data: {
		labels: labels_n,
		datasets: [
			{
				label: "CPU",
				data: data_n,
				backgroundColor: ["rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)"],
				borderWidth: 1,
			},
			{
				label: "Base Line",
				data: data_n2,
				backgroundColor: ["rgba(0, 0, 255, 0.2)"],
				borderColor: ["rgba(0, 0, 255,1)"],
				borderWidth: 1,
			}
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

function addData(chart, dataS) {

	let today = new Date();
	let date =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	// Datos recolectados del sensor
	chart.data.labels.push(date);
	chart.data.datasets[0].data.push(dataS);
	chart.data.datasets[1].data.push(40);
	chart.update();
}


const ctx21=document.getElementById("chart-line").getContext("2d");
let labels_n_MEMORY = [];
let data_n_MEMORYRY = [];
let data_n2_MEMORRY= [];
let data_n3_MEMORRY= [];
let data_n4_MEMORRY= [];



let mychartMemory = new Chart(ctx21, {
	type: "line",
	data: {
		labels: labels_n_MEMORY,
		datasets: [
			{
				label: "RAM",
				data: data_n_MEMORYRY,
				backgroundColor: ["rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)"],
				borderWidth: 1,
			},
			{
				label: "Base line",
				data: data_n2_MEMORRY,
				backgroundColor: ["rgba(0, 0, 255, 0.2)"],
				borderColor: ["rgba(0, 0, 255,1)"],
				borderWidth: 1,
			}
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});


function addData_memory(chart, dataS) {
	let today = new Date();
	let date =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	// Datos recolectados del sensor
	chart.data.labels.push(date);
    chart.data.datasets[0].data.push(dataS);
    chart.data.datasets[1].data.push(40);
	chart.update();
}


const ctx22=document.getElementById("chart-line-tasks").getContext("2d");
let labels_n_disco = [];
let data_n_disco  = [];
let data_n2_disco = [];
let data_n3_disco = [];
let data_n4_disco = [];



let myChartDisco = new Chart(ctx22, {
	type: "line",
	data: {
		labels: labels_n_disco,
		datasets: [
			{
				label: "Disco",
				data: data_n_disco,
				backgroundColor: ["rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)"],
				borderWidth: 1,
			},
			{
				label: "Base line",
				data: data_n2_disco,
				backgroundColor: ["rgba(0, 0, 255, 0.2)"],
				borderColor: ["rgba(0, 0, 255,1)"],
				borderWidth: 1,
			}
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

function addData_disco(chart, dataS) {
	let today = new Date();
	let date =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	// Datos recolectados del sensor
	chart.data.labels.push(date);
    chart.data.datasets[0].data.push(dataS);
    chart.data.datasets[1].data.push(40);
	chart.update();
}
*/

