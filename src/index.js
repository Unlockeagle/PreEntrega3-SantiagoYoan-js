// Sidebar menu
let toggleBtn = document.getElementById("toggle")
let navBar = document.getElementById("navBar")
toggleBtn.onclick =() => {
    navBar.classList.toggle("hidden")
}

// Modo oscuro 

let bgBody = document.getElementById("body")
let btnMode = document.getElementById("togglebg")

btnMode.onclick =() => {
    bgBody.classList.toggle("dark-mode1")
}
