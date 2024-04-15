let inventario = JSON.parse(localStorage.getItem("inventario"));
if (inventario == null) {
  inventario = [];
}

let ventas = JSON.parse(localStorage.getItem("ventas"));
if (ventas == null) {
  ventas = [];
}

console.log(ventas);
function dibujarVentas() {
    
    localStorage.setItem("ventas", JSON.stringify(ventas))
    let tableVentas = document.getElementById("tableVentas");
    tableVentas.innerHTML = "";

    ventas.forEach((el,id) => {
        let tr = document.createElement("tr")
        tableVentas.append(tr)
        
        let th = document.createElement("th")
        tr.append(th)
        th.innerText = el.producto 
        console.log("Es el elemento: " + el.producto);
        
        th = document.createElement("th")
        tr.append(th)
        th.innerText = el.cant
        console.log("Es el elemento: " + el.cant);

        th = document.createElement("th")
        tr.append(th)
        th.innerText = el.precio    

        th = document.createElement("th")
        tr.append(th)
        th.innerText = el.cant * el.precio    
        
    })

}
dibujarVentas()

let selectVta = document.getElementById("productosInvVta");
function crearVenta() {

    let id = selectVta.value;
    let producto = inventario[id].nombre;
    
    // Obtén la cantidad del input y conviértela a un número entero
    let cant = parseInt(document.getElementById("inputProductosCantVta").value);
    
    // Verifica si la cantidad es un número válido
    // if (isNaN(cant) || cant <= 0) {
    //     console.error("La cantidad ingresada no es válida.");
    //     return;
    // }
    
    let precio = inventario[id].precio;
    console.log(cant);
    // Crea un nuevo objeto Item y agrégalo a las ventas
    ventas.push(new Item(producto, cant, precio));
    
    // Guarda las ventas actualizadas en el almacenamiento local
    localStorage.setItem("ventas", JSON.stringify(ventas));
    
    console.log("Venta creada:", producto, cant, precio);
}

//Rellena el select
function rellenarSelectVta() {
  localStorage.setItem("inventario", JSON.stringify(inventario));
  selectVta.innerHTML = "";
  inventario.forEach((el, id) => {
    let option = document.createElement("option");
    selectVta.append(option);

    // Rellena select con el nombre y el precio de los productos
    option.innerText = `${el.nombre} - $${el.precio}`;
    option.value = id;
  });
}

rellenarSelectVta();

function modCantInvVta() {
    let id = selectVta.value;
    let producto = inventario[id];
    let cantNueva = document.getElementById("inputProductosCantVta").value;
    console.log("Es mas abajo: "+ cantNueva);

  // Verifica si el producto ya existe en el inventario
  let elemento = inventario.find((el) => el.nombre === producto.nombre);
  if (elemento != undefined && cantNueva != "") {
    producto.cant -= parseInt(cantNueva);
    console.log(producto.cant);
  } else {
    alert("Ingrese la cant");
  }
}

let modCantVtaBtn = document.getElementById("modCantVtaBtn");
modCantVtaBtn.onclick = () => {
    alert("Producto Vendido");
    modCantInvVta();
    crearVenta()
    rellenarSelectVta();
    dibujarVentas()
    // Limpia los campos después de agregar un nuevo producto
    document.getElementById("inputProductosCantVta").value = "";
};
