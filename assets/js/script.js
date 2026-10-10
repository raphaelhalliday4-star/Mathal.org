const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.main-nav');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (mobileToggle && nav) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  },
  {
    threshold: 0.16,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const scrollProgress = document.querySelector('.scroll-progress span');
let progressFrame = 0;

function updateScrollProgress() {
  if (!scrollProgress || progressFrame) {
    return;
  }

  progressFrame = requestAnimationFrame(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    progressFrame = 0;
  });
}

if (scrollProgress) {
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
}

const form = document.querySelector('.contact-form');

const supportModal = document.getElementById('support-modal');
const supportModalContent = document.getElementById('support-modal-content');
const supportCards = document.querySelectorAll('[data-support-card]');

if (supportModal && supportModalContent) {
  const openSupportModal = (card) => {
    const title = card.querySelector('h3')?.textContent || 'Support details';
    const tagline = card.querySelector('.support-tagline')?.textContent || '';
    const price = card.querySelector('.support-price')?.textContent || '';
    const fullContent = card.querySelector('.support-card__full-content');

    supportModalContent.innerHTML = `
      <h3>${title}</h3>
      ${tagline ? `<p class="support-tagline">${tagline}</p>` : ''}
      ${price ? `<p class="support-price">${price}</p>` : ''}
      ${fullContent ? fullContent.innerHTML : ''}
    `;

    supportModal.classList.add('is-open');
    supportModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeSupportModal = () => {
    supportModal.classList.remove('is-open');
    supportModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  supportCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        return;
      }

      openSupportModal(card);
    });

    const trigger = card.querySelector('.support-card__button');
    if (trigger) {
      trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        openSupportModal(card);
      });
    }
  });

  supportModal.addEventListener('click', (event) => {
    if (event.target.matches('[data-close-modal]') || event.target === supportModal) {
      closeSupportModal();
    }
  });

  const closeButton = supportModal.querySelector('.support-modal__close');
  if (closeButton) {
    closeButton.addEventListener('click', closeSupportModal);
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && supportModal.classList.contains('is-open')) {
      closeSupportModal();
    }
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert('Please complete the required fields before sending your message.');
      return;
    }

    alert('Thanks for reaching out. Mathal will get back to you soon.');
    form.reset();
  });
}
