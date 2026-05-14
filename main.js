let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  const previousSlide = slides[currentSlide];
  const nextSlide = slides[index];
  
  // Reset previous slide elements
  gsap.set(previousSlide.querySelectorAll('.animate-element'), { opacity: 0, y: 30 });
  
  slides.forEach(slide => slide.classList.remove('active'));
  nextSlide.classList.add('active');
  currentSlide = index;
  
  // Footer visibility
  const container = document.querySelector('.presentation-container');
  if (index === 0 || index === slides.length - 1) {
    container.classList.add('hide-footer');
  } else {
    container.classList.remove('hide-footer');
  }

  // TRIGGER GSAP ANIMATIONS
  gsap.fromTo(nextSlide.querySelectorAll('.animate-element'), 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.4, 
      stagger: 0.05, 
      ease: "power2.out",
      delay: 0.1
    }
  );
}

// Initialize Lucide Icons
function initIcons() {
  lucide.createIcons();
}

// RESPONSIVE SCALING LOGIC
function handleResize() {
  const container = document.querySelector('.presentation-container');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  // Base resolution 1920x1080
  const scale = Math.min(windowWidth / 1920, windowHeight / 1080);
  
  container.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', () => {
  handleResize();
  initIcons();
  showSlide(0);
});
handleResize(); // Initial call

document.getElementById('nextBtn').addEventListener('click', () => {
  if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentSlide > 0) showSlide(currentSlide - 1);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
  }
  if (e.key === 'ArrowLeft') {
    if (currentSlide > 0) showSlide(currentSlide - 1);
  }
});

// SHIFT MODEL INTERACTION
document.querySelectorAll('.shift-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.shift-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    
    const info = item.getAttribute('data-info');
    const panel = document.getElementById('shift-details-panel');
    
    panel.style.opacity = 0;
    setTimeout(() => {
      panel.textContent = info;
      panel.style.opacity = 1;
    }, 200);
  });
});
