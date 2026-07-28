// Hero — see cinema-hero.js for the scroll-driven multi-vehicle experience.

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

// ---------- 3. Inventory — catalog + filters ----------
// Vehículos reales del showroom. Año, kilometraje, precio y estatus están
// marcados como "Consultar" / pendientes: son fotos reales pero esos datos
// no fueron proporcionados y no deben inventarse — hay que confirmarlos con
// ESSENZA antes de publicar cifras exactas. Motor/potencia/transmisión son
// especificaciones de fábrica publicadas para el modelo, no de la unidad.
const ESSENZA_INVENTORY = [
  {
    marca: 'Bentley',
    modelo: 'Continental GT Speed',
    generacion: 'Generación 2012–2015 (por confirmar año exacto)',
    tipo: 'Gran Turismo',
    km: null,
    precio: null,
    motor: '6.0L W12 Biturbo',
    potencia: '~616 hp (dato de fábrica del modelo)',
    transmision: 'Automática 8 vel. AWD',
    color: 'Naranja metálico',
    estatus: 'Disponible',
    galeria: ['assets/inventory/bentley-continental-gt-speed.jpg'],
  },
  {
    marca: 'Jaguar',
    modelo: 'F-Type Coupé',
    generacion: 'Generación 2021+ (facelift, versión por confirmar)',
    tipo: 'Deportivo',
    km: null,
    precio: null,
    motor: 'V6 o V8 sobrealimentado (versión por confirmar)',
    potencia: 'Por confirmar según versión',
    transmision: 'Automática',
    color: 'Rojo',
    estatus: 'Disponible',
    galeria: ['assets/inventory/jaguar-f-type.jpg'],
  },
  {
    marca: 'Lamborghini',
    modelo: 'Urus',
    generacion: 'Generación 2018+ (versión por confirmar)',
    tipo: 'SUV performance',
    km: null,
    precio: null,
    motor: '4.0L V8 Biturbo',
    potencia: '~650 hp (dato de fábrica del modelo)',
    transmision: 'Automática 8 vel.',
    color: 'Negro',
    estatus: 'Disponible',
    galeria: ['assets/inventory/lamborghini-urus.jpg'],
  },
  {
    marca: 'Mercedes-AMG',
    modelo: 'GT R',
    generacion: 'Generación 2017+ (edición con gráficos por confirmar)',
    tipo: 'Deportivo',
    km: null,
    precio: null,
    motor: '4.0L V8 Biturbo',
    potencia: '~577 hp (dato de fábrica del modelo)',
    transmision: 'AMG SPEEDSHIFT DCT 7 vel.',
    color: 'Negro con gráficos amarillos',
    estatus: 'Disponible',
    galeria: ['assets/inventory/mercedes-amg-gt-r.jpg'],
  },
];

(() => {
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;

  const money = (n) => (n == null ? 'Consultar precio' : '$' + n.toLocaleString('es-MX') + ' MXN');
  const kmLabel = (v) => (v == null ? 'Consultar kilometraje' : v);

  const cardHTML = (v, i) => `
    <article class="vehicle-card" data-index="${i}" data-marca="${v.marca}" data-tipo="${v.tipo}" data-precio="${v.precio ?? ''}" data-disponibilidad="${v.estatus}" tabindex="0" role="button" aria-label="Ver galería de ${v.marca} ${v.modelo}">
      <div class="vehicle-card__media">
        <img src="${v.galeria[0]}" alt="${v.marca} ${v.modelo}" loading="lazy" />
        <span class="vehicle-card__status">${v.estatus}</span>
        ${v.galeria.length > 1 ? `<span class="vehicle-card__gallery-count">${v.galeria.length} fotos</span>` : ''}
      </div>
      <div class="vehicle-card__body">
        <span class="vehicle-card__brand">${v.marca}</span>
        <h3 class="vehicle-card__name">${v.modelo}</h3>
        <p class="vehicle-card__gen">${v.generacion}</p>
        <div class="vehicle-card__specs">
          <span>Km: ${kmLabel(v.km)}</span>
          <span>Motor: ${v.motor}</span>
          <span>Potencia: ${v.potencia}</span>
          <span>Transmisión: ${v.transmision}</span>
          <span>Color: ${v.color}</span>
        </div>
        <p class="vehicle-card__price">${money(v.precio)}</p>
        <div class="vehicle-card__actions">
          <a class="btn btn--primary" target="_blank" rel="noopener"
             href="https://wa.me/524774492547?text=${encodeURIComponent(`Hola, me interesa el ${v.marca} ${v.modelo}.`)}">WhatsApp</a>
          <a class="btn btn--ghost" href="#experiencia">Reservar cita</a>
          <a class="btn btn--ghost" target="_blank" rel="noopener"
             href="https://wa.me/524774492547?text=${encodeURIComponent(`Hola, quiero información de financiamiento para el ${v.marca} ${v.modelo}.`)}">Financiamiento</a>
        </div>
      </div>
    </article>
  `;

  let currentList = ESSENZA_INVENTORY;

  const render = () => {
    const marca = document.getElementById('filterMarca').value;
    const tipo = document.getElementById('filterTipo').value;
    const disponibilidad = document.getElementById('filterDisponibilidad').value;
    const precioRange = document.getElementById('filterPrecio').value.split('-').map(Number);

    currentList = ESSENZA_INVENTORY.filter((v) => {
      if (marca && v.marca !== marca) return false;
      if (tipo && v.tipo !== tipo) return false;
      if (disponibilidad && v.estatus !== disponibilidad) return false;
      if (precioRange.length === 2) {
        if (v.precio == null) return false;
        if (v.precio < precioRange[0] || v.precio > precioRange[1]) return false;
      }
      return true;
    });

    grid.innerHTML = currentList.length
      ? currentList.map(cardHTML).join('')
      : '<p class="inventory__empty">No hay vehículos que coincidan con estos filtros por ahora. Escríbenos por WhatsApp y te avisamos en cuanto ingrese uno.</p>';
  };

  ['filterMarca', 'filterTipo', 'filterPrecio', 'filterDisponibilidad'].forEach((id) => {
    document.getElementById(id).addEventListener('change', render);
  });

  grid.addEventListener('click', (event) => {
    if (event.target.closest('.vehicle-card__actions')) return;
    const card = event.target.closest('.vehicle-card');
    if (!card) return;
    const vehicle = currentList[Number(card.dataset.index)];
    if (vehicle) window.essenzaOpenVehicleModal(vehicle, money, kmLabel);
  });

  grid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.vehicle-card');
    if (!card) return;
    event.preventDefault();
    const vehicle = currentList[Number(card.dataset.index)];
    if (vehicle) window.essenzaOpenVehicleModal(vehicle, money, kmLabel);
  });

  render();
})();

// ---------- 3b. Vehicle gallery modal ----------
(() => {
  const modal = document.getElementById('vehicleModal');
  if (!modal) return;

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

  const showImage = () => {
    imgEl.src = gallery[galleryIndex];
    [...thumbsEl.children].forEach((t, i) => t.classList.toggle('is-active', i === galleryIndex));
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    lastFocused?.focus();
  };

  window.essenzaOpenVehicleModal = (v, money, kmLabel) => {
    lastFocused = document.activeElement;
    gallery = v.galeria;
    galleryIndex = 0;

    titleEl.textContent = `${v.marca} ${v.modelo}`;
    genEl.textContent = v.generacion;
    specsEl.innerHTML = `
      <span>Km: ${kmLabel(v.km)}</span>
      <span>Motor: ${v.motor}</span>
      <span>Potencia: ${v.potencia}</span>
      <span>Transmisión: ${v.transmision}</span>
      <span>Color: ${v.color}</span>
      <span>Estatus: ${v.estatus}</span>
    `;
    priceEl.textContent = money(v.precio);
    waLink.href = `https://wa.me/524774492547?text=${encodeURIComponent(`Hola, me interesa el ${v.marca} ${v.modelo}.`)}`;
    financingLink.href = `https://wa.me/524774492547?text=${encodeURIComponent(`Hola, quiero información de financiamiento para el ${v.marca} ${v.modelo}.`)}`;

    thumbsEl.innerHTML = gallery
      .map((src, i) => `<button type="button" class="vehicle-modal__thumb${i === 0 ? ' is-active' : ''}" data-i="${i}"><img src="${src}" alt="Foto ${i + 1}" /></button>`)
      .join('');
    thumbsEl.hidden = gallery.length < 2;
    prevBtn.hidden = nextBtn.hidden = gallery.length < 2;

    showImage();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

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

// ---------- 6. Vende tu auto — form → WhatsApp ----------
(() => {
  const form = document.getElementById('sellForm');
  if (!form) return;
  const confirmation = document.getElementById('sellConfirmation');
  const whatsappLink = document.getElementById('sellWhatsappLink');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

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
      state.tipoCita = btn.textContent.trim();
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
    nextBtn.textContent = step === panels.length ? 'Listo' : 'Continuar';
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

// ---------- Footer year ----------
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
})();
