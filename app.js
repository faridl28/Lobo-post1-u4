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
// =============================================
// AGREGAR TARJETA
// =============================================

function agregarTarjeta() {
  const titulo = leerCampo("#input-titulo");
  const descripcion = leerCampo("#input-descripcion");
  const categoria = document.querySelector("#select-categoria").value;

  // Validación: los campos título y descripción son obligatorios
  if (!titulo || !descripcion) {
    alert("El título y la descripción son obligatorios.");
    return;
  }

  // Crear objeto tarjeta y agregarlo al estado
  const nuevaTarjeta = { id: generarId(), titulo, descripcion, categoria };
  tarjetas.push(nuevaTarjeta);

  // Crear el elemento DOM y añadirlo a la galería
  const elemento = crearElementoTarjeta(nuevaTarjeta);
  galeria.appendChild(elemento);
  actualizarContador();
  
}

// Registrar el evento del botón Agregar
document.querySelector("#btn-agregar").addEventListener("click", agregarTarjeta);
// =============================================
// ELIMINAR TARJETA CON DELEGACIÓN DE EVENTOS
// =============================================

// Un solo listener en la galería para todos los botones Eliminar
galeria.addEventListener("click", (e) => {
  // Verificar que el clic fue en un botón de eliminar
  if (!e.target.matches(".btn-eliminar")) return;

  const idEliminar = Number(e.target.dataset.id);

  // Eliminar del estado
  tarjetas = tarjetas.filter(t => t.id !== idEliminar);

  // Eliminar del DOM
  const elementoTarjeta = galeria.querySelector(`[data-id="${idEliminar}"]`);
  if (elementoTarjeta) elementoTarjeta.remove();
  actualizarContador();
});
// =============================================
// FILTRAR TARJETAS POR CATEGORÍA
// =============================================

const btnsFiltro = document.querySelectorAll(".btn-filtro");

btnsFiltro.forEach(btn => {
  btn.addEventListener("click", () => {
    // Resaltar el botón activo
    btnsFiltro.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");

    const categoriaFiltro = btn.dataset.categoria;

    // Mostrar u ocultar cada tarjeta según la categoría
    const todasLasTarjetas = galeria.querySelectorAll(".tarjeta");
    todasLasTarjetas.forEach(tarjeta => {
      if (categoriaFiltro === "todas") {
        tarjeta.classList.remove("oculta");
      } else {
        const coincide = tarjeta.classList.contains(`categoria-${categoriaFiltro}`);
        tarjeta.classList.toggle("oculta", !coincide);
      }
    });
    actualizarContador();
  });
});
// =============================================
// CONTADOR Y MENSAJE DE GALERÍA VACÍA
// =============================================

function actualizarContador() {
  const visibles = galeria.querySelectorAll(".tarjeta:not(.oculta)").length;

  // Crear el contador si no existe, o reutilizarlo
  let contador = document.querySelector("#contador");
  if (!contador) {
    contador = document.createElement("p");
    contador.id = "contador";
    document.querySelector("#filtros").insertAdjacentElement("afterend", contador);
  }
  contador.textContent = `Mostrando ${visibles} tarjeta(s)`;

  // Mensaje de galería vacía
  const sinTarjetas = galeria.querySelectorAll(".tarjeta").length === 0;
  if (sinTarjetas) {
    galeria.innerHTML = `<p class="mensaje-vacio">No hay tarjetas. Crea la primera usando el formulario.</p>`;
  } else {
    const msgVacio = galeria.querySelector(".mensaje-vacio");
    if (msgVacio) msgVacio.remove();
  }
}