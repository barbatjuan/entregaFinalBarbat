// let precioTradicional = 1500;
// let precioSteel = 1300;
// let precioWood = 1000;
// function calculaPrecioPorMetro(metros, costoPorMetro) {
//   return metros * costoPorMetro;
// } //calculamos metros x costo por metro

// let metros = prompt("Metros para el presupuesto "); //pedimos al usuario cantidad de metros

// metros = parseFloat(metros);

// let costoPorMetro; //Definimos de manera global la variable, la había definido dentro del if ;(
// if (metros > 0) {
//   let tipoDeConstruccion = prompt(
//     "Ingrese el tipo de construcción (tradicional, steel o wood)"
//   );
//   switch (tipoDeConstruccion) {
//     case "tradicional":
//       costoPorMetro = precioTradicional;
//       break;
//     case "steel":
//       costoPorMetro = precioSteel;
//       break;
//     case "wood":
//       costoPorMetro = precioWood;
//       break;
//     default:
//       costoPorMetro = undefined || null;
//       console.error("El tipo de construcción no es válido.");
//   }
// }
// const formaDePago = prompt(
//   "Ingrese forma de pago, contado o 12 cuotas sin recargo"
// );

// let costoTotal;
// if (metros > 0) {
//   costoTotal = calculaPrecioPorMetro(metros, costoPorMetro);
//   console.log("Este es el precio total estimado en USD " + costoTotal);
// } else {
//   if (metros <= 0) {
//     console.error("No se puede calcular");
//   } else {
//     console.error("Error");
//   }
// }

// if (formaDePago === "contado") {
//   costoTotal = costoTotal * 0.9;
//   console.log("El precio final pagando contado es de USD" + costoTotal);
// } else if (formaDePago === "12 cuotas") {
//   costoTotal = costoTotal / 12;
//   console.log("El valor de cada cuota es de es de USD" + costoTotal);
// } else {
//   console.error("Opción inválida");
// }

let titulo = document.getElementById("titulo");
titulo.innerHTML = "Raciones Caninas Uruguay";
let footerP = document.getElementById("footer");
let footer = document.createElement("p")
footerP.innerHTML = "Todos los derechos reservados ;)";


console.log(footerP);
///////////////////////////////
const producto = [];

producto.push(
  { nombreProducto: "Equilibrio TR", tipoMascota: "Perro", etapaVida: "Adulto", precio: 3490 },
  { nombreProducto: "Equilibrio CH", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 3790 },
  { nombreProducto: "Natural Choice", tipoMascota: "Gato", etapaVida: "Adulto", precio: 1490 },
  { nombreProducto: "Full Nutrition", tipoMascota: "Perro", etapaVida: "Adulto", precio: 2190 },
  { nombreProducto: "Equilibrio CH", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 3790 },
  { nombreProducto: "Equilibrio Raza Grande", tipoMascota: "Perro", etapaVida: "Adulto", precio: 3590 },
  { nombreProducto: "Equilibrio CH Raza Grande", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 3890 },
  { nombreProducto: "Natural Choice", tipoMascota: "Perro", etapaVida: "Adulto", precio: 2490 },
  { nombreProducto: "Full Nutrition", tipoMascota: "Perro", etapaVida: "Cachorro", precio: 2090 },
  { nombreProducto: "Frost", tipoMascota: "Gato", etapaVida: "Cachorro", precio: 1890 },
  { nombreProducto: "Frost", tipoMascota: "Gato", etapaVida: "Adulto", precio: 1790 },
  { nombreProducto: "Frost ", tipoMascota: "Perro", etapaVida: "Adulto", precio: 2790 }
);

function buscarProducto() {
  const productoBuscado = prompt("Ingrese producto a buscar");
  const productoEncontrado = producto.filter(producto =>
    producto.nombreProducto.toLowerCase().includes(productoBuscado.toLowerCase())
  );
  if (productoEncontrado) {
    console.log(productoEncontrado);
  } else {
    console.error("Producto no encontrado");
  }
}
buscarProducto();


