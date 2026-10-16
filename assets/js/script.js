/* Bootstrap gestiona el menú y las pestañas. Añadimos el cierre del menú
   al navegar, el año y los controles del desplazamiento de proyectos. */
"use strict";

const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

// El enlace conserva su navegación por ancla. El botón de cierre existente
// solicita a Bootstrap que cierre el drawer con su animación y gestión del foco.
const navigation = document.querySelector("#navigation");
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navigation.open) navigation.querySelector(".btn-close").click();
  });
});

const track = document.querySelector("#project-track");
const cards = Array.from(track.querySelectorAll(".project-card"));
const controls = document.querySelector(".project-controls");
const previousButton = document.querySelector("#project-prev");
const nextButton = document.querySelector("#project-next");
const position = document.querySelector("#project-position");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// La distancia entre las dos primeras tarjetas incluye el espacio entre ellas.
function cardStep() {
  return cards[1].offsetLeft - cards[0].offsetLeft;
}

function updateControls() {
  const maxScroll = track.scrollWidth - track.clientWidth;
  controls.hidden = maxScroll <= 2;
  previousButton.disabled = track.scrollLeft <= 2;
  nextButton.disabled = track.scrollLeft >= maxScroll - 2;
  const current = Math.min(cards.length, Math.round(track.scrollLeft / cardStep()) + 1);
  const label = `${current} / ${cards.length}`;
  // Solo actualizar el anuncio cuando cambia la tarjeta, no en cada píxel.
  if (position.textContent !== label) position.textContent = label;
}

function moveCards(direction) {
  track.scrollBy({
    left: direction * cardStep(),
    behavior: reducedMotion.matches ? "instant" : "smooth"
  });
}

previousButton.addEventListener("click", () => moveCards(-1));
nextButton.addEventListener("click", () => moveCards(1));
track.addEventListener("scroll", updateControls, { passive: true });

// Las flechas solo se capturan cuando el propio carrusel tiene el foco.
track.addEventListener("keydown", (event) => {
  if (event.target !== track) return;
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    moveCards(event.key === "ArrowRight" ? 1 : -1);
  }
  if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    track.scrollTo({ left: event.key === "Home" ? 0 : track.scrollWidth,
      behavior: reducedMotion.matches ? "instant" : "smooth" });
  }
});

window.addEventListener("resize", updateControls);
updateControls();
