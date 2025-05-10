document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Redirigir a la vista de mascotas
      window.location.href = '/mascotasXSR.html';
    } else {
      errorMessage.style.display = 'block';
      errorMessage.textContent = data.error || 'Error al iniciar sesión';
    }
  } catch (error) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Error de conexión con el servidor';
    console.error('Error:', error);
  }
});