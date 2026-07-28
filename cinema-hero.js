// ESSENZA MOTORS — cinematic scroll-driven hero.
// Three showroom clips (same room, same lighting, same turntable) are
// scrubbed frame-by-frame against scroll position instead of played in
// real time. At each vehicle boundary the screen fades to black, a red
// LED line sweeps across, the active <video> is swapped underneath while
// the screen is fully black, then the fade reverses to reveal the next car.
(() => {
  const heroSection = document.getElementById('hero');
  const pin = heroSection?.querySelector('.cinema-hero__pin');
  const videos = heroSection ? [...heroSection.querySelectorAll('.cinema-video')] : [];
  const transitionLayer = heroSection?.querySelector('.cinema-hero__transition');
  const led = heroSection?.querySelector('.cinema-hero__led');
  const textEl = heroSection?.querySelector('.cinema-hero__text');
  const brandEl = heroSection?.querySelector('[data-text-brand]');
  const modelEl = heroSection?.querySelector('[data-text-model]');
  const yearEl = heroSection?.querySelector('[data-text-year]');

  if (!heroSection || !pin || videos.length === 0) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const VEHICLES = [
    { brand: 'MERCEDES-AMG', model: 'GT R', year: '2020' },
    { brand: 'PORSCHE', model: '911 GT3', year: '2022' },
    { brand: 'LAMBORGHINI', model: 'HURACÁN EVO', year: '2021' },
  ];

  const durations = videos.map(() => 4);
  videos.forEach((v, i) => {
    v.load();
    v.addEventListener('loadedmetadata', () => {
      durations[i] = v.duration || 4;
    });
  });

  const setText = (i) => {
    const data = VEHICLES[i];
    brandEl.textContent = data.brand;
    modelEl.textContent = data.model;
    yearEl.textContent = data.year;
  };

  setText(0);
  videos[0].classList.add('is-active');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return; // CSS already keeps vehicle 1 static and fully visible

  gsap.registerPlugin(ScrollTrigger);

  // ---- Lenis smooth scroll, driven by GSAP's ticker ----
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const N = videos.length;
  const SEG = 1 / N;
  const TRANS = 0.1; // last/first 10% of a segment, per the brief

  let activeIndex = 0;

  const setActive = (i) => {
    if (i === activeIndex) return;
    videos[activeIndex].classList.remove('is-active');
    videos[i].classList.add('is-active');
    activeIndex = i;
  };

  const scrub = (i, localProgress) => {
    const v = videos[i];
    const d = durations[i] || 4;
    const t = Math.min(Math.max(localProgress, 0), 1) * d;
    if (Number.isFinite(t) && Math.abs(v.currentTime - t) > 0.02) {
      try {
        v.currentTime = t;
      } catch (err) {
        /* seek not ready yet on this frame; next scroll tick retries */
      }
    }
  };

  // .cinema-hero__led is 14%-wide; xPercent is relative to the element's own
  // width, so to sweep it fully across the container (from off-screen left
  // to off-screen right) the range has to be scaled up accordingly.
  const LED_WIDTH_PCT = 14;
  const ledXPercent = (local) => -100 + local * (100 / LED_WIDTH_PCT * 100 + 100);

  const updateText = (i, blend) => {
    if (brandEl.textContent !== VEHICLES[i].brand) setText(i);
    gsap.set(textEl, {
      opacity: 1 - blend,
      y: blend * 30,
      filter: `blur(${blend * 6}px)`,
    });
  };

  const update = (progress) => {
    for (let b = 0; b < N - 1; b++) {
      const boundary = (b + 1) * SEG;
      const windowHalf = TRANS * SEG;
      const start = boundary - windowHalf;
      const end = boundary + windowHalf;

      if (progress >= start && progress <= end) {
        const local = (progress - start) / (end - start);
        const overlay = local < 0.5 ? local * 2 : (1 - local) * 2;

        gsap.set(transitionLayer, { opacity: overlay });
        gsap.set(led, { xPercent: ledXPercent(local) });

        if (local < 0.5) {
          setActive(b);
          scrub(b, 1);
        } else {
          setActive(b + 1);
          scrub(b + 1, 0);
        }
        updateText(activeIndex, overlay);
        return;
      }
    }

    // Clean viewing zone for whichever vehicle owns this scroll range.
    const index = Math.min(Math.floor(progress / SEG), N - 1);
    const segStart = index * SEG;
    const segEnd = (index + 1) * SEG;
    const cleanStart = index === 0 ? segStart : segStart + TRANS * SEG;
    const cleanEnd = index === N - 1 ? segEnd : segEnd - TRANS * SEG;
    const local = (progress - cleanStart) / (cleanEnd - cleanStart);

    setActive(index);
    scrub(index, local);
    gsap.set(transitionLayer, { opacity: 0 });
    updateText(index, 0);
  };

  gsap.set(transitionLayer, { opacity: 0 });
  gsap.set(led, { xPercent: -100 });
  gsap.fromTo(
    textEl,
    { opacity: 0, y: 30, filter: 'blur(6px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out', delay: 0.3 }
  );

  ScrollTrigger.create({
    trigger: heroSection,
    start: 'top top',
    end: '+=500%',
    pin: heroSection,
    pinSpacing: true,
    scrub: 0.4,
    onUpdate: (self) => update(self.progress),
  });
})();
