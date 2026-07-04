// Inicializamos la pasarela con tu LLAVE PÚBLICA (es seguro mostrarla aquí)
const stripe = Stripe('tu_llave_publica_aqui'); 
let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - S/. ${item.precio.toFixed(2)}`;
        lista.appendChild(li);
    });
    
    document.getElementById('total-precio').textContent = total.toFixed(2);
    
    // Si hay artículos, mostramos el formulario de pago
    if (carrito.length > 0) {
        document.getElementById('formulario-pago').style.display = 'block';
        inicializarFormularioPago();
    }
}

// Configurar los campos seguros de la tarjeta
let elements;
function inicializarFormularioPago() {
    if (!elements) {
        elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#elemento-tarjeta');
    }
}

// Procesar el pago al enviar el formulario
document.getElementById('formulario-pago').addEventListener('submit', async (event) => {
    event.preventDefault();
    document.getElementById('boton-pagar').disabled = true;

    // 1. LLAMADA CRUCIAL: Pedimos la intención de pago a nuestro Backend seguro
    // (Por ejemplo, una función Serverless en Vercel o Supabase)
    const respuestaBackend = await fetch('https://tu-api-segura.vercel.app/api/crear-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: carrito, total_esperado: total })
    });
    
    const { clientSecret } = await respuestaBackend.json();

    // 2. Confirmamos el pago directamente con los servidores de la pasarela
    const cardElement = elements.getElement('card');
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
    });

    if (error) {
        document.getElementById('mensaje-error').textContent = error.message;
        document.getElementById('boton-pagar').disabled = false;
    } else if (paymentIntent.status === 'succeeded') {
        alert('¡Pago exitoso! Tu orden ha sido enviada a la cocina de DON-BONI.');
        carrito = [];
        total = 0;
        actualizarInterfaz();
        document.getElementById('formulario-pago').style.display = 'none';
    }
});
