/* Bootstrap gestiona las pestañas y el drawer. El JS propio añade tema,
   cierre al navegar, año y controles para el carrusel de scroll nativo. */
"use strict";

// 1. Tema: este bloque se ejecuta en el <head>, antes de dibujar el contenido.
const themeKey = "marina-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let chosenTheme = null;

// Algunos navegadores bloquean el almacenamiento: el botón debe seguir funcionando.
try {
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === "light" || savedTheme === "dark") chosenTheme = savedTheme;
} catch {
  // Sin almacenamiento, la preferencia se conserva durante esta visita.
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeImages(theme);
  const button = document.querySelector("#theme-toggle");
  if (button) {
    button.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

// Cada imagen tiene dos rutas, pero solo un <img>. Su src inicial transparente
// evita descargar la variante clara si el tema guardado es oscuro.
function updateThemeImages(theme) {
  document
    .querySelectorAll("img[data-src-light][data-src-dark]")
    .forEach((image) => {
      const source =
        theme === "dark" ? image.dataset.srcDark : image.dataset.srcLight;
      if (image.getAttribute("src") !== source) image.src = source;
    });
}

applyTheme(chosenTheme || (systemTheme.matches ? "dark" : "light"));

systemTheme.addEventListener("change", (event) => {
  if (!chosenTheme) applyTheme(event.matches ? "dark" : "light");
});

// 2. Cada bloque comprueba sus elementos para poder funcionar por separado.
function initializeThemeButton() {
  const themeButton = document.querySelector("#theme-toggle");
  if (!themeButton) return;
  themeButton.hidden = false;
  applyTheme(document.documentElement.dataset.theme);
  themeButton.addEventListener("click", () => {
    chosenTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(chosenTheme);
    try {
      localStorage.setItem(themeKey, chosenTheme);
    } catch {
      // El cambio sigue activo aunque no se pueda recordar tras cerrar la página.
    }
  });
}

function initializeNavigation() {
  const navigation = document.querySelector("#navigation");
  const menuButton = document.querySelector(
    '.menu-toggle[aria-controls="navigation"]',
  );
  const closeButton = navigation?.querySelector(".btn-close");
  if (!navigation || !menuButton || !closeButton) return;

  let destinationAfterClose = null;

  // El atributo open del dialog es la fuente del estado real, también con Escape.
  function syncExpandedState() {
    menuButton.setAttribute("aria-expanded", String(navigation.open));
  }
  const menuStateObserver = new MutationObserver(syncExpandedState);
  menuStateObserver.observe(navigation, {
    attributes: true,
    attributeFilter: ["open"],
  });
  syncExpandedState();

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        !navigation.open ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const destination = document.getElementById(link.hash.slice(1));
      if (!destination) return;

      destinationAfterClose = destination;
      // El enlace conserva su navegación nativa; Bootstrap cierra el menú.
      closeButton.click();
    });
  });

  navigation.addEventListener("hidden.bs.drawer", () => {
    syncExpandedState();
    const destination = destinationAfterClose;
    destinationAfterClose = null;
    if (!destination) return;

    // Bootstrap restaura primero el foco del botón de apertura. Después lo
    // llevamos al apartado elegido, conservando el desplazamiento del enlace.
    requestAnimationFrame(() => {
      if (navigation.open || !destination.isConnected) return;
      if (!destination.hasAttribute("tabindex"))
        destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
    });
  });
}

function initializeProjects() {
  // 3. El HTML contiene los proyectos. Duplicar un article basta para añadir otro.
  const track = document.querySelector("#project-track");
  const controls = document.querySelector(".project-controls");
  const previousButton = document.querySelector("#project-prev");
  const nextButton = document.querySelector("#project-next");
  const position = document.querySelector("#project-position");
  if (!track || !controls || !previousButton || !nextButton || !position)
    return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function cards() {
    return Array.from(track.querySelectorAll(".project-card"));
  }

  function updateControls() {
    const items = cards();
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    controls.hidden = items.length === 0;
    previousButton.disabled = track.scrollLeft <= 2;
    nextButton.disabled = track.scrollLeft >= maxScroll - 2;
    // Se cuenta el tramo visible, también cuando caben varias tarjetas.
    const visible = items.filter(
      (card) =>
        card.offsetLeft + card.offsetWidth > track.scrollLeft + 2 &&
        card.offsetLeft < track.scrollLeft + track.clientWidth - 2,
    );
    const first = items.indexOf(visible[0]) + 1;
    const last = items.indexOf(visible[visible.length - 1]) + 1;
    const label =
      first === last
        ? `${first} / ${items.length}`
        : `${first}–${last} / ${items.length}`;
    if (position.textContent !== label) position.textContent = label;
  }

  function scrollToCard(left) {
    track.scrollTo({
      left,
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  }

  function moveCards(direction) {
    const items = cards();
    if (items.length === 0) return;
    const step =
      items.length > 1
        ? items[1].offsetLeft - items[0].offsetLeft
        : track.clientWidth;
    if (step <= 0) return;
    const current = Math.round(track.scrollLeft / step);
    scrollToCard((current + direction) * step);
  }

  previousButton.addEventListener("click", () => moveCards(-1));
  nextButton.addEventListener("click", () => moveCards(1));
  // El trackpad y el gesto táctil usan el desplazamiento nativo del navegador.
  // Con rueda vertical, Mayús + rueda permite recorrer el carrusel con ratón.
  track.addEventListener(
    "wheel",
    (event) => {
      if (!event.shiftKey || !event.deltaY || Math.abs(event.deltaX) > 0)
        return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      // La rueda puede expresar su distancia en píxeles, líneas o páginas.
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? track.clientWidth
            : 1;
      const next = Math.max(
        0,
        Math.min(maxScroll, track.scrollLeft + event.deltaY * unit),
      );
      if (next === track.scrollLeft) return;
      event.preventDefault();
      track.scrollLeft = next;
    },
    { passive: false },
  );

  track.addEventListener("keydown", (event) => {
    if (event.target !== track) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveCards(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      scrollToCard(event.key === "Home" ? 0 : track.scrollWidth);
    }
  });

  // Agrupar los anuncios evita que el lector de pantalla los repita al deslizar.
  let scrollTimer;
  track.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateControls, 120);
    },
    { passive: true },
  );
  new ResizeObserver(updateControls).observe(track);
  new MutationObserver(updateControls).observe(track, { childList: true });
  updateControls();
}

document.addEventListener("DOMContentLoaded", () => {
  updateThemeImages(document.documentElement.dataset.theme);
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  initializeThemeButton();
  initializeNavigation();
  initializeProjects();
});
