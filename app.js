// URLs de las páginas de ThingSpeak
const channelID1 = '2688654';
const apiKey1 = 'DYU0KXMXCWWKE0LM';
const url1 = `https://api.thingspeak.com/channels/${channelID1}/feeds.json?api_key=${apiKey1}&results=1`;

const channelID2 = '2690545';
const apiKey2 = '3PWGJ4M2Z2S6GFD1';
const url2 = `https://api.thingspeak.com/channels/${channelID2}/feeds.json?api_key=${apiKey2}&results=1`;

// Configuración de Gauge.js
var opts = {
    angle: 0,
    lineWidth: 0.3,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    limitMax: false,
    limitMin: false,
    colorStart: '#6FADCF',
    colorStop: '#8FC0DA',
    strokeColor: '#E0E0E0',
    generateGradient: true
};

// Configuración de los gauges para Boya 1 y Boya 2
var targetTemperatura1 = document.getElementById('gaugeTemperatura1');
var gaugeTemperatura1 = new Gauge(targetTemperatura1).setOptions(opts);
gaugeTemperatura1.maxValue = 100;
gaugeTemperatura1.setMinValue(0);
gaugeTemperatura1.animationSpeed = 32;

var targetPresion1 = document.getElementById('gaugePresion1');
var gaugePresion1 = new Gauge(targetPresion1).setOptions(opts);
gaugePresion1.maxValue = 1200; // Ajusta el máximo según tus necesidades
gaugePresion1.setMinValue(0);
gaugePresion1.animationSpeed = 32;

var targetTemperatura2 = document.getElementById('gaugeTemperatura2');
var gaugeTemperatura2 = new Gauge(targetTemperatura2).setOptions(opts);
gaugeTemperatura2.maxValue = 100;
gaugeTemperatura2.setMinValue(0);
gaugeTemperatura2.animationSpeed = 32;

var targetPresion2 = document.getElementById('gaugePresion2');
var gaugePresion2 = new Gauge(targetPresion2).setOptions(opts);
gaugePresion2.maxValue = 1200; // Ajusta el máximo según tus necesidades
gaugePresion2.setMinValue(0);
gaugePresion2.animationSpeed = 32;

// Función para actualizar los valores del indicador
function actualizarGauge(gauge, valor) {
    gauge.set(valor);
}

// Función para obtener y mostrar datos de Boya 1
fetch(url1)
    .then(response => response.json())
    .then(data => {
        const feed1 = data.feeds[0];
        const temperatura1 = parseFloat(feed1.field1);
        const presion1 = parseFloat(feed1.field2);
        const altitud1 = parseFloat(feed1.field3);
        const humedad1 = parseFloat(feed1.field4);
        
        document.getElementById('temperatura-valor1').innerText = temperatura1 + ' °C';
        document.getElementById('presion-valor1').innerText = presion1;
        document.getElementById('altitud-valor1').innerText = altitud1;
        document.getElementById('humedad-valor1').innerText = humedad1 + ' %';

        actualizarGauge(gaugeTemperatura1, temperatura1);
        actualizarGauge(gaugePresion1, presion1);
    })
    .catch(error => console.error('Error al obtener los datos de Boya 1:', error));

// Función para obtener y mostrar datos de Boya 2
fetch(url2)
    .then(response => response.json())
    .then(data => {
        const feed2 = data.feeds[0];
        const temperatura2 = parseFloat(feed2.field1);
        const presion2 = parseFloat(feed2.field2);
        const altitud2 = parseFloat(feed2.field3);
        const humedad2 = parseFloat(feed2.field4);
        
        document.getElementById('temperatura-valor2').innerText = temperatura2 + ' °C';
        document.getElementById('presion-valor2').innerText = presion2;
        document.getElementById('altitud-valor2').innerText = altitud2;
        document.getElementById('humedad-valor2').innerText = humedad2 + ' %';

        actualizarGauge(gaugeTemperatura2, temperatura2);
        actualizarGauge(gaugePresion2, presion2);
    })
    .catch(error => console.error('Error al obtener los datos de Boya 2:', error));
