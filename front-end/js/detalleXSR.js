async function loadDetalleMascota() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const errorMessage = document.getElementById('errorMessage');
  const detalleNombre = document.getElementById('detalleNombre');
  const detalleRaza = document.getElementById('detalleRaza');
  const detalleCategoria = document.getElementById('detalleCategoria');
  const detalleGenero = document.getElementById('detalleGenero');
  const detalleFoto = document.getElementById('detalleFoto');

  errorMessage.style.display = 'none';

  if (!id) {
    errorMessage.textContent = 'No se proporcionó un ID de mascota.';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/mascotaXSR/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const mascota = await response.json();

    // Llenar los campos con los datos de la mascota
    detalleNombre.textContent = mascota.nombre || 'No especificado';
    detalleRaza.textContent = mascota.razas?.name || 'Sin raza';
    detalleCategoria.textContent = mascota.categorias?.nombre || 'No especificado';
    detalleGenero.textContent = mascota.generos?.nombre || 'No especificado';
    detalleFoto.src = `http://localhost:3000${mascota.foto || '/imgs/default-pet.svg'}`;

  } catch (error) {
    console.error('Error al cargar los detalles:', error);
    errorMessage.textContent = 'Error al cargar los detalles de la mascota. Intenta de nuevo.';
    errorMessage.style.display = 'block';
  }
}

document.getElementById('closeDetalleBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

document.getElementById('backDetalleBtn').addEventListener('click', () => {
  window.location.href = '/mascotasXSR.html';
});

document.addEventListener('DOMContentLoaded', loadDetalleMascota);