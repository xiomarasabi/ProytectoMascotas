async function loadOptions() {
  try {
    const [razas, categorias, generos] = await Promise.all([
      fetch('http://localhost:3000/razaXSR').then(res => res.json()),
      fetch('http://localhost:3000/categoriaXSR').then(res => res.json()),
      fetch('http://localhost:3000/generoXSR').then(res => res.json()),
    ]);

    const razaSelect = document.getElementById('raza');
    const categoriaSelect = document.getElementById('categoria');
    const generoSelect = document.getElementById('genero');

    razas.forEach(raza => {
      const option = document.createElement('option');
      option.value = raza.id;
      option.textContent = raza.nombre;
      razaSelect.appendChild(option);
    });

    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.id;
      option.textContent = categoria.nombre;
      categoriaSelect.appendChild(option);
    });

    generos.forEach(genero => {
      const option = document.createElement('option');
      option.value = genero.id;
      option.textContent = genero.nombre;
      generoSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar opciones:', error);
  }
}

document.getElementById('agregarForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const raza_id = document.getElementById('raza').value;
  const categoria_id = document.getElementById('categoria').value;
  const foto = document.getElementById('foto').files[0];
  const genero_id = document.getElementById('genero').value;
  const errorMessage = document.getElementById('errorMessage');

  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('raza_id', raza_id);
  formData.append('categoria_id', categoria_id);
  formData.append('foto', foto);
  formData.append('genero_id', genero_id);
  formData.append('estado', 'activo'); // Valor por defecto, ajusta según tu lógica

  try {
    const response = await fetch('http://localhost:3000/mascotaXSR', {
      method: 'POST',
      headers: {
        // No necesitas 'Content-Type' con FormData, se configura automáticamente
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert('Mascota creada correctamente');
      window.location.href = '/mascotasXSR.html';
    } else {
      errorMessage.textContent = data.error || 'Error al crear la mascota';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    errorMessage.textContent = 'Error de conexión con el servidor';
    errorMessage.style.display = 'block';
    console.error('Error:', error);
  }
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

document.getElementById('closeBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

// Cargar opciones al iniciar la página
document.addEventListener('DOMContentLoaded', loadOptions);