/*🧠 Lógica principal del proyecto
Este proyecto simula una biblioteca pública interactiva desde el navegador. Los libros se almacenan en memoria como un arreglo JSON, y se pueden agregar, clasificar como "Disponible" o "Prestado", y también visualizar en una sección de "Inventario". Usa JavaScript para gestionar el DOM y simular lectura/escritura de datos sin archivos reales.*/

/*🧩 Pasos del proyecto
paso 1.-Inicializar base de datos de libros.
paso 2.-Mostrar y ocultar formulario para añadir libros.
paso 3.-Agregar libros a la base de datos.
paso 4.-Renderizar los libros en las columnas: Disponible, Prestado, Inventario.
paso 5.-Permitir cambiar manualmente el estado de los libros.
paso 6.-Al iniciar, mostrar todos los libros existentes.*/


// Paso 1: Base de datos simulada en formato JSON con dos libros
let biblioteca = [
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", disponible: true },
  { titulo: "1984", autor: "George Orwell", genero: "Distopía", disponible: false }
];

// Paso 2: Función que muestra el formulario de ingreso de libros
function mostrarFormulario() {
  // Elimina la clase 'oculto' para hacer visible el formulario
  document.getElementById("formulario").classList.remove("oculto");
}

// Paso 2: Función que oculta el formulario y limpia los campos
function cancelarFormulario() {
  // Agrega la clase 'oculto' al formulario para esconderlo
  document.getElementById("formulario").classList.add("oculto");

  // Limpia los campos de entrada del formulario
  document.getElementById("titulo").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("genero").value = "";
}

// Paso 3: Función que agrega un nuevo libro a la biblioteca
function agregarLibro() {
  // Obtiene y limpia los valores de entrada del formulario
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const genero = document.getElementById("genero").value.trim();

  // Valida que los campos no estén vacíos
  if (!titulo || !autor || !genero) {
    alert("Por favor completa todos los campos.");
    return; // Sale de la función si falta algún campo
  }

  // Crea un nuevo objeto de libro sin propiedad 'disponible'
  const nuevoLibro = { titulo, autor, genero };

  // Lo agrega al arreglo 'biblioteca'
  biblioteca.push(nuevoLibro);

  // Oculta el formulario y actualiza la vista
  cancelarFormulario();
  renderizarLibros();
}

// Paso 4: Función que renderiza (pinta) los libros en pantalla
function renderizarLibros() {
  // Referencias a las columnas de la interfaz
  const zonaDisponible = document.getElementById("disponible");
  const zonaPrestado = document.getElementById("prestado");
  const zonaInventario = document.getElementById("inventario");

  // Limpia el contenido anterior de las columnas
  zonaDisponible.innerHTML = "";
  zonaPrestado.innerHTML = "";
  zonaInventario.innerHTML = "";

  // Recorre todos los libros para clasificarlos y mostrarlos
  biblioteca.forEach((libro, index) => {

    // Crear la tarjeta que se usará para Disponible o Prestado
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta"; // Clase para estilo visual
    tarjeta.innerHTML = `
      <strong>${libro.titulo}</strong><br>
      Autor: ${libro.autor}<br>
      Género: ${libro.genero}<br>
    `;

    // Paso 5: Si el libro está disponible
    if (libro.disponible === true) {
      const btnCambiar = document.createElement("button");
      btnCambiar.textContent = "Prestar 📕"; // Texto del botón
      btnCambiar.onclick = () => {
        biblioteca[index].disponible = false; // Cambia estado a prestado
        renderizarLibros(); // Recarga vista
      };
      tarjeta.appendChild(btnCambiar); // Añade botón a la tarjeta
      zonaDisponible.appendChild(tarjeta); // Muestra en columna "Disponible"
    }

    // Paso 5: Si el libro está prestado
    else if (libro.disponible === false) {
      const btnCambiar = document.createElement("button");
      btnCambiar.textContent = "Devolver 📗"; // Texto del botón
      btnCambiar.onclick = () => {
        biblioteca[index].disponible = true; // Cambia estado a disponible
        renderizarLibros(); // Recarga vista
      };
      tarjeta.appendChild(btnCambiar);
      zonaPrestado.appendChild(tarjeta); // Muestra en columna "Prestado"
    }

    // Paso 6: Mostrar todos los libros también en Inventario
    const tarjetaInventario = document.createElement("div");
    tarjetaInventario.className = "tarjeta"; // Mismo estilo
    tarjetaInventario.innerHTML = `
      <strong>${libro.titulo}</strong><br>
      Autor: ${libro.autor}<br>
      Género: ${libro.genero}<br>
    `;

    // Crea el botón que estará en Inventario
    const btnInventario = document.createElement("button");

    // Si el libro no tiene estado de disponibilidad (nuevo libro)
    if (!libro.hasOwnProperty("disponible")) {
      btnInventario.textContent = "Marcar como Disponible 📗";
      btnInventario.onclick = () => {
        biblioteca[index].disponible = true; // Asigna estado
        renderizarLibros(); // Refresca vista
      };
    }

    // Si ya tiene estado, solo muestra si está disponible o prestado
    else {
      btnInventario.textContent = libro.disponible ? "Disponible 📗" : "Prestado 📕";
      btnInventario.disabled = true; // No se puede hacer clic
    }

    // Agrega botón y tarjeta a la columna de Inventario
    tarjetaInventario.appendChild(btnInventario);
    zonaInventario.appendChild(tarjetaInventario);
  });
}

// Paso 6: Ejecuta la función para mostrar libros al iniciar
renderizarLibros();
