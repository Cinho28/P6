const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const InputValue = {email, password};
    const jsonValue = JSON.stringify(InputValue);
    const res = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonValue
    });
    const data = await res.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);

    console.log("login ok");
    window.location.href = '../index.html';
  });
