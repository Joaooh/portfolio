/**
 * Lógica para alternar o tema (claro/escuro)
 */
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleMobile = document.querySelector(".theme-toggle-mobile");
const body = document.body;
const themeKey = "user-theme";

const applyTheme = (theme) => {
  if (theme === "light") {
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
  }
};

const toggleTheme = () => {
  const isLightTheme = body.classList.contains("light-theme");
  const newTheme = isLightTheme ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem(themeKey, newTheme);
};

themeToggle.addEventListener("click", toggleTheme);
themeToggleMobile.addEventListener("click", toggleTheme);


/**
 * Lógica para o menu mobile
 */
const setupMobileMenu = () => {
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!hamburgerBtn || !closeMenuBtn || !mobileMenu) return;

  // Função para abrir o menu
  const openMenu = () => body.classList.add('mobile-menu-open');
  // Função para fechar o menu
  const closeMenu = () => body.classList.remove('mobile-menu-open');

  hamburgerBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  
  // Fecha o menu ao clicar em um link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
};


/**
 * Lógica para copiar texto para a área de transferência
 */
const setupCopyToClipboard = () => {
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSelector = button.dataset.copyTarget;
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        navigator.clipboard
          .writeText(targetElement.innerText)
          .then(() => {
            button.classList.add("copied");
            setTimeout(() => button.classList.remove("copied"), 2000);
          })
          .catch((err) => console.error("Falha ao copiar texto: ", err));
      }
    });
  });
};


/**
 * Lógica para o botão "Voltar ao Topo"
 */
const setupBackToTopButton = () => {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
};


/**
 * Lógica para a animação de Fade-in das seções
 */
const setupScrollAnimation = () => {
  const sections = document.querySelectorAll('.fade-in-section');
  if (!sections.length) return;

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 150}ms`;
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
};


/**
 * Executa as funções quando o documento estiver pronto
 */
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem(themeKey) || "dark";
  applyTheme(savedTheme);

  setupMobileMenu(); // Ativa a funcionalidade do menu mobile
  setupCopyToClipboard();
  setupBackToTopButton();
  setupScrollAnimation();
});