const channelId = '2688654'; // Reemplaza con tu ID de canal de ThingSpeak
const readApiKey = 'DYU0KXMXCWWKE0LM'; // Reemplaza con tu Read API Key

function fetchData() {
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=2`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const boya1 = data.feeds[0];
            const boya2 = data.feeds[1];

            // Actualizar Boya 1
            document.getElementById('temperatura-valor1').innerText = boya1.field1 + '°C';
            document.getElementById('presion-valor1').innerText = boya1.field2 + ' hPa';
            document.getElementById('altitud-valor1').innerText = boya1.field3 + ' m';
            document.getElementById('humedad-valor1').innerText = boya1.field4 + '%';

            // Actualizar Boya 2
            document.getElementById('temperatura-valor2').innerText = boya2.field1 + '°C';
            document.getElementById('presion-valor2').innerText = boya2.field2 + ' hPa';
            document.getElementById('altitud-valor2').innerText = boya2.field3 + ' m';
            document.getElementById('humedad-valor2').innerText = boya2.field4 + '%';
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Llamar a fetchData una vez al cargar la página
fetchData();
