// ===== GLOBAL VARIABLES =====
let currentPage = 1;
const totalPages = 3;
let musicPlaying = false;

// ===== PAGE NAVIGATION =====
function nextPage(num) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show target page
  const targetPage = document.getElementById('page' + num);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = num;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update progress dots
    updateProgressDots(num);

    // Page specific actions
    if (num === 2) {
      setTimeout(dhamaka, 600);
    }
  }
}

// ===== UPDATE PROGRESS DOTS =====
function updateProgressDots(pageNum) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index < pageNum) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// ===== PAGE 1: MYSTERY BOX =====
function openBox() {
  // Confetti explosion
  const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFFFFF', '#FF007F'];

  confetti({
    particleCount: 200,
    spread: 180,
    origin: { y: 0.6 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2
  });

  // Secondary burst
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.6 },
      colors: colors
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.6 },
      colors: colors
    });
  }, 200);

  // Box shake effect
  const box = document.querySelector('.mystery-box');
  if (box) {
    box.style.animation = 'none';
    box.style.transform = 'scale(0.8) rotate(360deg)';
    setTimeout(() => {
      box.style.transform = 'scale(1.2) rotate(0deg)';
    }, 200);
  }

  // Navigate to page 2
  setTimeout(() => {
    nextPage(2);
  }, 1000);
}

// ===== PAGE 2: DHAMAKA CONFETTI =====
function dhamaka() {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FF007F'];

  // Continuous confetti
  (function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 65,
      origin: { x: 0 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.1
    });

    confetti({
      particleCount: 7,
      angle: 120,
      spread: 65,
      origin: { x: 1 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.1
    });

    // Center burst
    if (Math.random() > 0.5) {
      confetti({
        particleCount: 15,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: colors,
        startVelocity: 30
      });
    }

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();

  // Fireworks effect
  setTimeout(() => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        colors: colors
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, 500);
}

// ===== PAGE 3: PLAY SONG =====
function playSong() {
  const music = document.getElementById('bgMusic');

  if (!music) {
    alert('🎵 Gaana file nahi mili bhai!');
    return;
  }

  if (!musicPlaying) {
    music.volume = 0.6;
    music.play().then(() => {
      musicPlaying = true;

      // Heart confetti
      const colors = ['#FF69B4', '#FF1493', '#FFB6C1'];
      const heartShapes = confetti.shapeFromPath({
        path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -54,57 -151,127 -96,-70 -151,-51 -151,-127 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
        matrix: [0.033, 0, 0, 0.033, -5.52, -5.52]
      });

      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
        colors: colors,
        shapes: [heartShapes],
        scalar: 2
      });

      // Success message
      showToast('🎵 Heeriye baj raha hai... Enjoy! ❤️');

    }).catch(err => {
      console.error('Music play error:', err);
      showToast('⚠️ Gaana play nahi ho raha. File check kar!');
    });
  } else {
    music.pause();
    music.currentTime = 0;
    musicPlaying = false;
    showToast('⏸️ Gaana band kar diya');
  }
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  // Create toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: linear-gradient(135deg, #FF69B4, #FF1493);
    color: white;
    padding: 18px 35px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.1rem;
    box-shadow: 0 10px 40px rgba(255, 105, 180, 0.6);
    z-index: 9999;
    animation: toastSlide 0.5s ease forwards;
    font-family: 'Poppins', sans-serif;
  `;

  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.5s ease forwards';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Add toast animations to document
const style = document.createElement('style');
style.textContent = `
  @keyframes toastSlide {
    to { transform: translateX(-50%) translateY(0); }
  }
  @keyframes toastSlideOut {
    to { transform: translateX(-50%) translateY(100px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ===== AUTO CONFETTI ON LOAD =====
window.addEventListener('load', () => {
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FFB6C1', '#FFFFFF'],
      shapes: ['circle'],
      scalar: 1.1
    });
  }, 800);

  // Welcome sparkle
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 360,
      origin: { x: 0.5, y: 0.3 },
      colors: ['#FFD700', '#FF69B4'],
      shapes: ['star'],
      scalar: 1.5
    });
  }, 1500);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentPage < totalPages) {
    nextPage(currentPage + 1);
  } else if (e.key === 'ArrowLeft' && currentPage > 1) {
    nextPage(currentPage - 1);
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    if (currentPage === 1) openBox();
    else if (currentPage === 2) dhamaka();
    else if (currentPage === 3) playSong();
  }
});

// ===== TOUCH SWIPE SUPPORT =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && currentPage < totalPages) {
      // Swipe left - next page
      nextPage(currentPage + 1);
    } else if (diff < 0 && currentPage > 1) {
      // Swipe right - previous page
      nextPage(currentPage - 1);
    }
  }
}

// ===== PREVENT DOUBLE TAP ZOOM =====
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// ===== CONSOLE EASTER EGG =====
console.log('%c🎂 Happy Birthday Harshita! 🎂', 'color: #FF1493; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.5);');
console.log('%cMade with 💗 by Piyush', 'color: #FF69B4; font-size: 16px; font-weight: 600;');
console.log('%cSwipe or use arrow keys to navigate →', 'color: #FFB6C1; font-size: 14px;');

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Error caught:', e.message);
});

// ===== PERFORMANCE OPTIMIZATION =====
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.loading = 'lazy';
  });
}

console.log('✅ Script loaded successfully!');
