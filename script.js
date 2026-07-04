let carrito = [];
let total = 0;

// 1. CONTROLAR CANTIDAD EN EL MENÚ
function cambiarUnidadesMenu(idPlato, cambio) {
    const elementoCantidad = document.getElementById(`cant-${idPlato}`);
    let cantidadActual = parseInt(elementoCantidad.textContent);
    
    cantidadActual += cambio;
    if (cantidadActual < 1) {
        cantidadActual = 1;
    }
    elementoCantidad.textContent = cantidadActual;
}

// 2. AGREGAR AL CARRITO RESPETANDO LAS UNIDADES
function agregarAlCarritoConCantidad(nombre, precio, idPlato) {
    const elementoCantidad = document.getElementById(`cant-${idPlato}`);
    const cantidadAAgregar = parseInt(elementoCantidad.textContent);

    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidadAAgregar;
    } else {
        carrito.push({ nombre, precio, cantidad: cantidadAAgregar });
    }

    elementoCantidad.textContent = 1;
    actualizarInterfaz();
}

// 3. QUITAR UNIDADES DESDE EL CARRITO
function eliminarDelCarrito(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
    }
    actualizarInterfaz();
}

// 4. DIBUJAR TODO EN LA PÁGINA
function actualizarInterfaz() {
    const lista = document.getElementById('lista-carrito');
    const totalPrecioSpan = document.getElementById('total-precio');
    const formularioPago = document.getElementById('formulario-pago');

    if (lista) lista.innerHTML = '';
    total = 0;
    
    carrito.forEach(item => {
        const subtotalProducto = item.precio * item.cantidad;
        total += subtotalProducto;

        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';

        li.innerHTML = `
            <span>${item.nombre} (x${item.cantidad}) - S/. ${subtotalProducto.toFixed(2)}</span>
            <button type="button" onclick="eliminarDelCarrito('${item.nombre}')" style="background-color: #C0392B; padding: 2px 8px; font-size: 0.8rem; margin-left: 10px;">Quitar</button>
        `;
        
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

// 5. ACCIÓN DE PAGAR
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
