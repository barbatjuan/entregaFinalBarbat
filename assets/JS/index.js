let precioTradicional = 1500;
let precioSteel = 1300;
let precioWood = 1000;
function calculaPrecioPorMetro(metros, costoPorMetro) {
  return metros * costoPorMetro;
} //calculamos metros x costo por metro

let metros = prompt("Metros para el presupuesto "); //pedimos al usuario cantidad de metros

metros = parseFloat(metros);

let costoPorMetro; //Definimos de manera global la variable, la había definido dentro del if ;(
if (metros > 0) {
  let tipoDeConstruccion = prompt(
    "Ingrese el tipo de construcción (tradicional, steel o wood)"
  );
  switch (tipoDeConstruccion) {
    case "tradicional":
      costoPorMetro = precioTradicional;
      break;
    case "steel":
      costoPorMetro = precioSteel;
      break;
    case "wood":
      costoPorMetro = precioWood;
      break;
    default:
      costoPorMetro = undefined || null;
      console.error("El tipo de construcción no es válido.");
  }
}
const formaDePago = prompt(
  "Ingrese forma de pago, contado o 12 cuotas sin recargo"
);

let costoTotal;
if (metros > 0) {
  costoTotal = calculaPrecioPorMetro(metros, costoPorMetro);
  console.log("Este es el precio total estimado en USD " + costoTotal);
} else {
  if (metros <= 0) {
    console.error("No se puede calcular");
  } else {
    console.error("Error");
  }
}

if (formaDePago === "contado") {
  costoTotal = costoTotal * 0.9;
  console.log("El precio final pagando contado es de USD" + costoTotal);
} else if (formaDePago === "12 cuotas") {
  costoTotal = costoTotal / 12;
  console.log("El valor de cada cuota es de es de USD" + costoTotal);
} else {
  console.error("Opción inválida");
}

// Me falta calcular el precio total dividido 12 cuotas100

// Calcular costo total - 10% si paga contado
