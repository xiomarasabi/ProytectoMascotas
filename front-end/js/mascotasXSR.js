async function loadMascotas() {
  const mascotasList = document.getElementById('mascotasList');
  const errorMessage = document.getElementById('errorMessage');
  mascotasList.innerHTML = '';
  errorMessage.style.display = 'none';

  try {
    const response = await fetch('http://localhost:3000/mascotaXSR', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const mascotas = await response.json();
    if (mascotas.length === 0) {
      mascotasList.innerHTML = '<p class="no-mascotas">No hay mascotas registradas.</p>';
      return;
    }

    mascotas.forEach(mascota => {
      const card = document.createElement('div');
      card.className = 'mascota-card';
      card.innerHTML = `
        <div class="mascota-info">
          <img src="http://localhost:3000${mascota.foto || '/imgs/default-pet.svg'}" alt="${mascota.nombre}" class="mascota-img">
          <div class="mascota-details">
            <h3>${mascota.nombre}</h3>
            <p>${mascota.razas?.name || 'Sin raza'}</p>
          </div>
        </div>
        <div class="actions">
          <button class="view-btn" data-id="${mascota.id}">
            <img src="/imgs/btn-show.svg" alt="Ver Detalles">
          </button>
          <button class="edit-btn" data-id="${mascota.id}">
            <img src="/imgs/btn-edit.svg" alt="Editar">
          </button>
          <button class="delete-btn" data-id="${mascota.id}">
            <img src="/imgs/btn-delete.svg" alt="Eliminar">
          </button>
        </div>
      `;
      mascotasList.appendChild(card);
    });

    // Evento para el botón "Ver Detalles"
    document.querySelectorAll('.view-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.location.href = `/detalleXSR.html?id=${id}`;
      });
    });

    // Evento para el botón "Editar"
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.location.href = `/editarXSR.html?id=${id}`;
      });
    });

    // Evento para el botón "Eliminar"
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
          try {
            const response = await fetch(`http://localhost:3000/mascotaXSR/${id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
            if (response.ok) {
              alert('Mascota eliminada correctamente');
              loadMascotas(); // Recargar la lista
            } else {
              throw new Error('Error al eliminar la mascota');
            }
          } catch (error) {
            errorMessage.textContent = 'Error al eliminar la mascota.';
            errorMessage.style.display = 'block';
          }
        }
      });
    });
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    errorMessage.textContent = 'Error al cargar las mascotas. Intenta de nuevo.';
    errorMessage.style.display = 'block';
  }
}

document.getElementById('closeMascotasBtn').addEventListener('click', () => {
  window.location.href = '/indexXSR.html';
});

document.getElementById('addMascotaBtn').addEventListener('click', () => {
  window.location.href = '/agregarXSR.html';
});

document.addEventListener('DOMContentLoaded', loadMascotas);