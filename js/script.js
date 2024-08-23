Productos = document.querySelector('#Productos');
Buscar = document.querySelector('#Buscar')

cargarTodo();

function cargarTodo() {

    document.addEventListener('DOMContentLoaded', () =>{
        cargarPanes();
    })
    Buscar.addEventListener('change', () => {
        cargarFiltro()
    });
    
}
function cargarPanes() {
    url = '../data/panes.json'
    fetch(url)
        .then(resultado => resultado.json())
        .then(respuesta => crearPan(respuesta.panes))
}
function crearPan(ProductoObj) {
    // productos = ProductoObj.panes;
    ProductoObj.forEach(producto => {
        const { nombre, venta, imagen } = producto;
        const productoDiv = document.createElement('div')
        productoDiv.classList.add('producto')
        productoDiv.innerHTML = `
            <div class="unidades">${venta}</div>
            <div class="imagenProducto">
                <img class="imagenP" src="./img/panes/${imagen}" alt="pan castillo">
            </div>
            <a class="nombre w-auto" onclick="agregarAlCarrito('${nombre}')">
                ${nombre}
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#E8487D" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M12.5 17h-6.5v-14h-2" />
                    <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                    </svg>
            </a>
        `;
        Productos.appendChild(productoDiv)
    });
}
function cargarFiltro() {
    Productos.innerHTML = '';
    let palabra = Buscar.value.toLowerCase()
    if (palabra === '') {
        cargarPanes()
        return;
    }
    url = '../data/panes.json'
    fetch(url)
        .then(resultado => resultado.json())
        .then(data => {
            const productosFiltrados = data.panes.filter(producto => producto.nombre.toLowerCase().includes(palabra));
            console.log(productosFiltrados)
            crearPan(productosFiltrados);
        })
        // .then(respuesta => filtrarProductos(respuesta))
}


// function filtrarProductos() {

//     const searchTerm = Buscar.value.toLowerCase();
//     const productosFiltrados = productos.filter(producto => 
//       producto.nombre.toLowerCase().includes(searchTerm)
//     );
//     crearPan(productosFiltrados);
// }