async function loadOptions() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token. Por favor, inicia sesión.');
    }

    const [razas, categorias, generos, usuarios] = await Promise.all([
      fetch('http://localhost:3000/razaXSR', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        if (res.status === 401) {
          throw new Error('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
        }
        if (!res.ok) throw new Error(`Error en razaXSR: ${res.status}`);
        return res.json();
      }),
      fetch('http://localhost:3000/categoriaXSR', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        if (res.status === 401) {
          throw new Error('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
        }
        if (!res.ok) throw new Error(`Error en categoriaXSR: ${res.status}`);
        return res.json();
      }),
      fetch('http://localhost:3000/generoXSR', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        if (res.status === 401) {
          throw new Error('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
        }
        if (!res.ok) throw new Error(`Error en generoXSR: ${res.status}`);
        return res.json();
      }),
      fetch('http://localhost:3000/usuarioXSR', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        if (res.status === 401) {
          throw new Error('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
        }
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
      option.textContent = raza.name || raza.nombre;
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
    document.getElementById('errorMessage').textContent = error.message || 'Error al cargar opciones.';
    document.getElementById('errorMessage').style.display = 'block';
    if (error.message.includes('Token inválido o expirado')) {
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/indexXSR.html';
      }, 2000);
    }
  }
}

document.getElementById('agregarForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const raza_id = document.getElementById('raza').value;
  const categoria_id = document.getElementById('categoria').value;
  const foto = document.getElementById('foto').files[0];
  const genero_id = document.getElementById('genero').value;
  const usuario_id = document.getElementById('usuario').value;
  const estado = document.getElementById('estado').value;
  const errorMessage = document.getElementById('errorMessage');

  if (!nombre || !raza_id || !categoria_id || !foto || !genero_id || !usuario_id || !estado) {
    errorMessage.textContent = 'Todos los campos son obligatorios.';
    errorMessage.style.display = 'block';
    return;
  }

  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('raza_id', raza_id);
  formData.append('categoria_id', categoria_id);
  formData.append('foto', foto);
  formData.append('genero_id', genero_id);
  formData.append('usuario_id', usuario_id);
  formData.append('estado', estado);

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      errorMessage.textContent = 'Debes iniciar sesión para agregar una mascota.';
      errorMessage.style.display = 'block';
      return;
    }

    const response = await fetch('http://localhost:3000/mascotaXSR', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    const data = await response.json();
    if (response.status === 401) {
      throw new Error('Token inválido o expirado. Por favor, inicia sesión de nuevo.');
    }
    if (response.ok) {
      alert('Mascota creada correctamente');
      window.location.href = '/mascotasXSR.html';
    } else {
      errorMessage.textContent = data.error || 'Error al crear la mascota';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    errorMessage.textContent = error.message || 'Error de conexión con el servidor.';
    errorMessage.style.display = 'block';
    console.error('Error:', error);
    if (error.message.includes('Token inválido o expirado')) {
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/indexXSR.html';
      }, 2000);
    }
  }
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

document.getElementById('closeBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

document.addEventListener('DOMContentLoaded', loadOptions);