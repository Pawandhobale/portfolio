const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-card');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const year = document.getElementById('year');
const scrollTopButton = document.querySelector('.scroll-top');

if (year) {
  year.textContent = new Date().getFullYear();
}

const typedText = document.querySelector('.typed-text');
const roles = ['Java Backend Development', 'Spring Boot APIs', 'Full Stack Enthusiasm'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];
  typedText.textContent = currentRole.slice(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex += 1;
    setTimeout(typeLoop, 90);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 50);
  } else {
    isDeleting = !isDeleting;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, 900);
  }
}

if (typedText) {
  typeLoop();
}

menuToggle?.addEventListener('click', () => {
  navbar?.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navbar?.classList.remove('active');
    menuToggle?.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('sticky', window.scrollY > 20);
  scrollTopButton?.classList.toggle('visible', window.scrollY > 260);

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stat-number')) {
          animateCounter(entry.target);
        }
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));
statNumbers.forEach((number) => observer.observe(number));

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const duration = 1000;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = `${value}${target === 100 ? '%' : '+'}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = `${target}${target === 100 ? '%' : '+'}`;
    }
  }

  requestAnimationFrame(updateCounter);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const parentGroup = button.closest('.skills__filters') ? '.skills__filters' : '.project-filters';
    const groupButtons = document.querySelectorAll(`${parentGroup} .filter-btn`);
    groupButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const type = button.dataset.filter || button.dataset.projectFilter || 'all';

    if (parentGroup === '.skills__filters') {
      skillCards.forEach((card) => {
        const category = card.dataset.category || 'backend';
        card.style.display = type === 'all' || category === type ? 'block' : 'none';
      });
    } else {
      projectCards.forEach((card) => {
        const category = card.dataset.projectCategory || 'frontend';
        card.style.display = type === 'all' || category === type ? 'block' : 'none';
      });
    }
  });
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');

  if (name) {
    showToast(`Thanks ${name}! Your message is ready to send.`);
    contactForm.reset();
  }
});

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy || '';
    try {
      await navigator.clipboard.writeText(text);
      showToast('Location copied to clipboard');
    } catch {
      showToast('Copy failed. Please copy manually.');
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

scrollTopButton?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    navbar?.classList.remove('active');
  }
});