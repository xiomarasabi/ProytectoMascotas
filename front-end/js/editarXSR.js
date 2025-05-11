async function loadOptions() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token. Por favor, inicia sesión.');
    }

    const [razas, categorias, generos, usuarios] = await Promise.all([
      fetch('http://localhost:3000/razaXSR', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        if (!res.ok) throw new Error(`Error en razaXSR: ${res.status}`);
        return res.json();
      }),
      fetch('http://localhost:3000/categoriaXSR', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        if (!res.ok) throw new Error(`Error en categoriaXSR: ${res.status}`);
        return res.json();
      }),
      fetch('http://localhost:3000/generoXSR', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        if (!res.ok) throw new Error(`Error en generoXSR: ${res.status}`);
        return res.json();
      }),
      fetch('http://localhost:3000/usuarioXSR', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        if (!res.ok) throw new Error(`Error en usuarioXSR: ${res.status}`);
        return res.json();
      }),
    ]);

    const razaSelect = document.getElementById('raza');
    const categoriaSelect = document.getElementById('categoria');
    const generoSelect = document.getElementById('genero');
    const usuarioSelect = document.getElementById('usuario');

    razas.forEach(raza => {
      const option = document.createElement('option');
      option.value = raza.id;
      option.textContent = raza.name || raza.name;
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

    usuarios.forEach(usuario => {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.textContent = usuario.nombre;
      usuarioSelect.appendChild(option);
    });

  } catch (error) {
    console.error('Error al cargar opciones:', error);
    document.getElementById('errorMessage').textContent = `Error al cargar opciones: ${error.message}`;
    document.getElementById('errorMessage').style.display = 'block';
  }
}

async function loadMascotaData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const errorMessage = document.getElementById('errorMessage');
  const nombreInput = document.getElementById('nombre');
  const razaSelect = document.getElementById('raza');
  const categoriaSelect = document.getElementById('categoria');
  const generoSelect = document.getElementById('genero');
  const usuarioSelect = document.getElementById('usuario');
  const estadoSelect = document.getElementById('estado');
  const editarFoto = document.getElementById('editarFoto');

  errorMessage.style.display = 'none';

  if (!id) {
    errorMessage.textContent = 'No se proporcionó un ID de mascota.';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/mascotaXSR/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al cargar la mascota: ${response.status} - ${errorText}`);
    }

    const mascota = await response.json();

    nombreInput.value = mascota.nombre || '';
    razaSelect.value = mascota.raza_id ? mascota.raza_id.toString() : '';
    categoriaSelect.value = mascota.categoria_id ? mascota.categoria_id.toString() : '';
    generoSelect.value = mascota.genero_id ? mascota.genero_id.toString() : '';
    usuarioSelect.value = mascota.usuario_id ? mascota.usuario_id.toString() : '';
    estadoSelect.value = mascota.estado || 'activo';
    editarFoto.src = `http://localhost:3000${mascota.foto || '/imgs/default-pet.svg'}`;

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.getElementById('errorMessage').textContent = `Error al cargar los datos: ${error.message}`;
    document.getElementById('errorMessage').style.display = 'block';
  }
}

document.getElementById('editarForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = new URLSearchParams(window.location.search).get('id');
  const nombre = document.getElementById('nombre').value.trim();
  const raza_id = document.getElementById('raza').value;
  const categoria_id = document.getElementById('categoria').value;
  const foto = document.getElementById('foto').files[0];
  const genero_id = document.getElementById('genero').value;
  const usuario_id = document.getElementById('usuario').value;
  const estado = document.getElementById('estado').value;
  const errorMessage = document.getElementById('errorMessage');

  // Validación de campos obligatorios
  if (!nombre || !raza_id || !categoria_id || !genero_id || !usuario_id || !estado) {
    errorMessage.textContent = 'Todos los campos son obligatorios excepto la foto.';
    errorMessage.style.display = 'block';
    return;
  }

  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('raza_id', raza_id);
  formData.append('categoria_id', categoria_id);
  if (foto) formData.append('foto', foto);
  formData.append('genero_id', genero_id);
  formData.append('usuario_id', usuario_id);
  formData.append('estado', estado);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      errorMessage.textContent = 'Debes iniciar sesión para modificar la mascota.';
      errorMessage.style.display = 'block';
      return;
    }

    const response = await fetch(`http://localhost:3000/mascotaXSR/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    alert('Mascota modificada correctamente');
    window.location.href = '/mascotasXSR.html';

  } catch (error) {
    console.error('Error al actualizar:', error);
    errorMessage.textContent = `Error al modificar la mascota: ${error.message}`;
    errorMessage.style.display = 'block';
    if (error.message.includes('Token inválido o expirado')) {
      localStorage.removeItem('token');
      setTimeout(() => window.location.href = '/indexXSR.html', 2000);
    }
  }
});

document.getElementById('backEditarBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

document.getElementById('closeEditarBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

document.addEventListener('DOMContentLoaded', () => {
  loadOptions();
  loadMascotaData();
});