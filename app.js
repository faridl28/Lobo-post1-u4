// =============================================
// ESTADO CENTRAL DE LA APLICACIÓN
// =============================================

let tarjetas = [];
let idContador = 1;

// Genera un ID único para cada tarjeta
const generarId = () => idContador++;

// Obtiene el valor de un campo de texto y lo limpia
const leerCampo = (selector) => {
  const campo = document.querySelector(selector);
  const valor = campo.value.trim();
  campo.value = "";
  return valor;
};

// Referencia al contenedor de la galería
const galeria = document.querySelector("#galeria");
// =============================================
// CREAR ELEMENTO TARJETA EN EL DOM
// =============================================

function crearElementoTarjeta({ id, titulo, descripcion, categoria }) {
  // Crear el contenedor de la tarjeta
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta", `categoria-${categoria}`);
  tarjeta.dataset.id = id;

  // Construir el contenido HTML de la tarjeta usando template literals
  tarjeta.innerHTML = `
    <span class="badge">${categoria}</span>
    <h3>${titulo}</h3>
    <p>${descripcion}</p>
    <button class="btn-eliminar" data-id="${id}">Eliminar</button>
  `;

  return tarjeta;
}