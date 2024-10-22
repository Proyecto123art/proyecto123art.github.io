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

            // Llenar las tablas con los datos de cada boya
            llenarTablaBoya1(boya1);
            llenarTablaBoya2(boya2);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function llenarTablaBoya1(boya1) {
    const tableBody1 = document.getElementById('data-table-boya1');
    
    // Limpiar la tabla antes de agregar nuevas filas
    tableBody1.innerHTML = '';

    // Crear la fila para Boya 1
    const row1 = document.createElement('tr');
    row1.innerHTML = `
        <td>${boya1.field1}°C</td>
        <td>${boya1.field2} hPa</td>
        <td>${boya1.field3} m</td>
        <td>${boya1.field4}%</td>
        <td>${new Date(boya1.created_at).toLocaleString()}</td>
    `;
    tableBody1.appendChild(row1);
}

function llenarTablaBoya2(boya2) {
    const tableBody2 = document.getElementById('data-table-boya2');
    
    // Limpiar la tabla antes de agregar nuevas filas
    tableBody2.innerHTML = '';

    // Crear la fila para Boya 2
    const row2 = document.createElement('tr');
    row2.innerHTML = `
        <td>${boya2.field1}°C</td>
        <td>${boya2.field2} hPa</td>
        <td>${boya2.field3} m</td>
        <td>${boya2.field4}%</td>
        <td>${new Date(boya2.created_at).toLocaleString()}</td>
    `;
    tableBody2.appendChild(row2);
}

// Llamar a fetchData una vez al cargar la página
fetchData();
