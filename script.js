let carrito = [];
let total = 0;

// 1. CONTROLAR CANTIDAD EN EL MENÚ (Antes de agregar)
function cambiarUnidadesMenu(idPlato, cambio) {
    const elementoCantidad = document.getElementById(`cant-${idPlato}`);
    let cantidadActual = parseInt(elementoCantidad.textContent);
    
    cantidadActual += cambio;
    
    // Evitamos que la cantidad sea menor a 1
    if (cantidadActual < 1) {
        cantidadActual = 1;
    }
    
    elementoCantidad.textContent = cantidadActual;
}

// 2. AGREGAR AL CARRITO RESPETANDO LAS UNIDADES SELECCIONADAS
function agregarAlCarritoConCantidad(nombre, precio, idPlato) {
    const elementoCantidad = document.getElementById(`cant-${idPlato}`);
    const cantidadAAgregar = parseInt(elementoCantidad.textContent);

    // Buscamos si el plato ya existe en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        // Si ya existe, solo le sumamos las nuevas unidades
        productoExistente.cantidad += cantidadAAgregar;
    } else {
        // Si es nuevo, lo añadimos con su cantidad inicial
        carrito.push({ nombre, precio, cantidad: cantidadAAgregar });
    }

    // Reiniciamos el contador del menú a 1 para el siguiente pedido
    elementoCantidad.textContent = 1;

    actualizarInterfaz();
}

// 3. QUITAR O DISMINUIR UNIDADES DESDE EL CARRITO
function eliminarDelCarrito(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        if (producto.cantidad > 1) {
            // Si hay más de uno, restamos una unidad
            producto.cantidad -= 1;
        } else {
            // Si solo queda uno, lo borramos por completo del arreglo
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
    total = 0; // Reiniciamos el total para recalcularlo de forma limpia
    
    carrito.forEach(item => {
        const subtotalProducto = item.precio * item.cantidad;
        total += subtotalProducto;

        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';

        // Texto del platillo con sus unidades
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

// 5. ACCIÓN DE PAGAR (Muestra la imagen final)
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
