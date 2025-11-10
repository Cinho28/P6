const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const InputValue = { email, password };
  const jsonValue = JSON.stringify(InputValue);
  const res = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonValue,
  });
  const data = await res.json();
  if (data.token === undefined) {
    alert("Erreur: Email ou Mot de passe incorrect");
    return;
  }
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.userId);
  window.location.href = "../index.html";
});
