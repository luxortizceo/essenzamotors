// Hero — ESSENZA MOTORS
// "Scroll to ignite": once the visitor scrolls past the hero, hand off
// to whatever section follows instead of holding them on the intro.
(() => {
  const hero = document.getElementById('hero');
  const video = document.querySelector('.hero__video');
  const igniteButton = document.getElementById('scrollIgnite');

  if (video) {
    // Some mobile browsers ignore the autoplay attribute until a play() call.
    video.play().catch(() => {
      /* Autoplay blocked; poster image remains visible until user interacts. */
    });
  }

  const igniteScroll = () => {
    const next = hero.nextElementSibling;
    const target = next || document.body;
    window.scrollTo({
      top: next ? next.offsetTop : hero.offsetHeight,
      behavior: 'smooth',
    });
  };

  igniteButton?.addEventListener('click', igniteScroll);

  // Subtle parallax: the hero content drifts and fades as the user scrolls,
  // reinforcing the "camera advancing past the vehicle" feel from the brief.
  const content = document.querySelector('.hero__content');
  window.addEventListener(
    'scroll',
    () => {
      const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
      if (content) {
        content.style.transform = `translateY(${progress * -40}px)`;
        content.style.opacity = String(1 - progress);
      }
    },
    { passive: true }
  );
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
const ESSENZA_INVENTORY = [
  { marca: 'Porsche', modelo: '911 Carrera', anio: 2023, tipo: 'Deportivo', km: '12,400 km', precio: 2450000, motor: '3.0L Twin-Turbo', potencia: '379 hp', transmision: 'PDK 8 vel.', color: 'Negro obsidiana', estatus: 'Disponible' },
  { marca: 'Ferrari', modelo: 'Portofino', anio: 2022, tipo: 'Exótico', km: '8,100 km', precio: 4650000, motor: '3.9L V8 Twin-Turbo', potencia: '612 hp', transmision: 'Automática 8 vel.', color: 'Rosso Corsa', estatus: 'Disponible' },
  { marca: 'Lamborghini', modelo: 'Huracán EVO', anio: 2021, tipo: 'Exótico', km: '15,600 km', precio: 5980000, motor: '5.2L V10', potencia: '631 hp', transmision: 'Automática 7 vel.', color: 'Verde Mantis', estatus: 'Apartado' },
  { marca: 'Audi', modelo: 'R8 V10 Performance', anio: 2022, tipo: 'Deportivo', km: '9,800 km', precio: 3350000, motor: '5.2L V10', potencia: '620 hp', transmision: 'S tronic 7 vel.', color: 'Gris Titanio', estatus: 'Disponible' },
  { marca: 'BMW', modelo: 'M4 Competition', anio: 2023, tipo: 'Deportivo', km: '6,200 km', precio: 1780000, motor: '3.0L I6 Twin-Turbo', potencia: '503 hp', transmision: 'Automática 8 vel.', color: 'Blanco frío', estatus: 'Disponible' },
  { marca: 'Porsche', modelo: 'Cayenne Turbo GT', anio: 2023, tipo: 'SUV performance', km: '4,900 km', precio: 3120000, motor: '4.0L V8 Twin-Turbo', potencia: '631 hp', transmision: 'Tiptronic 8 vel.', color: 'Negro carbono', estatus: 'Próximo ingreso' },
];

(() => {
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;

  const money = (n) => '$' + n.toLocaleString('es-MX') + ' MXN';

  const cardHTML = (v) => `
    <article class="vehicle-card" data-marca="${v.marca}" data-tipo="${v.tipo}" data-precio="${v.precio}" data-disponibilidad="${v.estatus}">
      <div class="vehicle-card__media">
        <span class="vehicle-card__status">${v.estatus}</span>
        Fotografía / video pendiente
      </div>
      <div class="vehicle-card__body">
        <span class="vehicle-card__brand">${v.marca}</span>
        <h3 class="vehicle-card__name">${v.modelo} · ${v.anio}</h3>
        <div class="vehicle-card__specs">
          <span>Km: ${v.km}</span>
          <span>Motor: ${v.motor}</span>
          <span>Potencia: ${v.potencia}</span>
          <span>Transmisión: ${v.transmision}</span>
          <span>Color: ${v.color}</span>
        </div>
        <p class="vehicle-card__price">${money(v.precio)}</p>
        <div class="vehicle-card__actions">
          <a class="btn btn--primary" target="_blank" rel="noopener"
             href="https://wa.me/524774492547?text=${encodeURIComponent(`Hola, me interesa el ${v.marca} ${v.modelo} ${v.anio}.`)}">WhatsApp</a>
          <a class="btn btn--ghost" href="#experiencia">Reservar cita</a>
        </div>
      </div>
    </article>
  `;

  const render = () => {
    const marca = document.getElementById('filterMarca').value;
    const tipo = document.getElementById('filterTipo').value;
    const disponibilidad = document.getElementById('filterDisponibilidad').value;
    const precioRange = document.getElementById('filterPrecio').value.split('-').map(Number);

    const filtered = ESSENZA_INVENTORY.filter((v) => {
      if (marca && v.marca !== marca) return false;
      if (tipo && v.tipo !== tipo) return false;
      if (disponibilidad && v.estatus !== disponibilidad) return false;
      if (precioRange.length === 2 && (v.precio < precioRange[0] || v.precio > precioRange[1])) return false;
      return true;
    });

    grid.innerHTML = filtered.length
      ? filtered.map(cardHTML).join('')
      : '<p class="inventory__empty">No hay vehículos que coincidan con estos filtros por ahora. Escríbenos por WhatsApp y te avisamos en cuanto ingrese uno.</p>';
  };

  ['filterMarca', 'filterTipo', 'filterPrecio', 'filterDisponibilidad'].forEach((id) => {
    document.getElementById(id).addEventListener('change', render);
  });

  render();
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
