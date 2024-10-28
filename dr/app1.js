const channelId = '2688654'; // Reemplaza con tu ID de canal de ThingSpeak
const readApiKey = 'DYU0KXMXCWWKE0LM'; // Reemplaza con tu Read API Key

let allBoyas = []; // Variable global para almacenar todos los registros
let last5Boyas = []; // Variable global para almacenar los últimos 5 registros

// Función para obtener los datos de ThingSpeak
function fetchData() {
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${encodeURIComponent(readApiKey)}&results=100`; // Cambiado a 100 para almacenar más registros

    // Mostrar la animación de carga
    document.getElementById("loading").style.display = "block";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Almacenar todos los registros
            allBoyas = data.feeds;
            last5Boyas = allBoyas.slice(-5).reverse(); // Obtener los últimos 5 registros

            // Limpiar las tablas antes de agregar nuevos datos
            limpiarTabla('data-table-boya1');
            limpiarTabla('data-table-boya2');

            // Llenar las tablas con los últimos 5 registros
            last5Boyas.forEach(boya => {
                llenarTabla(boya, 'data-table-boya1', 'field1', 'field2', 'field3', 'field4');
                llenarTabla(boya, 'data-table-boya2', 'field5', 'field6', 'field7', 'field8');
            });

            // Actualizar los valores actuales para Boya 1 y Boya 2
            actualizarValoresYColores(0, 'temperatura-valor1', 'presion-valor1', 'altitud-valor1', 'humedad-valor1', 'temperatura1', 'presion1', 'altitud1', 'humedad1');
            actualizarValoresYColores(1, 'temperatura-valor2', 'presion-valor2', 'altitud-valor2', 'humedad-valor2', 'temperatura2', 'presion2', 'altitud2', 'humedad2');

            // Ocultar la animación de carga
            document.getElementById("loading").style.display = "none"; // Ocultar animación
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
            document.getElementById("loading").style.display = "none"; // Ocultar animación en caso de error
        });
}

// Función para llenar la tabla
function llenarTabla(boya, tableId, field1, field2, field3, field4) {
    const table = document.getElementById(tableId);
    if (table) { // Verificación de existencia
        const row = table.insertRow();
        row.insertCell(0).innerText = boya[field1] + ' °C';
        row.insertCell(1).innerText = boya[field2] + ' hPa';
        row.insertCell(2).innerText = boya[field3] + ' m';
        row.insertCell(3).innerText = boya[field4] + ' %';
        row.insertCell(4).innerText = new Date(boya.created_at).toLocaleString();
    }
}

// Función para actualizar los valores y colores
function actualizarValoresYColores(index, tempId, presionId, altitudId, humedadId, tempClass, presionClass, altitudClass, humedadClass) {
    if (last5Boyas.length > index) {
        const boya = last5Boyas[index];
        document.getElementById(tempId).innerText = boya[`field${index * 4 + 1}`] + ' °C';
        document.getElementById(presionId).innerText = boya[`field${index * 4 + 2}`] + ' hPa';
        document.getElementById(altitudId).innerText = boya[`field${index * 4 + 3}`] + ' m';
        document.getElementById(humedadId).innerText = boya[`field${index * 4 + 4}`] + ' %';

        // Actualizar colores de pelotitas
        document.querySelector(`.${tempClass}`).style.backgroundColor = actualizarColorCirculo(boya[`field${index * 4 + 1}`], 'temperatura');
        document.querySelector(`.${presionClass}`).style.backgroundColor = actualizarColorCirculo(boya[`field${index * 4 + 2}`], 'presion');
        document.querySelector(`.${altitudClass}`).style.backgroundColor = actualizarColorCirculo(boya[`field${index * 4 + 3}`], 'altitud');
        document.querySelector(`.${humedadClass}`).style.backgroundColor = actualizarColorCirculo(boya[`field${index * 4 + 4}`], 'humedad');
    }
}

// Función para limpiar la tabla antes de actualizar
function limpiarTabla(tableId) {
    const table = document.getElementById(tableId);
    if (table) { // Verificación de existencia
        while (table.rows.length > 0) {
            table.deleteRow(0);
        }
    }
}

// Función para actualizar el color según los rangos
function actualizarColorCirculo(valor, tipo) {
    valor = parseFloat(valor);
    if (tipo === 'temperatura') {
        if (valor >= 10 && valor <= 25) return 'green';
        if ((valor >= 5 && valor < 10) || (valor > 25 && valor <= 30)) return 'yellow';
        return 'red';
    }
    if (tipo === 'presion') {
        if (valor >= 950 && valor <= 1050) return 'green';
        if ((valor >= 900 && valor < 950) || (valor > 1050 && valor <= 1100)) return 'yellow';
        return 'red';
    }
    if (tipo === 'altitud') {
        if (valor >= 0 && valor <= 3000) return 'green';
        if (valor > 3000 && valor <= 4000) return 'yellow';
        return 'red';
    }
    if (tipo === 'humedad') {
        if (valor >= 30 && valor <= 70) return 'green';
        if ((valor >= 20 && valor < 30) || (valor > 70 && valor <= 80)) return 'yellow';
        return 'red';
    }
}

// Función para descargar todos los registros como CSV
function descargarDatosCSV() {
    // Verifica que allBoyas tenga datos
    if (allBoyas.length === 0) {
        alert('No hay datos disponibles para descargar.');
        return;
    }

    // Convertir los datos a formato CSV
    const csvRows = [];
    // Obtener las cabeceras
    const headers = Object.keys(allBoyas[0]);
    csvRows.push(headers.join(','));

    // Agregar cada fila de datos
    for (const row of allBoyas) {
        csvRows.push(headers.map(header => row[header]).join(','));
    }

    // Crear un Blob con los datos CSV
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace y hacer clic en él para descargar
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'datos_boyas.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Llamar a fetchData cada 10 segundos
setInterval(fetchData, 10000);
