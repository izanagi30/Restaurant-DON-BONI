let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const lista = document.getElementById('lista-carrito');
    const totalPrecioSpan = document.getElementById('total-precio');
    const formularioPago = document.getElementById('formulario-pago');

    if (lista) lista.innerHTML = '';
    
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - S/. ${item.precio.toFixed(2)}`;
        if (lista) lista.appendChild(li);
    });
    
    if (totalPrecioSpan) totalPrecioSpan.textContent = total.toFixed(2);
    
    if (formularioPago) {
        if (carrito.length > 0) {
            formularioPago.style.display = 'block';
        } else {
            formularioPago.style.display = 'none';
        }
    }
}

// Evento al presionar Pagar
const formPago = document.getElementById('formulario-pago');
if (formPago) {
    formPago.addEventListener('submit', function(event) {
        event.preventDefault();

        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const body = document.body;

        if (header) header.style.display = 'none';
        if (main) main.style.display = 'none';

        const contenedorConfirmacion = document.createElement('div');
        contenedorConfirmacion.style.textAlign = 'center';
        contenedorConfirmacion.style.padding = '50px';
        contenedorConfirmacion.style.marginTop = '100px';

        const imagenConfirmacion = document.createElement('img');
        imagenConfirmacion.src = 'https://i.imgur.com/gB3H34V.png'; 
        imagenConfirmacion.alt = 'Pedido Confirmado';
        imagenConfirmacion.style.maxWidth = '300px';
        imagenConfirmacion.style.marginBottom = '20px';

        const mensaje = document.createElement('h2');
        mensaje.textContent = '¡Gracias por tu pedido! Tu orden ha sido recibida.';
        mensaje.style.color = '#2C3E50';

        contenedorConfirmacion.appendChild(imagenConfirmacion);
        contenedorConfirmacion.appendChild(mensaje);
        body.appendChild(contenedorConfirmacion);
    });
}
