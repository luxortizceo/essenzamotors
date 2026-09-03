// Hero — see cinema-hero.js for the scroll-driven multi-vehicle experience.

// ---------- Persistent site nav (appears once the hero has scrolled past) ----------
(() => {
  const nav = document.getElementById('siteNav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;

  let ticking = false;
  const check = () => {
    ticking = false;
    const heroGone = hero.getBoundingClientRect().bottom <= 0;
    nav.classList.toggle('is-visible', heroGone);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    },
    { passive: true }
  );
  check();
})();

// ---------- Mobile nav toggle ----------
(() => {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
})();

// ---------- Scroll reveal for every section ----------
(() => {
  const targets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
})();

// ---------- 2. Showroom — animated counters ----------
(() => {
  const numbers = document.querySelectorAll('.stat__number');
  if (!numbers.length) return;
  // Real values are already the static HTML content; skip the count-up
  // flourish for reduced-motion users, the number itself stays correct.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  numbers.forEach((el) => observer.observe(el));
})();

// Fallback cuando un vehículo (nuevo, recién capturado en el admin) todavía
// no tiene fotos, o cuando la primera foto de su galería no carga — evita el
// bloque de "vehículo destacado"/carrusel con imagen rota.
const VEHICLE_IMG_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
      '<rect width="800" height="600" fill="#0a0a0c"/>' +
      '<text x="400" y="300" font-family="Inter, sans-serif" font-size="26" fill="#8b8f96" text-anchor="middle" dominant-baseline="middle">Foto próximamente</text>' +
      '</svg>'
  );
const vehicleCoverImage = (v) => (v.galeria && v.galeria[0]) || VEHICLE_IMG_PLACEHOLDER;

// ---------- 3. Inventory — data + 3D showroom carousel ----------
// Vehículos reales del showroom. Los campos marcados con null (precio, km,
// rines) no fueron proporcionados por ESSENZA para esa unidad y no deben
// inventarse — se muestran como "Consultar" hasta confirmarse.
let ESSENZA_INVENTORY = [
  {
    marca: 'Lamborghini',
    modelo: 'Urus',
    anio: 2023,
    tipo: 'SUV performance',
    km: 9000,
    precio: 6300000,
    motor: 'V8 4.0L Biturbo',
    potencia: '650 hp',
    transmision: 'Automática',
    traccion: 'AWD',
    rines: 'Rin 23"',
    colorExterior: 'Negro',
    colorInterior: 'Negro (piel con costuras naranjas)',
    estatus: 'Disponible',
    galeria: [
      'assets/inventory/urus/urus-01-frontal.jpg',
      'assets/inventory/urus/urus-02-frontal-b.jpg',
      'assets/inventory/urus/urus-03-frontal-recta.jpg',
      'assets/inventory/urus/urus-04-perfil.jpg',
      'assets/inventory/urus/urus-05-trasera-a.jpg',
      'assets/inventory/urus/urus-06-trasera-b.jpg',
      'assets/inventory/urus/urus-07-interior-tablero.jpg',
      'assets/inventory/urus/urus-08-interior-cabina.jpg',
      'assets/inventory/urus/urus-09-asientos-traseros.jpg',
    ],
  },
  {
    marca: 'Jaguar',
    modelo: 'F-TYPE P300 R-Dynamic First Edition',
    anio: 2021,
    tipo: 'Deportivo',
    km: 18000,
    precio: null,
    motor: '4 cil.',
    potencia: '300 hp',
    transmision: 'Automática',
    traccion: 'Trasera',
    rines: 'Rin 20"',
    audio: 'Meridian',
    colorExterior: 'Rojo',
    colorInterior: 'Negro (piel/gamuza)',
    estatus: 'Disponible',
    galeria: [
      'assets/inventory/jaguar/jaguar-01-frontal.jpg',
      'assets/inventory/jaguar/jaguar-02-frontal-b.jpg',
      'assets/inventory/jaguar/jaguar-03-perfil-trasera.jpg',
      'assets/inventory/jaguar/jaguar-04-trasera.jpg',
      'assets/inventory/jaguar/jaguar-05-trasera-recta.jpg',
      'assets/inventory/jaguar/jaguar-06-interior-tablero.jpg',
      'assets/inventory/jaguar/jaguar-07-interior-asientos.jpg',
      'assets/inventory/jaguar/jaguar-08-detalle-audio.jpg',
    ],
  },
  {
    marca: 'Mercedes-AMG',
    modelo: 'GT R',
    anio: 2020,
    tipo: 'Deportivo',
    km: 3800,
    precio: null,
    motor: 'V8 Biturbo',
    potencia: '585 hp',
    transmision: 'AMG SPEEDSHIFT DCT 7 vel.',
    traccion: 'Trasera',
    rines: null,
    colorExterior: 'Gris',
    colorInterior: 'Negro (piel, Alcantara)',
    estatus: 'Disponible',
    galeria: [
      'assets/inventory/mercedes/mercedes-01-frontal.jpg',
      'assets/inventory/mercedes/mercedes-02-frontal-b.jpg',
      'assets/inventory/mercedes/mercedes-03-frontal-recta.jpg',
      'assets/inventory/mercedes/mercedes-04-perfil-a.jpg',
      'assets/inventory/mercedes/mercedes-05-perfil-b.jpg',
      'assets/inventory/mercedes/mercedes-06-trasera-lateral.jpg',
      'assets/inventory/mercedes/mercedes-07-trasera-recta.jpg',
      'assets/inventory/mercedes/mercedes-08-detalle-toldera.jpg',
      'assets/inventory/mercedes/mercedes-09-interior-tablero.jpg',
      'assets/inventory/mercedes/mercedes-10-interior-asientos.jpg',
    ],
  },
  {
    marca: 'Bentley',
    modelo: 'Continental GT Speed',
    anio: 2014,
    tipo: 'Gran Turismo',
    km: 24000,
    precio: 3100000,
    motor: '6.0L W12 Biturbo',
    potencia: '635 hp',
    transmision: 'Automática 8 vel.',
    traccion: 'AWD',
    rines: null,
    audio: 'Naim for Bentley (11 altavoces)',
    colorExterior: 'Naranja',
    colorInterior: 'Azul (piel)',
    estatus: 'Disponible',
    galeria: [
      'assets/inventory/bentley/bentley-01-frontal.jpg',
      'assets/inventory/bentley/bentley-02-frontal-lateral.jpg',
      'assets/inventory/bentley/bentley-03-perfil.jpg',
      'assets/inventory/bentley/bentley-04-trasera-lateral.jpg',
      'assets/inventory/bentley/bentley-05-trasera.jpg',
      'assets/inventory/bentley/bentley-06-frontal-b.jpg',
      'assets/inventory/bentley/bentley-07-interior-tablero.jpg',
      'assets/inventory/bentley/bentley-08-volante.jpg',
      'assets/inventory/bentley/bentley-09-asientos.jpg',
      'assets/inventory/bentley/bentley-10-palanca.jpg',
      'assets/inventory/bentley/bentley-11-odometro.jpg',
    ],
  },
  {
    marca: 'Lamborghini',
    modelo: 'Gallardo Spyder',
    anio: null,
    tipo: 'Deportivo',
    km: 72140,
    precio: null,
    motor: '5.2L V10 (dato de fábrica del modelo, versión por confirmar)',
    potencia: '~560 hp (dato de fábrica del modelo)',
    transmision: 'e-gear automatizada (modos Sport/Corsa)',
    traccion: null,
    rines: null,
    colorExterior: 'Blanco',
    colorInterior: 'Negro (piel)',
    estatus: 'Disponible',
    galeria: [
      'assets/inventory/gallardo/gallardo-01-frontal.jpg',
      'assets/inventory/gallardo/gallardo-02-frontal-b.jpg',
      'assets/inventory/gallardo/gallardo-03-frontal-c.jpg',
      'assets/inventory/gallardo/gallardo-04-frontal-recta.jpg',
      'assets/inventory/gallardo/gallardo-05-trasera.jpg',
      'assets/inventory/gallardo/gallardo-06-trasera-detalle.jpg',
      'assets/inventory/gallardo/gallardo-07-interior-tablero.jpg',
      'assets/inventory/gallardo/gallardo-08-interior-volante.jpg',
    ],
  },
];

function initShowroomCarousel() {
  const carousel = document.getElementById('showroomCarousel');
  const stage = document.getElementById('carouselStage');
  const ring = document.getElementById('carouselRing');
  const panel = document.getElementById('carouselPanel');
  const dotsEl = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const emptyEl = document.getElementById('inventoryEmpty');
  if (!carousel || !stage || !ring || !panel || !dotsEl) return;

  const { t, tv } = window.essenzaI18n;

  const money = (n) => (n == null ? t('inventory.consultarPrecio') : '$' + n.toLocaleString('es-MX') + ' MXN');
  const kmLabel = (v) => (v == null ? t('inventory.consultarKm') : v.toLocaleString('es-MX') + ' km');

  const specLine = (v) =>
    [v.anio, kmLabel(v.km), tv(v.motor), tv(v.potencia), tv(v.traccion), tv(v.rines)].filter(Boolean).join(' · ');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ANGLE_STEP = 38; // degrees between neighboring vehicles on the orbit

  let list = ESSENZA_INVENTORY.slice();
  let currentIndex = 0;
  let rotationSteps = 0; // continuous float position along the orbit (0..list.length-1)
  let radius = 320;
  let tweenState = { v: 0 };
  let currentTween = null;

  let dragging = false;
  let dragMoved = false;
  let dragStartX = 0;
  let dragStartRotation = 0;
  let lastMoveX = 0;
  let lastMoveTime = 0;
  let velocity = 0; // px per ms

  const STEP_PX = 160;
  const clampIndex = (i) => Math.max(0, Math.min(list.length - 1, i));

  const rubberBand = (v) => {
    const min = 0;
    const max = list.length - 1;
    if (v < min) return min - (min - v) * 0.28;
    if (v > max) return max + (v - max) * 0.28;
    return v;
  };

  const measure = () => {
    const rect = stage.getBoundingClientRect();
    const cardW = Math.max(270, Math.min(rect.width * 0.45, 510));
    const cardH = cardW * 0.72;
    radius = cardW * 1.12;
    stage.style.setProperty('--card-w', cardW + 'px');
    stage.style.setProperty('--card-h', cardH + 'px');
    render();
  };

  const render = () => {
    const cars = ring.children;
    for (let i = 0; i < cars.length; i += 1) {
      const car = cars[i];
      const angle = i * ANGLE_STEP;
      const diff = i - rotationSteps;
      const closeness = Math.max(0, 1 - Math.min(Math.abs(diff), 2) / 2);
      const scale = 0.6 + 0.4 * closeness;
      const opacity = 0.32 + 0.68 * closeness;
      const brightness = 0.45 + 0.55 * closeness;
      const lift = closeness * 16;
      car.style.transform =
        `translate(-50%, -50%) translateY(${-lift}px) rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`;
      car.style.opacity = String(opacity);
      // brightness only — a blur filter on a 3D-transformed element is expensive to
      // rasterize and was causing dropped frames the first time this section scrolled
      // into view, so depth is conveyed via scale/opacity/perspective instead.
      car.style.filter = `brightness(${brightness})`;
      car.classList.toggle('is-active', Math.abs(diff) < 0.02);
      car.setAttribute('aria-hidden', closeness < 0.05 ? 'true' : 'false');
    }
    ring.style.transform = `rotateY(${-rotationSteps * ANGLE_STEP}deg)`;
  };

  const renderDots = () => {
    dotsEl.innerHTML = list
      .map(
        (v, i) =>
          `<button type="button" class="showroom-carousel__dot${i === currentIndex ? ' is-active' : ''}" data-index="${i}" aria-label="${t('inventory.dotAria')} ${v.marca} ${v.modelo}"></button>`
      )
      .join('');
  };

  const renderPanel = () => {
    const v = list[currentIndex];
    if (!v) {
      panel.innerHTML = '';
      return;
    }
    panel.innerHTML = `
      <span class="showroom-carousel__brand">${v.marca}</span>
      <h3 class="showroom-carousel__name">${v.modelo}</h3>
      <p class="showroom-carousel__specline">${specLine(v)}</p>
      <p class="showroom-carousel__colors">${t('inventory.exterior')} ${tv(v.colorExterior)} · ${t('inventory.interior')} ${tv(v.colorInterior)}</p>
      <p class="showroom-carousel__price">${money(v.precio)}</p>
      <div class="showroom-carousel__actions">
        <button type="button" class="btn btn--primary" data-action="gallery">${t('inventory.verGaleria')}</button>
        <a class="btn btn--ghost" href="#experiencia">${t('inventory.reservarCita')}</a>
        <a class="btn btn--ghost" target="_blank" rel="noopener"
           href="https://wa.me/524774492547?text=${encodeURIComponent(`Hola, me interesa el ${v.marca} ${v.modelo}.`)}">WhatsApp</a>
      </div>
    `;
  };

  const openGallery = (i) => {
    const v = list[i];
    if (v) window.essenzaOpenVehicleModal(v, money, kmLabel);
  };

  panel.addEventListener('click', (event) => {
    if (event.target.closest('[data-action="gallery"]')) openGallery(currentIndex);
  });

  const settle = (index) => {
    currentIndex = clampIndex(index);
    rotationSteps = currentIndex;
    renderDots();
    renderPanel();
    render();
  };

  const goTo = (index) => {
    index = clampIndex(index);
    if (currentTween && currentTween.kill) currentTween.kill();
    if (typeof gsap !== 'undefined') {
      tweenState.v = rotationSteps;
      currentTween = gsap.to(tweenState, {
        v: index,
        duration: reducedMotion ? 0.01 : 0.7,
        ease: 'power3.out',
        onUpdate: () => {
          rotationSteps = tweenState.v;
          render();
        },
        onComplete: () => settle(index),
      });
    } else {
      settle(index);
    }
  };

  const buildCars = () => {
    ring.innerHTML = list
      .map(
        (v, i) => `
      <div class="showroom-carousel__car" data-index="${i}" role="button" tabindex="-1" aria-label="${v.marca} ${v.modelo}">
        <span class="showroom-carousel__reflection" aria-hidden="true"></span>
        <div class="showroom-carousel__frame">
          <img src="${vehicleCoverImage(v)}" alt="${v.marca} ${v.modelo}" loading="lazy" onerror="this.onerror=null;this.src='${VEHICLE_IMG_PLACEHOLDER}';" />
          <span class="showroom-carousel__status">${tv(v.estatus)}</span>
        </div>
      </div>`
      )
      .join('');

    [...ring.children].forEach((car) => {
      car.addEventListener('click', () => {
        if (dragMoved) return;
        const i = Number(car.dataset.index);
        if (i === currentIndex) openGallery(i);
        else goTo(i);
      });
    });
  };

  const applyFilters = () => {
    const marca = document.getElementById('filterMarca').value;
    const tipo = document.getElementById('filterTipo').value;
    const disponibilidad = document.getElementById('filterDisponibilidad').value;
    const precioRange = document.getElementById('filterPrecio').value.split('-').map(Number);

    list = ESSENZA_INVENTORY.filter((v) => {
      if (marca && v.marca !== marca) return false;
      if (tipo && v.tipo !== tipo) return false;
      if (disponibilidad && v.estatus !== disponibilidad) return false;
      if (precioRange.length === 2) {
        if (v.precio == null) return false;
        if (v.precio < precioRange[0] || v.precio > precioRange[1]) return false;
      }
      return true;
    });

    carousel.hidden = list.length === 0;
    if (emptyEl) emptyEl.hidden = list.length !== 0;
    if (!list.length) return;

    buildCars();
    currentIndex = 0;
    rotationSteps = 0;
    measure();
    renderDots();
    renderPanel();
  };

  ['filterMarca', 'filterTipo', 'filterPrecio', 'filterDisponibilidad'].forEach((id) => {
    document.getElementById(id).addEventListener('change', applyFilters);
  });

  // ---- Pointer drag (mouse + touch) ----
  // Deliberately not using setPointerCapture: capturing on the stage
  // retargets the synthetic 'click' event to the stage itself, which
  // silently swallows clicks on cars/arrows underneath the pointer.
  // Tracking the drag via window-level listeners avoids that.
  const onPointerMove = (event) => {
    if (!dragging) return;
    const dx = event.clientX - dragStartX;
    if (Math.abs(dx) > 6) dragMoved = true;
    rotationSteps = rubberBand(dragStartRotation - dx / STEP_PX);
    const now = performance.now();
    const dt = now - lastMoveTime;
    if (dt > 0) velocity = (event.clientX - lastMoveX) / dt;
    lastMoveX = event.clientX;
    lastMoveTime = now;
    render();
  };

  const onPointerUp = () => {
    if (!dragging) return;
    dragging = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);
    const stepsVelocity = -velocity / STEP_PX;
    const momentum = Math.max(-1, Math.min(1, stepsVelocity * 55));
    goTo(Math.round(clampIndex(rotationSteps + momentum)));
  };

  stage.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.showroom-carousel__arrow')) return;
    dragging = true;
    dragMoved = false;
    dragStartX = event.clientX;
    dragStartRotation = rotationSteps;
    lastMoveX = event.clientX;
    lastMoveTime = performance.now();
    velocity = 0;
    if (currentTween && currentTween.kill) currentTween.kill();
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  });

  // ---- Mouse wheel (only while the pointer is over the carousel) ----
  let wheelCooldown = false;
  stage.addEventListener(
    'wheel',
    (event) => {
      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 6) return;
      event.preventDefault();
      if (wheelCooldown) return;
      wheelCooldown = true;
      setTimeout(() => {
        wheelCooldown = false;
      }, 420);
      goTo(currentIndex + (delta > 0 ? 1 : -1));
    },
    { passive: false }
  );

  // ---- Keyboard ----
  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(currentIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(currentIndex - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGallery(currentIndex);
    }
  });

  // ---- Arrows + pagination dots ----
  prevBtn?.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goTo(currentIndex + 1));
  dotsEl.addEventListener('click', (event) => {
    const dot = event.target.closest('.showroom-carousel__dot');
    if (dot) goTo(Number(dot.dataset.index));
  });

  // ---- Scroll-in reveal: establish depth without hijacking scroll ----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        carousel.classList.add('is-revealed');
        if (!reducedMotion) {
          if (typeof gsap !== 'undefined') {
            tweenState.v = rotationSteps + 0.4;
            gsap.fromTo(
              tweenState,
              { v: rotationSteps + 0.4 },
              {
                v: rotationSteps,
                duration: 1.1,
                ease: 'power2.out',
                onUpdate: () => {
                  rotationSteps = tweenState.v;
                  render();
                },
              }
            );
          }
        }
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.25 }
  );
  revealObserver.observe(carousel);

  window.addEventListener('resize', () => {
    clearTimeout(window.__essenzaCarouselResize);
    window.__essenzaCarouselResize = setTimeout(measure, 150);
  });

  document.addEventListener('essenza:langchange', () => {
    renderPanel();
    renderDots();
    [...ring.children].forEach((car, i) => {
      const statusEl = car.querySelector('.showroom-carousel__status');
      if (statusEl && list[i]) statusEl.textContent = tv(list[i].estatus);
    });
  });

  applyFilters();
}

// ---------- 3c. Featured vehicle — real inventory data only, never invented ----------
function initFeaturedVehicle() {
  const section = document.getElementById('destacado');
  if (!section) return;

  // The Urus is the only unit with a fully confirmed price, so it makes the
  // most honest "featured" pick — swap the index if a different confirmed
  // vehicle should headline instead.
  const vehicle = ESSENZA_INVENTORY[0];
  if (!vehicle) {
    section.hidden = true;
    return;
  }

  const { t, tv } = window.essenzaI18n;
  const money = (n) => (n == null ? t('inventory.consultarPrecio') : '$' + n.toLocaleString('es-MX') + ' MXN');

  const img = document.getElementById('featuredImg');
  const brandEl = document.getElementById('featuredBrand');
  const modelEl = document.getElementById('featuredModel');
  const specEl = document.getElementById('featuredSpec');
  const ctaBtn = document.getElementById('featuredCta');

  const render = () => {
    img.src = vehicleCoverImage(vehicle);
    img.onerror = () => {
      img.onerror = null;
      img.src = VEHICLE_IMG_PLACEHOLDER;
    };
    img.alt = `${vehicle.marca} ${vehicle.modelo}`;
    brandEl.textContent = vehicle.marca;
    modelEl.textContent = vehicle.modelo;
    specEl.textContent = [vehicle.anio, tv(vehicle.potencia), tv(vehicle.traccion), money(vehicle.precio)]
      .filter(Boolean)
      .join(' · ');
  };
  render();
  document.addEventListener('essenza:langchange', render);

  ctaBtn.addEventListener('click', () => {
    if (window.essenzaOpenVehicleModal) window.essenzaOpenVehicleModal(vehicle, money, (v) => (v == null ? t('inventory.consultarKm') : v.toLocaleString('es-MX') + ' km'));
  });
}

// ---------- 3b/3c bootstrap — try Supabase first, fall back to the data above ----------
// Keeps the rest of the page (nav, menu, reveal animations, forms) unblocked;
// only the carousel and featured section wait on this one request.
(async () => {
  const SUPABASE_URL = 'https://hoijdsbztoupcdkbfujk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_9KtFtsBaFSYWMkRagbntKw_X47Jzonr';
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/vehicles?select=*&order=orden.asc`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const rows = await res.json();
    if (Array.isArray(rows) && rows.length) {
      ESSENZA_INVENTORY = rows.map((r) => ({
        id: r.id,
        marca: r.marca,
        modelo: r.modelo,
        anio: r.anio,
        tipo: r.tipo,
        km: r.km,
        precio: r.precio,
        motor: r.motor,
        potencia: r.potencia,
        transmision: r.transmision,
        traccion: r.traccion,
        rines: r.rines,
        audio: r.audio,
        colorExterior: r.color_exterior,
        colorInterior: r.color_interior,
        estatus: r.estatus,
        galeria: r.galeria || [],
      }));
    }
  } catch (err) {
    console.warn('No se pudo cargar el inventario desde Supabase, usando datos de respaldo.', err);
  }
  initShowroomCarousel();
  initFeaturedVehicle();
})();

// ---------- 3d. Cinematic interlude — lazy-loaded, plays only while in view ----------
(() => {
  const video = document.getElementById('interludeVideo');
  if (!video) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    video.querySelectorAll('source').forEach((s) => {
      s.src = s.dataset.src;
    });
    video.load();
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          load();
          video.play().then(() => video.classList.add('is-playing')).catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );
  io.observe(video);
})();

// ---------- 3b. Vehicle gallery modal ----------
(() => {
  const modal = document.getElementById('vehicleModal');
  if (!modal) return;

  const { t, tv } = window.essenzaI18n;
  const imgEl = modal.querySelector('.vehicle-modal__image');
  const thumbsEl = modal.querySelector('.vehicle-modal__thumbs');
  const titleEl = modal.querySelector('.vehicle-modal__title');
  const genEl = modal.querySelector('.vehicle-modal__gen');
  const specsEl = modal.querySelector('.vehicle-modal__specs');
  const priceEl = modal.querySelector('.vehicle-modal__price');
  const waLink = modal.querySelector('.vehicle-modal__whatsapp');
  const financingLink = modal.querySelector('.vehicle-modal__financing');
  const closeBtn = modal.querySelector('.vehicle-modal__close');
  const prevBtn = modal.querySelector('.vehicle-modal__nav--prev');
  const nextBtn = modal.querySelector('.vehicle-modal__nav--next');

  let gallery = [];
  let galleryIndex = 0;
  let lastFocused = null;
  let currentVehicle = null;
  let currentMoneyFn = null;
  let currentKmLabelFn = null;

  const showImage = () => {
    imgEl.src = gallery[galleryIndex];
    [...thumbsEl.children].forEach((thumb, i) => thumb.classList.toggle('is-active', i === galleryIndex));
  };

  const close = () => {
    modal.hidden = true;
    currentVehicle = null;
    document.body.style.overflow = '';
    lastFocused?.focus();
  };

  const renderContent = (v, money, kmLabel) => {
    titleEl.textContent = `${v.marca} ${v.modelo}`;
    genEl.textContent = v.anio ? `${v.anio}` : '';
    specsEl.innerHTML = `
      <span>${t('modal.km')}: ${kmLabel(v.km)}</span>
      <span>${t('modal.motor')}: ${tv(v.motor)}</span>
      <span>${t('modal.potencia')}: ${tv(v.potencia)}</span>
      <span>${t('modal.transmision')}: ${tv(v.transmision)}</span>
      ${v.traccion ? `<span>${t('modal.traccion')}: ${tv(v.traccion)}</span>` : ''}
      ${v.rines ? `<span>${t('modal.rines')}: ${tv(v.rines)}</span>` : ''}
      ${v.audio ? `<span>${t('modal.audio')}: ${v.audio}</span>` : ''}
      <span>${t('modal.colorExterior')}: ${tv(v.colorExterior)}</span>
      <span>${t('modal.interior')}: ${tv(v.colorInterior)}</span>
      <span>${t('modal.estatus')}: ${tv(v.estatus)}</span>
    `;
    priceEl.textContent = money(v.precio);
    waLink.href = `https://wa.me/524774492547?text=${encodeURIComponent(`Hola, me interesa el ${v.marca} ${v.modelo}.`)}`;
    financingLink.href = `https://wa.me/524774492547?text=${encodeURIComponent(`Hola, quiero información de financiamiento para el ${v.marca} ${v.modelo}.`)}`;

    thumbsEl.innerHTML = gallery
      .map((src, i) => `<button type="button" class="vehicle-modal__thumb${i === 0 ? ' is-active' : ''}" data-i="${i}"><img src="${src}" alt="${t('modal.foto')} ${i + 1}" /></button>`)
      .join('');
    thumbsEl.hidden = gallery.length < 2;
    prevBtn.hidden = nextBtn.hidden = gallery.length < 2;
  };

  window.essenzaOpenVehicleModal = (v, money, kmLabel) => {
    lastFocused = document.activeElement;
    currentVehicle = v;
    currentMoneyFn = money;
    currentKmLabelFn = kmLabel;
    gallery = v.galeria && v.galeria.length ? v.galeria : [VEHICLE_IMG_PLACEHOLDER];
    galleryIndex = 0;

    renderContent(v, money, kmLabel);
    showImage();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  document.addEventListener('essenza:langchange', () => {
    if (!modal.hidden && currentVehicle) renderContent(currentVehicle, currentMoneyFn, currentKmLabelFn);
  });

  thumbsEl.addEventListener('click', (event) => {
    const btn = event.target.closest('.vehicle-modal__thumb');
    if (!btn) return;
    galleryIndex = Number(btn.dataset.i);
    showImage();
  });

  prevBtn.addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + gallery.length) % gallery.length;
    showImage();
  });

  nextBtn.addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % gallery.length;
    showImage();
  });

  closeBtn.addEventListener('click', close);
  modal.querySelector('.vehicle-modal__backdrop').addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight' && gallery.length > 1) nextBtn.click();
    if (event.key === 'ArrowLeft' && gallery.length > 1) prevBtn.click();
  });
})();

// ---------- 6. Vende tu auto — form → Supabase (fotos incluidas) → WhatsApp ----------
(() => {
  const form = document.getElementById('sellForm');
  if (!form) return;
  const confirmation = document.getElementById('sellConfirmation');
  const whatsappLink = document.getElementById('sellWhatsappLink');
  const submitBtn = form.querySelector('button[type="submit"]');

  const SUPABASE_URL = 'https://hoijdsbztoupcdkbfujk.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_9KtFtsBaFSYWMkRagbntKw_X47Jzonr';

  async function uploadPhoto(file) {
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '_')}`;
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/sell-photos/${path}`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': file.type },
      body: file,
    });
    if (!res.ok) throw new Error(`upload failed: ${res.status}`);
    return path;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const fotoInput = document.getElementById('sellFotos') || form.querySelector('input[name="fotos"]');
    const files = fotoInput?.files ? Array.from(fotoInput.files) : [];

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = files.length ? 'Subiendo fotos…' : 'Enviando…';
    }

    let fotoPaths = [];
    try {
      fotoPaths = await Promise.all(files.map(uploadPhoto));
    } catch (err) {
      console.warn('No se pudieron subir todas las fotos, se continúa sin ellas.', err);
    }

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/sell_leads`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          marca: data.marca || null,
          modelo: data.modelo || null,
          anio: data.anio || null,
          kilometraje: data.kilometraje || null,
          version: data.version || null,
          precio_esperado: data.precio || null,
          estado: data.estado || null,
          nombre: data.nombre || null,
          telefono: data.telefono || null,
          fotos: fotoPaths,
        }),
      });
    } catch (err) {
      console.warn('No se pudo guardar el lead en Supabase.', err);
    }

    const message = [
      'Hola, quiero vender/consignar mi automóvil en ESSENZA MOTORS:',
      `Marca: ${data.marca}`,
      `Modelo: ${data.modelo}`,
      `Año: ${data.anio}`,
      `Kilometraje: ${data.kilometraje}`,
      data.version ? `Versión: ${data.version}` : null,
      data.precio ? `Precio esperado: ${data.precio}` : null,
      `Estado general: ${data.estado}`,
      `Nombre: ${data.nombre}`,
      `Teléfono: ${data.telefono}`,
      fotoPaths.length ? `(${fotoPaths.length} foto${fotoPaths.length > 1 ? 's' : ''} enviada${fotoPaths.length > 1 ? 's' : ''} desde el sitio)` : null,
    ]
      .filter(Boolean)
      .join('\n');

    whatsappLink.href = `https://wa.me/524774492547?text=${encodeURIComponent(message)}`;
    form.hidden = true;
    confirmation.hidden = false;
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();

// ---------- 7. Reservación de cita — stepper ----------
(() => {
  const stepper = document.getElementById('stepper');
  if (!stepper) return;

  const { t, tEs } = window.essenzaI18n;
  const dots = [...stepper.querySelectorAll('.stepper__dot')];
  const panels = [...stepper.querySelectorAll('.stepper__panel')];
  const backBtn = document.getElementById('stepperBack');
  const nextBtn = document.getElementById('stepperNext');
  const optionButtons = stepper.querySelectorAll('.option-btn');

  let step = 1;
  const state = { tipoCita: '' };

  optionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      optionButtons.forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      // Kept in Spanish regardless of display language — this feeds the
      // WhatsApp summary ESSENZA staff read, not the on-screen UI.
      state.tipoCita = tEs(btn.dataset.i18n);
    });
  });

  const buildSummary = () => {
    const vehiculo = document.getElementById('bookingVehiculo').value || 'Por definir';
    const fecha = document.getElementById('bookingFecha').value || 'Por definir';
    const hora = document.getElementById('bookingHora').value || 'Por definir';
    const nombre = document.getElementById('bookingNombre').value || 'Por definir';
    const telefono = document.getElementById('bookingTelefono').value || 'Por definir';

    const summary =
      `Tipo de cita: ${state.tipoCita || 'Por definir'}\n` +
      `Vehículo: ${vehiculo}\n` +
      `Fecha: ${fecha}  Hora: ${hora}\n` +
      `Nombre: ${nombre}\n` +
      `Teléfono: ${telefono}`;

    document.getElementById('bookingSummary').textContent = summary;
    document.getElementById('bookingWhatsappLink').href =
      `https://wa.me/524774492547?text=${encodeURIComponent('Quiero confirmar una cita en ESSENZA MOTORS.\n' + summary)}`;
  };

  const render = () => {
    dots.forEach((dot) => {
      const n = Number(dot.dataset.step);
      dot.classList.toggle('is-active', n === step);
      dot.classList.toggle('is-done', n < step);
    });
    panels.forEach((panel) => panel.classList.toggle('is-active', Number(panel.dataset.panel) === step));
    backBtn.disabled = step === 1;
    nextBtn.textContent = step === panels.length ? t('booking.listo') : t('booking.continuar');
    nextBtn.hidden = step === panels.length;
    if (step === panels.length) buildSummary();
  };

  nextBtn.addEventListener('click', () => {
    if (step < panels.length) step += 1;
    render();
  });

  backBtn.addEventListener('click', () => {
    if (step > 1) step -= 1;
    render();
  });

  document.addEventListener('essenza:langchange', render);

  render();
})();

// ---------- 8. Historia — timeline scroll progress ----------
(() => {
  const road = document.querySelector('.timeline__road');
  const line = document.querySelector('.timeline__line');
  if (!road || !line) return;

  window.addEventListener(
    'scroll',
    () => {
      const rect = road.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = Math.min(Math.max((viewportH - rect.top) / (rect.height + viewportH * 0.4), 0), 1);
      line.style.height = `${progress * 100}%`;
    },
    { passive: true }
  );
})();

// ---------- 9. Reputation — single-review spotlight ----------
(() => {
  const carousel = document.getElementById('reviewCarousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.review-slide')];
  const dotsEl = document.getElementById('reviewDots');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;

  dotsEl.innerHTML = slides
    .map((_, i) => `<button type="button" class="review-carousel__dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="Reseña ${i + 1}"></button>`)
    .join('');
  const dots = [...dotsEl.children];

  const show = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.classList.toggle('is-active', n === index));
    dots.forEach((dot, n) => dot.classList.toggle('is-active', n === index));
  };

  const startAuto = () => {
    if (reducedMotion || slides.length < 2) return;
    stopAuto();
    timer = setInterval(() => show(index + 1), 6000);
  };
  const stopAuto = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  dotsEl.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-index]');
    if (!btn) return;
    show(Number(btn.dataset.index));
    startAuto();
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  startAuto();
})();

// ---------- Footer year ----------
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
})();
