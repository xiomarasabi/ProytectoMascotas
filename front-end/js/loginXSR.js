document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = '/mascotasXSR.html';
    } else {
      errorMessage.textContent = data.error || 'Error al iniciar sesión';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    errorMessage.textContent = 'Error de conexión con el servidor';
    errorMessage.style.display = 'block';
    console.error('Error:', error);
  }
});