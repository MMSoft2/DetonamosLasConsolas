// Inicializar AOS
AOS.init({ duration: 1200, once: true });

// GSAP Animations en el Hero
gsap.from("#hero-title", {
  opacity: 0,
  y: -50,
  duration: 1.5,
  ease: "power3.out",
});
gsap.from("#hero-subtitle", {
  opacity: 0,
  y: 50,
  duration: 1.5,
  delay: 0.5,
  ease: "power3.out",
});

// Animación de aparición progresiva usando IntersectionObserver
const items = document.querySelectorAll(".media-item");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
items.forEach((item) => {
  item.style.transform = "translateY(30px)";
  observer.observe(item);
});

// Manejo del formulario con JS
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.textContent = "✅ Mensaje enviado con éxito. ¡Gracias por contactarme!";
      status.style.color = "lightgreen";
      form.reset();
    } else {
      status.textContent = "❌ Hubo un error al enviar el mensaje.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "⚠️ Error de conexión. Intenta de nuevo.";
    status.style.color = "orange";
  }
});
