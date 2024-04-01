let inventario = [
  // new Producto("Iphone", 4000),
  // new Producto("Xiaomi", 3000),
  // new Producto("Samsung", 6000),
];

let inputNombrePNuevo = document.getElementById("nombreProductoNuevo");
let inputPrecioPNuevo = document.getElementById("precioProductoNuevo");
let crearNuevoProductoBtn = document.getElementById("agregarNuevoBtn");
let tableInv = document.getElementById("tableInv");
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

// Dibuja los productos nuevos en la tabla de inventario
function dibujarInventario() {
  tableInv.innerHTML = "";
  inventario.forEach((el) => {
    let tr = document.createElement("tr");
    tableInv.append(tr);

    let th = document.createElement("th");
    tr.append(th);
    th.innerText = el.nombre;

    th = document.createElement("th");
    tr.append(th);
    th.innerText = el.cant;

    th = document.createElement("th");
    tr.append(th);
    th.innerText = el.precio;
  });
}
localStorage.getItem("inventario", JSON.parse(inventario));
dibujarInventario();

// Boton que activa las funciones de crear nuevo producto y dibujar en la tabla
crearNuevoProductoBtn.onclick = () => {
  crearProductoNuevo();
  dibujarInventario();
  rellenarSelectInv();
  localStorage.setItem("Inventario", JSON.stringify(inventario));
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
rellenarSelectInv();

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
  localStorage.setItem("Inventario", JSON.stringify(inventario));
};
