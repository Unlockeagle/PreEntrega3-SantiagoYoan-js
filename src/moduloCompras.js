let comprasList = [];

comprasList.push(new Compras(0, "monitor", 5, 2500));
comprasList.push(new Compras(0, "pollo", 5, 2500));
console.log(comprasList);

let selectCompra = document.getElementById("productosInvComp");
let inventario = JSON.parse(localStorage.getItem("inventario"));

function rellenaSelecComp() {
  selectCompra.innerHTML = "";
  inventario.forEach((el, id) => {
    let opiton = document.createElement("option");
    opiton.value = id;
    selectCompra.append(opiton);
    opiton.innerText = `${el.nombre} - $${el.precio}`;
    opiton.className = "";
  });
}
rellenaSelecComp();

let tablaCompras = document.getElementById("tableCompras");
let cantidadCompras = document.getElementById("inputProductosCant");

function dibujarTablaCompras() {
  tablaCompras.innerHTML = "";
  comprasList.forEach((el, id) => {
    let trCompras = document.createElement("tr");
    tablaCompras.append(trCompras);

    let thFecha = document.createElement("th");
    trCompras.append(thFecha);
    thFecha.innerText = el.fecha;

    let thNombre = document.createElement("th");
    trCompras.append(thNombre);
    thNombre.innerText = el.producto;

    let thCantidad = document.createElement("th");
    trCompras.append(thCantidad);
    thCantidad.innerText = el.cantidad;

    let thPrecio = document.createElement("th");
    trCompras.append(thPrecio);
    thPrecio.innerText = el.precio;

    let button = document.createElement("button");
    trCompras.append(button);
    button.innerText = "Eliminar";
    button.className =
      "block my-2 w-full rounded-md bg-indigo-600 px-3.5 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

    let iconoTrash = document.createElement("i");
    button.append(iconoTrash);
    iconoTrash.className = "bi bi-trash ml-2";

    button.onclick = () => {
      comprasList.splice(id, 1);
      dibujarTablaCompras();
      rellenaSelecComp();
    };
  });
}

dibujarTablaCompras();
//agregar en un nuevo array los productos comprados
//que sumen al inventario las cantidaddes compradas
