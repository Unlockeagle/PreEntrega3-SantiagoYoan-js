
let inputNombrePNuevo = document.getElementById("nombreProductoNuevo");
let inputPrecioPNuevo = document.getElementById("precioProductoNuevo");
let crearNuevoProductoBtn = document.getElementById("agregarNuevoBtn");
let selectInv = document.getElementById("productosInv");
let inputModPrecioInv = document.getElementById("inputModPrecioInv");
let modPrecioInvBtn = document.getElementById("modPrecioInvBtn");

//Crea nuevos productos en el array inventario de productos
function crearProductoNuevo() {
  let nombrePNuevo = inputNombrePNuevo.value;
  let precioPNuevo = inputPrecioPNuevo.value;
  
  // Verifica si el producto ya existe en el inventario
  let existe = inventario.find((el) => el.nombre === nombrePNuevo);
  
  if (existe || nombrePNuevo === "" || precioPNuevo === "") {
    alert("¡El producto ya existe en el inventario!");
  } else {
    inventario.push(new Producto(nombrePNuevo, precioPNuevo, 0));
    // Limpia los campos después de agregar un nuevo producto
    inputNombrePNuevo.value = "";
    inputPrecioPNuevo.value = "";
  }
}


let inventario = JSON.parse(localStorage.getItem("inventario"))
// let inventario = JSON.parse(localStorage.getItem("inventario")) || []
if(inventario == null) {
  inventario = []
}

let tableInv = document.getElementById("tableInv");
//Dibuja los productos nuevos en la tabla de inventario


function dibujarInventario() {
  localStorage.setItem("inventario", JSON.stringify(inventario))
  
  tableInv.innerHTML = "";
  
  
  inventario.forEach((el, id) => {
    let tr = document.createElement("tr");
    tableInv.appendChild(tr);  

    let thNombre = document.createElement("th");
    tr.append(thNombre);
    thNombre.innerText = el.nombre;
    thNombre.className = "text-start text-xl font-light"

    let thCant = document.createElement("th");
    tr.append(thCant);
    thCant.innerText = el.cant;
    thCant.className = "font-light"

    let thPrecio = document.createElement("th");
    tr.append(thPrecio);
    thPrecio.innerText = el.precio;
    thPrecio.className = "font-light"

    let button = document.createElement("button")
    tr.append(button)
    button.innerText = "Eliminar"
    button.className = "block my-2 w-full rounded-md bg-indigo-600 px-3.5 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    
    button.onclick = () => {
      inventario.splice(id, 1)
      dibujarInventario()
      rellenarSelectInv()
    }

    let iconoTrash = document.createElement("i")
    button.append(iconoTrash)
    iconoTrash.className = "bi bi-trash ml-2"
  });
}

dibujarInventario()
rellenarSelectInv();


// Boton que activa las funciones de crear nuevo producto y dibujar en la tabla
crearNuevoProductoBtn.onclick = () => {
  crearProductoNuevo();
  dibujarInventario();
  rellenarSelectInv();
  totalTodo()
 
};

// Funcion que rellena el select con los productos existentes en el inventario

function rellenarSelectInv() {
  selectInv.innerHTML = "";
  inventario.forEach((el, id) => {
    let option = document.createElement("option");
    selectInv.append(option);

    // Rellena select con el nombre y el precio de los productos
    option.innerText = `${el.nombre} - $${el.precio}`;
    option.value = id;
  });
}


// Funcion que modifica el precio de un articulo del inventario
function modPrecioInv() {
  let id = selectInv.value;
  let producto = inventario[id];
  let precioNuevo = inputModPrecioInv.value;
  // Verifica si el producto ya existe en el inventario
  let elemento = inventario.find((el) => el.nombre === producto.nombre);
  if (elemento != undefined && precioNuevo != "") {
    producto.precio = precioNuevo;
  } else {
    alert("Ingrese precio nuevo");
  }
  // Limpia los campos después de agregar un nuevo producto
  inputModPrecioInv.value = "";
}

// Boton que activa la funcion de modificar precio del producto
modPrecioInvBtn.onclick = () => {
  modPrecioInv();
  dibujarInventario();
  rellenarSelectInv();
  totalTodo()
 
};


let totalInv = document.getElementById("total")
function totalTodo(){
  totalInv.innerHTML = ""
  totalInv.innerText = inventario.reduce((acum, el) => {  
    return acum + parseFloat(el.precio * el.cant)
  }, 0)
}

totalTodo()

