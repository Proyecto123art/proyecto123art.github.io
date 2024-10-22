const channelId = '2688654'; // Reemplaza con tu ID de canal de ThingSpeak
const readApiKey = 'DYU0KXMXCWWKE0LM'; // Reemplaza con tu Read API Key

// Función para obtener los datos de ThingSpeak
function fetchData() {
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=10`; // Obtener los últimos 10 datos para asegurarnos de que hay suficientes

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener solo los últimos 5 datos para Boya 1 y Boya 2
            const last5Boyas = data.feeds.slice(-5); // Obtiene los últimos 5 registros

            // Limpiar las tablas antes de agregar nuevos datos
            limpiarTabla('data-table-boya1');
            limpiarTabla('data-table-boya2');

            // Llenar las tablas con los últimos 5 registros
            last5Boyas.forEach(boya => {
                llenarTablaBoya1(boya);
                llenarTablaBoya2(boya);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Función para limpiar la tabla antes de agregar nuevos datos
function limpiarTabla(idTabla) {
    const tableBody = document.getElementById(idTabla);
    tableBody.innerHTML = ''; // Limpiar el contenido existente de la tabla
}

// Función para llenar la tabla de Boya 1
function llenarTablaBoya1(boya) {
    const tableBody1 = document.getElementById('data-table-boya1');
    
    // Crear la fila para Boya 1
    const row1 = document.createElement('tr');
    row1.innerHTML = `
        <td>${boya.field1}°C</td>
        <td>${boya.field2} hPa</td>
        <td>${boya.field3} m</td>
        <td>${boya.field4}%</td>
        <td>${new Date(boya.created_at).toLocaleString()}</td>
    `;
    tableBody1.appendChild(row1);
}

// Función para llenar la tabla de Boya 2
function llenarTablaBoya2(boya) {
    const tableBody2 = document.getElementById('data-table-boya2');
    
    // Crear la fila para Boya 2
    const row2 = document.createElement('tr');
    row2.innerHTML = `
        <td>${boya.field5}°C</td>
        <td>${boya.field6} hPa</td>
        <td>${boya.field7} m</td>
        <td>${boya.field8}%</td>
        <td>${new Date(boya.created_at).toLocaleString()}</td>
    `;
    tableBody2.appendChild(row2);
}

// Llamar a fetchData cada 10 segundos para actualizar los datos en tiempo real
setInterval(fetchData, 10000);

// Llamar a fetchData una vez al cargar la página
fetchData();
