

let selectCompra = document.getElementById("productosInvComp")
let inventario = JSON.parse(localStorage.getItem("inventario"));

function rellenaSelecComp(){
    selectCompra.innerHTML = "";
    inventario.forEach((el, id) => {
        let opiton = document.createElement("option")
        opiton.value = id
        selectCompra.append(opiton)
        opiton.innerText = `${el.nombre} - $${el.precio}`
        opiton.className = ""
    }); 
}
rellenaSelecComp()
//rellenar select de als compras
//agregar en un nuevo array los productos comprados
//que sumen al inventario las cantidaddes compradas