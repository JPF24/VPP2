document.addEventListener("DOMContentLoaded", () => {
  const baseDeDatos = [
    {
      id: 1,
      nombre: "Arrollado de Pollo",
      precio: 2900,
      imagen: (src = "./images/imgMenu/arrollado de pollo.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 2,
      nombre: "Bife de Pollo",
      precio: 2500,
      imagen: (src = "./images/imgMenu/bife de pollo.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 3,
      nombre: "Bomba de Carne",
      precio: 2500,
      imagen: (src = "./images/imgMenu/bomba de carne.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 4,
      nombre: "Canelones de Verdura",
      precio: 2300,
      imagen: (src = "./images/imgMenu/canelones de verdura.png"),
      descripcion: "Salsa + pan + postre",
    },
    {
      id: 5,
      nombre: "Costeleta de Cerdo",
      precio: 2400,
      imagen: (src = "./images/imgMenu/costeleta de cerdo.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 6,
      nombre: "Hamburguesa Mapolitana",
      precio: 2400,
      imagen: (src = "./images/imgMenu/hamburguesa napolitana.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 7,
      nombre: "Lasagna de Carne",
      precio: 2500,
      imagen: (src = "./images/imgMenu/lasagna de carne.png"),
      descripcion: "Pan + postre",
    },
    {
      id: 8,
      nombre: "Milanesa",
      precio: 2600,
      imagen: (src = "./images/imgMenu/mila carne.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 9,
      nombre: "Milanesa de Merluza",
      precio: 2500,
      imagen: (src = "./images/imgMenu/mila de merluza.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 10,
      nombre: "Milanesa Napolitana",
      precio: 2600,
      imagen: (src = "./images/imgMenu/mila napolitana.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 11,
      nombre: "Pollo al Horno",
      precio: 1500,
      imagen: (src = "./images/imgMenu/pollo al horno.png"),
      descripcion: "Salsa a elección + 2 guarniciones + pan + postre",
    },
    {
      id: 12,
      nombre: "Sorrentinos",
      precio: 2300,
      imagen: (src = "./images/imgMenu/sorrentinos.png"),
      descripcion: "Salsa + pan + postre",
    },
    {
      id: 13,
      nombre: "Supremas Rellenas",
      precio: 2700,
      imagen: (src = "./images/imgMenu/supremas rellenas.png"),
      descripcion: "2 guarniciones + pan + postre",
    },
    {
      id: 14,
      nombre: "Tarta de Pollo",
      precio: 2500,
      imagen: (src = "./images/imgMenu/tarta de pollo.png"),
      descripcion: "Guarnicion + pan + postre",
    },
  ];

  let carrito = [];
  const DOMitems = document.querySelector("#items");
  const DOMcarrito = document.querySelector("#carrito");
  const DOMtotal = document.querySelector("#total");
  const DOMbotonVaciar = document.querySelector("#boton-vaciar");

  // crear los productos. (No en el carrito)
  function renderizarProductos() {
    baseDeDatos.forEach((info) => {
      // Estructura
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4");
      // Body
      const miNodoCardBody = document.createElement("div");
      miNodoCardBody.classList.add("card-body");
      // Titulo
      const miNodoTitle = document.createElement("h5");
      miNodoTitle.classList.add("card-title");
      miNodoTitle.textContent = info.nombre;
      // Descripción
      const miNodoDescrip = document.createElement("h5");
      miNodoDescrip.classList.add("card-desc");
      miNodoDescrip.textContent = info.descripcion;
      // Imagen
      const miNodoImagen = document.createElement("img");
      miNodoImagen.classList.add("img-fluid");
      miNodoImagen.setAttribute("src", info.imagen);
      // Precio
      const miNodoPrecio = document.createElement("p");
      miNodoPrecio.classList.add("card-text");
      miNodoPrecio.textContent = `$ ${info.precio}`;
      // Boton
      const miNodoBoton = document.createElement("button");
      miNodoBoton.classList.add("btn", "btn-primary");
      miNodoBoton.textContent = "Agregar";
      miNodoBoton.setAttribute("marcador", info.id);
      miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);
      // Insertamos
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoDescrip);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }

  // añadir producto al carrito
  function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute("marcador"));
    // actualizar carrito
    renderizarCarrito();
  }

  // dibuja los productos del carrito
  function renderizarCarrito() {
    // Vaciamos el html
    DOMcarrito.textContent = "";
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
      // buscamos el item que necesitamos de la variable baseDeDatos
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        // ¿Coinciden los id? (únicamente puede haber un caso)
        return itemBaseDatos.id === parseInt(item);
      });
      // Cuenta el número de veces que se repite el producto
      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        // ¿Coinciden los id? Incremento el contador, sino no
        return itemId === item ? (total += 1) : total;
      }, 0);
      // Creamos el nodo del item del carrito
      const miNodo = document.createElement("li");
      miNodo.classList.add("list-group-item", "text-right", "mx-2");
      miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $ ${miItem[0].precio}`;

      // Boton de borrar
      const miBoton = document.createElement("button");
      miBoton.classList.add("btn", "btn-danger", "mx-5");
      miBoton.textContent = "X";
      miBoton.style.marginLeft = "1rem";
      miBoton.dataset.item = item;
      miBoton.addEventListener("click", borrarItemCarrito);

      // Mezclamos nodos
      miNodo.appendChild(miBoton);
      DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
  }

  // para borrar un elemento del carrito

  function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
  }

  //Calcular el precio total (teniendo en cuenta los productos repetidos)

  function calcularTotal() {
    // Recorremos el array del carrito
    return (
      carrito
        .reduce((total, item) => {
          // De cada elemento obtenemos su precio
          const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
          });
          // Los sumamos al total
          return total + miItem[0].precio;
        }, 0)
        // dos decimales
        .toFixed(2)
    );
  }

  //Vacia el carrito y vuelve a dibujarlo

  function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
  }

  // Eventos
  DOMbotonVaciar.addEventListener("click", vaciarCarrito);

  // Inicio
  renderizarProductos();
  renderizarCarrito();
});
