let inventario = JSON.parse(localStorage.getItem("inventario"));
if (inventario == null) {
  inventario = [];
}


// Dibujar la tabla de inventario
let tableComp = document.getElementById("tableCompras");

function dibujarInventario() {
  localStorage.setItem("inventario", JSON.stringify(inventario));

  tableComp.innerHTML = "";

  // tabla de inventario
  inventario.forEach((el) => {
    let tr = document.createElement("tr");
    tableComp.appendChild(tr);

    let thNombre = document.createElement("th");
    tr.append(thNombre);
    thNombre.innerText = el.nombre;
    thNombre.className = "text-start text-xl font-light";

    let thCant = document.createElement("th");
    tr.append(thCant);
    thCant.innerText = el.cant;
    thCant.className = "font-light";

    let thPrecio = document.createElement("th");
    tr.append(thPrecio);
    thPrecio.innerText = el.precio;
    thPrecio.className = "font-light";
  });
}

let compras = JSON.parse(localStorage.getItem("compras"));
if (compras == null) {
  compras = [];
}

//Dibujar la tabla de compras

function dibijarTablaComp() {
  localStorage.setItem("compras", JSON.stringify(compras));
  let tableComp2 = document.getElementById("tableCompras2");
  tableComp2.innerHTML = "";

  compras.forEach((el, id) => {
    let tr = document.createElement("tr");
    tableComp2.append(tr);

    let th = document.createElement("th");
    tr.append(th);
    th.innerText = el.producto;

    th = document.createElement("th");
    tr.append(th);
    th.innerText = el.cant;

    th = document.createElement("th");
    tr.append(th);
    th.innerText = el.precio;

    th = document.createElement("th");
    tr.append(th);
    th.innerText =el.cant * el.precio;


  });
}
dibijarTablaComp();

// #region Compras
let selectComp = document.getElementById("productosInvComp");
function crearCompra() {
  let id = selectComp.value;
  let producto = inventario[id].nombre;
  console.log(selectComp.value);

  // Obtén la cantidad del input y conviértela a un número entero
  let cant = parseInt(document.getElementById("inputProductosCant").value);

  // Verifica si la cantidad es un número válido
  // if (isNaN(cant) || cant <= 0) {
  //     console.error("La cantidad ingresada no es válida.");
  //     return;
  // }

  let precio = inventario[id].precio;
  // Crea un nuevo objeto Item y agrégalo a las ventas
  compras.push(new Item(producto, cant, precio));

  // Guarda las ventas actualizadas en el almacenamiento local
  localStorage.setItem("compras", JSON.stringify(compras));
  
  console.log("Venta creada:", producto, cant, precio);
}

function rellenarSelectComp() {
  selectComp.innerHTML = "";

  inventario.forEach((el, id) => {
    let option = document.createElement("option");
    selectComp.append(option);

    // Rellena select con el nombre y el precio de los productos
    option.innerText = `${el.nombre} - $${el.precio}`;
    option.value = id;
  });
}

dibujarInventario();
rellenarSelectComp();

function modCantInv() {
  let id = selectComp.value;
  let producto = inventario[id];
  let cantNueva = document.getElementById("inputProductosCant").value;

  // Verifica si el producto ya existe en el inventario
  let elemento = inventario.find((el) => el.nombre === producto.nombre);
  if (elemento != undefined && cantNueva != "") {
    producto.cant += parseInt(cantNueva);
  } else {
    alert("Ingrese las cant");
  }
}

let modCantInvBtn = document.getElementById("modCantInvBtn");
// Boton que activa la funcion de modificar precio del producto
modCantInvBtn.onclick = () => {
  modCantInv();
  dibujarInventario();
  crearCompra();
  dibijarTablaComp();
  rellenarSelectComp();
  // Limpia los campos después de agregar un nuevo producto
  document.getElementById("inputProductosCant").value = "";
  // totalTodo()
};
