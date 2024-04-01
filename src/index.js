let stock = [
  new Producto("Monitor", 15),
  new Producto("Mouse", 12),
  new Producto("Parlante", 10),
  new Producto("Teclado", 50),
];

let select = document.getElementById("productos");

function rellenaSelect() {
  select.innerHTML = "";
  stock.forEach((el, id) => {
    let option = document.createElement("option");
    option.value = id;
    select.append(option);
    option.innerText = `${el.nombre} - $${el.precio}`;
  });
}
rellenaSelect();

let agregarBtn = document.getElementById("agregar");

let table = document.getElementById("items");
function dibujarCarrito() {
  table.innerHTML = "";
  carrito.forEach((el) => {
    let tr = document.createElement("tr");
    table.append(tr);

    let th = document.createElement("th");
    tr.append(th);
    th.innerText = el.producto.nombre;

    th = document.createElement("th");
    tr.append(th);
    th.innerText = el.cantidad;

    th = document.createElement("th");
    tr.append(th);
    th.innerText = el.producto.precio;
  });
}
agregarBtn.onclick = () => {
  let id = select.value;
  let producto = stock[id];
  let elemento = carrito.find((el) => {
    return stock[id].nombre === el.producto.nombre;
  });
  if (elemento != undefined) {
    elemento.cantidad++;
  } else {
    carrito.push(new Item(producto, 1));
  }
  dibujarCarrito();
};
console.log(carrito);
// function rellenaSelect() {
//   // Vaciar select
//   select.innerHTML = "";
//   stock.forEach((el, id) => {
//     // Creamos la etiqueta option
//     let op = document.createElement("option");
//     op.innerText = `${el.nombre} - $${el.precio}`;
//     op.value = id;
//     // Añadir los op al select
//     select.append(op);
//   });
// }

// rellenaSelect();

// let table = document.getElementById("items");
// function dibujaCarrito() {
//   table.innerHTML = "";
//   carrito.forEach((el) => {
//     let tr = document.createElement("tr");
//     table.append(tr);

//     let th = document.createElement("th");
//     tr.append(th);
//     th.innerText = el.producto.nombre;

//     th = document.createElement("th");
//     tr.append(th);
//     th.innerText = el.cantidad;

//     th = document.createElement("th");
//     tr.append(th);
//     th.innerText = el.producto.precio;
//   });
// }

// let carrito = [];
// let agregar = document.getElementById("agregar");
// agregar.onclick = () => {
//   let id = select.value;
//   let producto = stock[id];
//   // Verificar si el elemento existe
//   let elemento = carrito.find((el) => {
//     return stock[id].nombre === el.producto.nombre;
//   });
//   // si el elemento existe aumenta la cantidad
//   if (elemento != undefined) {
//     elemento.cantidad++;
//   } else {
//     // si el elemento no exite lo crea
//     carrito.push(new Item(producto, 1));
//   }
//   dibujaCarrito();
// };
