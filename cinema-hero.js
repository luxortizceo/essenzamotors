// ESSENZA MOTORS — cinematic scroll-driven hero.
// A single continuous showroom-journey clip is scrubbed against scroll
// position: scrolling down advances the cinematic, scrolling up rewinds it.
// Before JS takes over (and for prefers-reduced-motion visitors) the video
// just autoplays and loops.
//
// Desktop scrubs the actual <video> element via currentTime seeks — fine on
// desktop hardware. Phones decode/seek compressed video far too slowly for
// that to stay smooth, so on narrow screens the same scroll position instead
// drives a <canvas> through a preloaded sequence of still frames: once an
// image is loaded, painting it is just a cheap canvas blit, no per-scroll
// video decoding involved.
(() => {
  const heroSection = document.getElementById('hero');
  const pin = heroSection?.querySelector('.cinema-hero__pin');
  const video = document.getElementById('heroVideo');
  const canvas = document.getElementById('heroCanvas');
  const textEl = heroSection?.querySelector('.cinema-hero__text');

  if (!heroSection || !pin || !video) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return; // video already autoplays + loops via its HTML attributes

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  // ---- Lenis smooth scroll, driven by GSAP's ticker ----
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  if (textEl) {
    gsap.fromTo(
      textEl,
      { opacity: 0, y: 30, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out', delay: 0.3 }
    );
  }

  // ---------- Desktop: scrub the real <video> ----------
  const enableVideoScrub = () => {
    const duration = video.duration || 0;
    if (!duration) return;
    video.pause();

    // Seeks on a compressed video aren't instant. Firing a new one on every
    // scroll tick before the last one has decoded makes the browser cancel
    // and restart mid-seek, which is what reads as stutter/lag. Instead,
    // only one seek is ever in flight: extra requests that arrive while it's
    // still resolving just overwrite the pending target, so once it's free
    // it jumps straight to the latest scroll position instead of working
    // through every intermediate one.
    let seeking = false;
    let pendingTime = null;

    const requestSeek = (t) => {
      if (seeking) {
        pendingTime = t;
        return;
      }
      seeking = true;
      video.currentTime = t;
    };

    video.addEventListener('seeked', () => {
      seeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    });

    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: '+=300%',
      pin: heroSection,
      pinSpacing: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const t = Math.min(Math.max(self.progress, 0), 1) * duration;
        if (Number.isFinite(t) && Math.abs(video.currentTime - t) > 0.02) {
          requestSeek(t);
        }
      },
    });
  };

  // ---------- Mobile: paint a preloaded frame sequence on <canvas> ----------
  const enableFrameScrub = () => {
    if (!canvas) {
      enableVideoScrub();
      return;
    }
    const ctx = canvas.getContext('2d');
    const FRAME_COUNT = 72;
    const frameSrc = (i) => `assets/video/hero-frames/frame-${String(i + 1).padStart(3, '0')}.jpg`;
    const frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i);
      return img;
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      if (currentIndex !== -1) draw(currentIndex);
    };

    let currentIndex = -1;
    const draw = (index) => {
      const img = frames[index];
      if (!img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const imageRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let sx, sy, sw, sh;
      if (imageRatio > canvasRatio) {
        sh = img.naturalHeight;
        sw = sh * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      currentIndex = index;
    };

    // Only swap away from the live video once the first frame is actually
    // ready — if the frame sequence fails to load for any reason, visitors
    // still get the autoplaying video instead of a blank canvas.
    frames[0].addEventListener(
      'load',
      () => {
        video.pause();
        video.classList.remove('is-active');
        canvas.classList.add('is-active');
        resize();
        draw(0);
      },
      { once: true }
    );

    window.addEventListener('resize', resize);

    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: '+=300%',
      pin: heroSection,
      pinSpacing: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const progress = Math.min(Math.max(self.progress, 0), 1);
        const index = Math.min(FRAME_COUNT - 1, Math.round(progress * (FRAME_COUNT - 1)));
        if (index !== currentIndex) draw(index);
      },
    });
  };

  if (isMobile) {
    enableFrameScrub();
  } else if (video.readyState >= 1) {
    enableVideoScrub();
  } else {
    video.addEventListener('loadedmetadata', enableVideoScrub, { once: true });
  }
})();
