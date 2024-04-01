class Item {
  /**
   * *Crear los items del carrito
   * @param {String} producto // nombre del producto
   * @param {Float} cantidad  // cant
   */
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  precioTotal() {
    return this.cantidad * this.producto.precio;
  }
}

let carrito = [];
