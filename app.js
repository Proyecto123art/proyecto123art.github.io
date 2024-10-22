const channelId = '2688654'; // Reemplaza con tu ID de canal de ThingSpeak
const readApiKey = 'DYU0KXMXCWWKE0LM'; // Reemplaza con tu Read API Key

// Función para obtener los datos de ThingSpeak
function fetchData() {
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=5`; // Obtener los últimos 5 datos

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener los últimos 5 datos
            const last5Boyas = data.feeds.slice(-5).reverse(); // Últimos 5 registros para las tablas

            // Limpiar las tablas antes de agregar nuevos datos
            limpiarTabla('data-table-boya1');
            limpiarTabla('data-table-boya2');

            // Llenar las tablas con los últimos 5 registros
            last5Boyas.forEach(boya => {
                llenarTablaBoya1(boya);
                llenarTablaBoya2(boya);
            });

            // Actualizar los valores actuales para Boya 1 y Boya 2
            const boya1 = last5Boyas[0]; // Último dato para Boya 1
            const boya2 = last5Boyas[1]; // Último dato para Boya 2

            // Actualizar Boya 1
            document.getElementById('temperatura-valor1').innerText = boya1.field1 + '°C';
            document.getElementById('presion-valor1').innerText = boya1.field2 + ' hPa';
            document.getElementById('altitud-valor1').innerText = boya1.field3 + ' m';
            document.getElementById('humedad-valor1').innerText = boya1.field4 + '%';

            // Actualizar Boya 2
            document.getElementById('temperatura-valor2').innerText = boya2.field5 + '°C';
            document.getElementById('presion-valor2').innerText = boya2.field6 + ' hPa';
            document.getElementById('altitud-valor2').innerText = boya2.field7 + ' m';
            document.getElementById('humedad-valor2').innerText = boya2.field8 + '%';
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Función para limpiar la tabla antes de agregar nuevos datos
function limpiarTabla(idTabla) {
    const tableBody = document.getElementById(idTabla);
    tableBody.innerHTML = ''; // Limpiar el contenido existente de la tabla
}

// Función para llenar la tabla de Boya 1
function llenarTablaBoya1(boya1) {
    const tableBody1 = document.getElementById('data-table-boya1');

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

// Función para llenar la tabla de Boya 2
function llenarTablaBoya2(boya2) {
    const tableBody2 = document.getElementById('data-table-boya2');

    // Crear la fila para Boya 2
    const row2 = document.createElement('tr');
    row2.innerHTML = `
        <td>${boya2.field5}°C</td>
        <td>${boya2.field6} hPa</td>
        <td>${boya2.field7} m</td>
        <td>${boya2.field8}%</td>
        <td>${new Date(boya2.created_at).toLocaleString()}</td>
    `;
    tableBody2.appendChild(row2);
}

// Llamar a fetchData una vez al cargar la página
fetchData();

// Llamar a fetchData cada 10 segundos para actualizar los datos en tiempo real
setInterval(fetchData, 10000);
