
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para agregar un ítem al carrito
    function agregarAlCarrito(item) {
        carrito.push(item);
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    // Función para actualizar la vista del carrito
    function actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = '';
        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('lista')
            li.textContent = `${index + 1}. ${item}`;
            li.setAttribute('data-index', index);
            li.onclick = () => eliminarDelCarrito(index); // Llamada a la función de eliminación
            listaCarrito.appendChild(li);
        });
    }

    // Función para eliminar un ítem del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1); // Elimina el ítem en el índice especificado
        actualizarCarrito(); // Actualiza la vista del carrito
        guardarCarritoEnLocalStorage();
    }

    // Función para enviar el carrito completo por WhatsApp
    function enviarCarrito() {
        if (carrito.length === 0) {
            alert("El carrito está vacío. Agrega algo primero.");
            return;
        }

        // const phoneNumber = '---';
        // const mensaje = `Aquí está tu pedido:\n\n${carrito.join('\n')}`;
        // const encodedMessage = encodeURIComponent(mensaje);
        // const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // // Abrir la URL de WhatsApp en una nueva pestaña
        // window.open(whatsappUrl, '_blank');

        // Reiniciar el carrito después de enviar el pedido
        carrito = [];
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    // Función para guardar el carrito en localStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Actualizar la vista del carrito cuando la página se carga
    window.onload = actualizarCarrito;