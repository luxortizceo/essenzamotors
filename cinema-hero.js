// ESSENZA MOTORS — cinematic scroll-driven hero.
// A single continuous showroom-journey clip is scrubbed frame-by-frame
// against scroll position: scrolling down advances the cinematic,
// scrolling up rewinds it. Before JS takes over (and for
// prefers-reduced-motion visitors) the video just autoplays and loops.
(() => {
  const heroSection = document.getElementById('hero');
  const pin = heroSection?.querySelector('.cinema-hero__pin');
  const video = document.getElementById('heroVideo');
  const textEl = heroSection?.querySelector('.cinema-hero__text');

  if (!heroSection || !pin || !video) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return; // video already autoplays + loops via its HTML attributes

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Phones decode/seek compressed video far slower than desktop. Snapping to
  // a coarser time step means fewer seeks per scroll gesture — the video
  // still tracks scroll, just in slightly bigger steps instead of every tick.
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const seekThreshold = isMobile ? 0.12 : 0.02;

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

  const enableScrub = () => {
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
        if (Number.isFinite(t) && Math.abs(video.currentTime - t) > seekThreshold) {
          requestSeek(t);
        }
      },
    });
  };

  if (video.readyState >= 1) {
    enableScrub();
  } else {
    video.addEventListener('loadedmetadata', enableScrub, { once: true });
  }
})();
