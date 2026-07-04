// === LOGICA DEL CARRITO DE COMPRAS ===

let carrito = [];
let total = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    // Añadimos el producto al arreglo del carrito
    carrito.push({ nombre, precio });
    // Sumamos el precio al total
    total += precio;
    // Actualizamos lo que ve el usuario
    actualizarInterfaz();
}

// Función para actualizar la vista del carrito
function actualizarInterfaz() {
    const lista = document.getElementById('lista-carrito');
    const totalPrecioSpan = document.getElementById('total-precio');
    const formularioPago = document.getElementById('formulario-pago');

    // Limpiamos la lista actual
    lista.innerHTML = '';
    
    // Recorremos el carrito y creamos los elementos de la lista
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - S/. ${item.precio.toFixed(2)}`;
        lista.appendChild(li);
    });
    
    // Actualizamos el total a pagar
    totalPrecioSpan.textContent = total.toFixed(2);
    
    // Mostramos u ocultamos la sección de pago según si hay productos
    if (carrito.length > 0) {
        formularioPago.style.display = 'block';
    } else {
        formularioPago.style.display = 'none';
    }
}


// === LOGICA DEL BOTON PAGAR (MODIFICADA) ===

// Escuchamos el evento de 'submit' del formulario de pago
document.getElementById('formulario-pago').addEventListener('submit', function(event) {
    // Evitamos que la página se recargue por defecto
    event.preventDefault();

    // 1. Obtenemos referencias a los elementos principales de la página
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const body = document.body;

    // 2. Ocultamos la cabecera y el contenido principal (menú y carrito)
    if (header) header.style.display = 'none';
    if (main) main.style.display = 'none';

    // 3. Creamos un nuevo contenedor para mostrar la imagen y el mensaje
    const contenedorConfirmacion = document.createElement('div');
    contenedorConfirmacion.style.textAlign = 'center';
    contenedorConfirmacion.style.padding = '50px';
    contenedorConfirmacion.style.marginTop = '100px';

    // 4. Creamos el elemento de imagen
    const imagenConfirmacion = document.createElement('img');
    // --- CAMBIA ESTA URL POR LA DE LA IMAGEN QUE QUIERAS MOSTRAR ---
    imagenConfirmacion.src = 'https://i.imgur.com/gB3H34V.png'; 
    // --------------------------------------------------------------
    imagenConfirmacion.alt = 'Pedido Confirmado';
    imagenConfirmacion.style.maxWidth = '300px'; // Ajusta el tamaño según necesites
    imagenConfirmacion.style.marginBottom = '20px';

    // 5. Creamos un mensaje de texto
    const mensaje = document.createElement('h2');
    mensaje.textContent = '¡Gracias por tu pedido! Tu orden ha sido recibida.';
    mensaje.style.color = '#2C3E50'; // Usamos un color de tu estilo

    // 6. Armamos la estructura y la añadimos al body de la página
    contenedorConfirmacion.appendChild(imagenConfirmacion);
    contenedorConfirmacion.appendChild(mensaje);
    body.appendChild(contenedorConfirmacion);
});
