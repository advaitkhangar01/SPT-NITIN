/**
 * SHASHIKALA POWER TECH - Solar & Energy Solutions
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
 * SolarSquare-Style Interactive Solar Savings Estimator with Comprehensive Financial & Energy Metrics
 */
function initSolarEstimator() {
  const slider = document.getElementById('billSlider');
  const billDisplay = document.getElementById('billDisplay');
  const presetBtns = document.querySelectorAll('.preset-pill');

  // Metric displays
  const systemSizeVal = document.getElementById('calcSystemSize');
  const roofAreaVal = document.getElementById('calcRoofArea');
  const electricitySavedVal = document.getElementById('calcElectricitySaved');
  const moneySavedVal = document.getElementById('calcMoneySaved');
  const annualSavedVal = document.getElementById('calcAnnualSavings');
  const lifetimeSavedVal = document.getElementById('calcLifetimeSavings');

  // Before vs After comparison bar
  const barCurrentBill = document.getElementById('barCurrentBill');
  const barNewBill = document.getElementById('barNewBill');
  const barNewFill = document.getElementById('barNewFill');
  const barSavedAmount = document.getElementById('barSavedAmount');

  // Eco impact
  const calcCo2Saved = document.getElementById('calcCo2Saved');
  const calcTreesPlanted = document.getElementById('calcTreesPlanted');

  const estimatorBtn = document.getElementById('estimatorQuoteBtn');
  const reqTextarea = document.getElementById('requirementDetails');

  if (!slider) return;

  function updateCalculations() {
    const bill = parseInt(slider.value, 10);
    const min = parseInt(slider.min, 10) || 1500;
    const max = parseInt(slider.max, 10) || 15000;
    const percent = Math.min(100, Math.max(0, ((bill - min) / (max - min)) * 100));

    // Dynamic slider track fill
    slider.style.setProperty('--slider-progress', `${percent}%`);

    if (billDisplay) {
      billDisplay.textContent = `₹${bill.toLocaleString('en-IN')}`;
    }

    // Practical Maharashtra / Nagpur solar engineering metrics:
    // Avg domestic MSEDCL tariff ~ ₹8.5 - ₹9.5/unit.
    // 1 kW rooftop solar yields ~125-130 units/month in Nagpur's high solar insolation.
    // System capacity recommended:
    let kw = Math.round((bill / 1150) * 10) / 10;
    if (kw < 2) kw = 2.0;
    if (kw > 25) kw = 25.0;

    const monthlyUnits = Math.round(kw * 125);
    const roofSqFt = Math.round(kw * 95);

    // Grid-tied solar slashes 85-90% of electricity bill (retaining minimal fixed meter charges):
    const newBill = Math.max(300, Math.round(bill * 0.11));
    const monthlySavings = Math.max(0, bill - newBill);
    const annualSavings = monthlySavings * 12;
    const lifetimeSavingsLakhs = ((annualSavings * 25) / 100000).toFixed(1);

    // Eco impact: ~0.82 kg CO2 avoided per kWh in Indian grid
    const co2Tons = ((monthlyUnits * 12 * 0.82) / 1000).toFixed(1);
    const trees = Math.round(parseFloat(co2Tons) * 16);

    // Update 4-Metric Grid
    if (systemSizeVal) systemSizeVal.textContent = `${kw.toFixed(1)} kW`;
    if (roofAreaVal) roofAreaVal.textContent = `${roofSqFt} sq.ft`;
    if (electricitySavedVal) electricitySavedVal.textContent = `${monthlyUnits.toLocaleString('en-IN')} kWh`;
    if (moneySavedVal) moneySavedVal.textContent = `₹${monthlySavings.toLocaleString('en-IN')}/mo`;
    if (annualSavedVal) annualSavedVal.textContent = `₹${annualSavings.toLocaleString('en-IN')}/yr`;
    if (lifetimeSavedVal) lifetimeSavedVal.textContent = `₹${lifetimeSavingsLakhs} Lakhs`;

    // Update Comparison Visual Bar
    if (barCurrentBill) barCurrentBill.textContent = `₹${bill.toLocaleString('en-IN')}`;
    if (barNewBill) barNewBill.textContent = `₹${newBill.toLocaleString('en-IN')}`;
    if (barSavedAmount) barSavedAmount.textContent = `Save ₹${monthlySavings.toLocaleString('en-IN')}/mo (~89% OFF)`;
    if (barNewFill) {
      const newBillPercent = Math.max(10, Math.round((newBill / bill) * 100));
      barNewFill.style.width = `${newBillPercent}%`;
    }

    // Update Eco Impact
    if (calcCo2Saved) calcCo2Saved.textContent = `${co2Tons} Tons`;
    if (calcTreesPlanted) calcTreesPlanted.textContent = `${trees} Trees`;

    // Sync Preset Pills
    presetBtns.forEach(btn => {
      const pVal = parseInt(btn.dataset.val, 10);
      if (pVal === bill) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Preset pill click listeners
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.dataset.val, 10);
      if (!isNaN(val)) {
        slider.value = val;
        updateCalculations();
      }
    });
  });

  slider.addEventListener('input', updateCalculations);
  updateCalculations();

  if (estimatorBtn) {
    estimatorBtn.addEventListener('click', () => {
      const bill = slider.value;
      const kw = systemSizeVal ? systemSizeVal.textContent : '3.5 kW';
      const monthlySaved = moneySavedVal ? moneySavedVal.textContent : '';
      const unitsSaved = electricitySavedVal ? electricitySavedVal.textContent : '';
      const quoteSection = document.getElementById('quote');

      if (reqTextarea) {
        reqTextarea.value = `Monthly electricity bill: ₹${parseInt(bill, 10).toLocaleString('en-IN')}. Looking for a ~${kw} solar setup to save approx. ${unitsSaved} (${monthlySaved}) with net metering.`;
      }

      // Pre-select matching monthly bill bracket in contact form
      const billNum = parseInt(bill, 10);
      let targetBillVal = '₹2500 - ₹4000';
      if (billNum < 1500) {
        targetBillVal = 'Less than ₹1500';
      } else if (billNum <= 2500) {
        targetBillVal = '₹1500 - ₹2500';
      } else if (billNum <= 4000) {
        targetBillVal = '₹2500 - ₹4000';
      } else if (billNum <= 8000) {
        targetBillVal = '₹4000 - ₹8000';
      } else {
        targetBillVal = 'More than ₹8000';
      }

      const matchingRadio = document.querySelector(`input[name="monthlyBill"][value="${targetBillVal}"]`);
      if (matchingRadio) {
        matchingRadio.checked = true;
        matchingRadio.dispatchEvent(new Event('change'));
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
  const billRadioGroup = document.getElementById('billRadioGroup');
  const billRadios = form.querySelectorAll('input[name="monthlyBill"]');
  const billError = document.getElementById('billError');
  const propertySelect = document.getElementById('propertyType');
  const requirementInput = document.getElementById('requirementDetails');

  // Sync initial selection state if pre-checked
  updateBillSelectionStyles();

  [nameInput, phoneInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Radio button change listener
  billRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (billRadioGroup) billRadioGroup.classList.remove('error');
      if (billError) billError.style.display = 'none';
      updateBillSelectionStyles();
    });
  });

  function updateBillSelectionStyles() {
    const items = form.querySelectorAll('.bill-radio-item');
    items.forEach(item => {
      const radio = item.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

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
    const selectedBillInput = form.querySelector('input[name="monthlyBill"]:checked');
    const isBillValid = !!selectedBillInput;

    if (!isBillValid) {
      if (billRadioGroup) billRadioGroup.classList.add('error');
      if (billError) billError.style.display = 'block';
    } else {
      if (billRadioGroup) billRadioGroup.classList.remove('error');
      if (billError) billError.style.display = 'none';
    }

    if (!isNameValid) {
      nameInput.focus();
      return;
    }
    if (!isPhoneValid) {
      phoneInput.focus();
      return;
    }
    if (!isBillValid) {
      if (billRadioGroup) {
        billRadioGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
    const userPhone = encodeURIComponent(phoneInput.value.trim());
    const selectedBill = encodeURIComponent(selectedBillInput ? selectedBillInput.value : 'Not specified');
    const propType = encodeURIComponent(propertySelect ? propertySelect.value : 'Residential');
    const reqText = encodeURIComponent(requirementInput ? requirementInput.value.trim() : '');

    let waMessage = `Hello Shashikala Power Tech Team, I submitted a solar enquiry on your website:%0A• Name: ${userName}%0A• Phone: ${userPhone}%0A• Monthly Bill: ${selectedBill}%0A• Property: ${propType}`;
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
