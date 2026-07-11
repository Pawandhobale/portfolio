const typedText = document.querySelector('.typed-text');
const roles = ['Java Backend Systems', 'Spring Boot APIs', 'Scalable Web Products'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedText) return;
  const currentRole = roles[roleIndex];
  typedText.textContent = currentRole.slice(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex += 1;
    setTimeout(typeLoop, 95);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 55);
  } else {
    isDeleting = !isDeleting;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, 900);
  }
}

typeLoop();
