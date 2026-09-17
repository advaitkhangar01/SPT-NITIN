/**
 * SHASHIKALAA POWERTECK - Solar & Energy Solutions
 * SolarSquare-Inspired Web Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initSolarEstimator();
  initFaqAccordion();
  initComponentHotspots();
  initLeadForm();
  initScrollSpy();
});

/**
 * Header Scroll Elevation
 */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-actions .btn');

  if (!hamburgerBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * SolarSquare-Style Interactive Solar Savings Estimator
 */
function initSolarEstimator() {
  const slider = document.getElementById('billSlider');
  const billDisplay = document.getElementById('billDisplay');
  const systemSizeVal = document.getElementById('calcSystemSize');
  const roofAreaVal = document.getElementById('calcRoofArea');
  const generationVal = document.getElementById('calcGeneration');
  const estimatorBtn = document.getElementById('estimatorQuoteBtn');
  const reqTextarea = document.getElementById('requirementDetails');

  if (!slider) return;

  function updateCalculations() {
    const bill = parseInt(slider.value, 10);
    billDisplay.textContent = `₹${bill.toLocaleString('en-IN')}`;

    // Practical Indian solar engineering formula:
    // Avg tariff ~ ₹8.5 - ₹9/unit in Maharashtra. 1 kW produces ~120-130 units/month.
    // 1 kW rooftop solar offsets approx. ₹1,000 - ₹1,200 of monthly bill.
    let kw = Math.round((bill / 1150) * 10) / 10;
    if (kw < 2) kw = 2.0;
    if (kw > 25) kw = 25.0;

    const roofSqFt = Math.round(kw * 95);
    const monthlyUnits = Math.round(kw * 125);

    systemSizeVal.textContent = `${kw.toFixed(1)} kW`;
    roofAreaVal.textContent = `${roofSqFt} sq.ft`;
    generationVal.textContent = `${monthlyUnits} units`;
  }

  slider.addEventListener('input', updateCalculations);
  updateCalculations();

  if (estimatorBtn) {
    estimatorBtn.addEventListener('click', () => {
      const bill = slider.value;
      const kw = systemSizeVal.textContent;
      const quoteSection = document.getElementById('quote');

      if (reqTextarea) {
        reqTextarea.value = `Monthly electricity bill is ₹${parseInt(bill, 10).toLocaleString('en-IN')}. Interested in a ~${kw} solar system with net metering.`;
      }

      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('fullName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  }
}

/**
 * Interactive Component Hotspots
 */
function initComponentHotspots() {
  const hotspots = document.querySelectorAll('.schematic-hotspot');
  const items = document.querySelectorAll('.component-item');

  if (!hotspots.length || !items.length) return;

  function highlight(index) {
    hotspots.forEach(h => {
      h.classList.toggle('active', h.getAttribute('data-target') === String(index));
    });
    items.forEach(it => {
      it.classList.toggle('active', it.getAttribute('data-index') === String(index));
    });
  }

  hotspots.forEach(hotspot => {
    const idx = hotspot.getAttribute('data-target');
    hotspot.addEventListener('mouseenter', () => highlight(idx));
    hotspot.addEventListener('click', () => highlight(idx));
  });

  items.forEach(item => {
    const idx = item.getAttribute('data-index');
    item.addEventListener('mouseenter', () => highlight(idx));
    item.addEventListener('click', () => highlight(idx));
  });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Lead Form Validation and Pre-filled WhatsApp Routing
 */
function initLeadForm() {
  const form = document.getElementById('solarLeadForm');
  const successState = document.getElementById('formSuccessState');
  const successWaBtn = document.getElementById('successWhatsAppBtn');

  if (!form) return;

  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phoneNumber');
  const propertySelect = document.getElementById('propertyType');
  const requirementInput = document.getElementById('requirementDetails');

  [nameInput, phoneInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  function validateField(input) {
    if (!input) return false;
    const val = input.value.trim();
    let isValid = true;

    if (input === nameInput) {
      isValid = val.length >= 2;
    } else if (input === phoneInput) {
      const digits = val.replace(/\D/g, '');
      const indianPhoneRegex = /^[6-9]\d{9}$/;
      const tenDigits = digits.length > 10 ? digits.slice(-10) : digits;
      isValid = indianPhoneRegex.test(tenDigits);
    }

    if (!isValid) {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
    return isValid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput);
    const isPhoneValid = validateField(phoneInput);

    if (!isNameValid) {
      nameInput.focus();
      return;
    }
    if (!isPhoneValid) {
      phoneInput.focus();
      return;
    }

    const submitBtn = form.querySelector('.form-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-right: 8px;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Processing Enquiry...
      `;
    }

    const userName = encodeURIComponent(nameInput.value.trim());
    const propType = encodeURIComponent(propertySelect ? propertySelect.value : 'Residential');
    const reqText = encodeURIComponent(requirementInput ? requirementInput.value.trim() : '');

    let waMessage = `Hello Nitin ji, I submitted a solar enquiry on Shashikalaa Powerteck:%0A• Name: ${userName}%0A• Property: ${propType}`;
    if (reqText) {
      waMessage += `%0A• Requirement: ${reqText}`;
    }

    if (successWaBtn) {
      successWaBtn.href = `https://wa.me/919527161595?text=${waMessage}`;
    }

    setTimeout(() => {
      form.style.display = 'none';
      if (successState) successState.style.display = 'block';
      successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 550);
  });
}

/**
 * ScrollSpy for Active Navigation Link
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}
