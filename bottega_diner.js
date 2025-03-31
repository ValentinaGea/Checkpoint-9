// Función para solicitar la hora de reserva al cliente
function solicitarHoraReserva() {
  alert("Bienvenido a Bottega Diner. Nuestro horario de apertura es desde las 07:00 - 23:00 horas.");

  let horaReserva;
  while (true) {
    // Pedimos al usuario que ingrese una hora en formato HH:MM
    try {
      horaReserva = prompt("¿A qué hora desea reservar su mesa? (Formato HH:MM)");
      if (!horaReserva) {
        alert("Debe ingresar una hora válida.");
        continue;
      }
      // Validamos que la hora esté en formato correcto (HH:MM)
      if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(horaReserva)) {
        alert("Formato incorrecto. Introduzca la hora en formato HH:MM, como por ejemplo 07:05, en horario de 07:00 - 23:00");
        continue;
      }
      let [hora, minutos] = horaReserva.split(":").map(num => parseInt(num.trim()));
      // Validamos que la hora y los minutos sean valores numéricos correctos
      if (isNaN(hora) || isNaN(minutos) || minutos < 0 || minutos > 59) {
        alert("Formato de hora inválido. Introduzca la hora en formato HH:MM en horario de 07:00 - 23:00");
        continue;
      }
      // Verificamos si la hora está dentro del horario de apertura
      if (hora >= 7 && hora < 23) {
        return hora;
      } else {
        alert("Lo sentimos, estamos cerrados. Nuestro horario es de 07:00 a 23:00. Introduzca una hora válida en formato HH:MM.");
      }
      
    } catch (error) {
      alert("Error en la entrada de hora. Intente de nuevo.");
    }
  }
}

// Función para mostrar el menú según la hora de la reserva
function mostrarMenu() {
  try {
    let hora = solicitarHoraReserva();
    let menu;
    // Definimos el menú en función de la hora del día
    if (hora >= 7 && hora < 12) {
      menu = {
        tipo: "Breakfast",
          primeros: { "1": ["Tortilla", 3.75], "2": ["Tostada con aguacate", 4.20], "3": ["Croissant", 3] },
          segundos: { "1": ["Café expreso", 2], "2": ["Café con leche", 2.50], "3": ["Té matcha", 3.50] },
          postres: { "1": ["Naranja", 2.50], "2": ["Melocotón", 3], "3": ["Piña", 3.20]}
      };
    } else if (hora >= 12 && hora < 18) {
      menu = {
        tipo: "Lunch",
        primeros: { "1": ["Paella de marisco", 15.75], "2": ["Patatas al horno", 10], "3": ["Alubias con sacramentos", 12.50] },
        segundos: { "1": ["Chuleta de cordero", 20.50], "2": ["Merluza", 19.75], "3": ["Hamburguesa vegetal", 15] },
        postres: { "1": ["Café", 2], "2": ["Fruta", 3], "3": ["Yogur", 2.50] }
      };
    } else if (hora >= 18 && hora < 23) {
      menu = {
        tipo: "Dinner",
        primeros: { "1": ["Paella de marisco", 18.90], "2": ["Patatas al horno", 12.50], "3": ["Alubias con sacramento", 17] },
        segundos: { "1": ["Chuleta de cordero", 22.50], "2": ["Merluza", 21.45], "3": ["Hamburguesa vegetal", 18] },
        postres: { "1": ["Café", 3], "2": ["Fruta", 4], "3": ["Yogur", 3.50] }
      };
    }
    
    alert(`Actualmente estamos sirviendo ${menu.tipo}.`);
    let total = 0;
    let seleccion = [];

    let categorias = ["primer plato", "segundo plato", "postre"];
    let tipos = [menu.primeros, menu.segundos, menu.postres];
    
    for (let i = 0; i < 3; i++) {
      let [nombre, precio] = solicitarEleccion(tipos[i], categorias[i]);
      seleccion.push({ nombre, precio });
      total += precio;
      alert(obtenerComentarioAleatorio());
    }

    // Mostrar la factura con precios con dos decimales
    let factura = "Resumen de su pedido:\n" +
    seleccion.map(p => `- ${p.nombre}: $${p.precio.toFixed(2)}`).join("\n") +
    `\nTotal: $${total.toFixed(2)}`;
    alert(factura);
  } catch (error) {
      alert("Ocurrió un error inesperado. Intente de nuevo.");
  }
}

// Función para obtener un comentario aleatorio tras seleccionar un plato
function obtenerComentarioAleatorio() {
  const comentarios = ["Buena elección!", "Delicioso, gran opción!", "Te va a encantar!", "Es nuestra especialidad!"];
  return comentarios[Math.floor(Math.random() * comentarios.length)];
}

// Función para solicitar al usuario que elija un plato de cada categoría
function solicitarEleccion(platos, categoria) {
  let eleccion;
  while (true) {
    try {
      // Mostrar opciones con precios en formato de dos decimales
      eleccion = prompt(`Seleccione su ${categoria} introduciendo 1, 2 o 3:\n${Object.entries(platos).map(([num, [nombre, precio]]) => `${num}. ${nombre} - $${precio.toFixed(2)}`).join("\n")}`);
      if (!platos[eleccion]) {
        alert("Opción no válida. Debe introducir 1, 2 o 3.");
        continue;
      }
      return platos[eleccion];
    } catch (error) {
      alert("Error en la selección de plato. Intente de nuevo.");
    }
  }
}

mostrarMenu();