/* ============================================================
   NuovaSolution — Main JS (Nav, Scroll Animations, Pain Timeline)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Sticky Nav
  ---------------------------------------------------------- */
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 20);
    lastScroll = scrollY;
  }, { passive: true });


  /* ----------------------------------------------------------
     Mobile Nav Toggle
  ---------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });
  }


  /* ----------------------------------------------------------
     Scroll Reveal (IntersectionObserver)
  ---------------------------------------------------------- */
  const isMobileView = window.matchMedia('(max-width: 639px)').matches;

  // On mobile, use a tighter rootMargin so elements reveal as they scroll
  // into the lower two-thirds of the screen — feels more alive
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: isMobileView ? '0px 0px -60px 0px' : '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });


  /* ----------------------------------------------------------
     Pain Timeline Animation
  ---------------------------------------------------------- */
  const painTimeline = document.querySelector('.pain-timeline');

  if (painTimeline) {
    const steps = painTimeline.querySelectorAll('.timeline-step');
    const isMobile = () => window.matchMedia('(max-width: 639px)').matches;

    if (isMobile()) {
      // Mobile: vertical sequential — faster than desktop so full flow reads in ~1.2s
      const mobileTimelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            steps.forEach((step, i) => {
              setTimeout(() => step.classList.add('activated'), i * 240);
            });
            mobileTimelineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      mobileTimelineObserver.observe(painTimeline);
    } else {
      // Desktop: sequential activation once timeline enters view
      const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            steps.forEach((step, i) => {
              setTimeout(() => step.classList.add('activated'), i * 500);
            });
            timelineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      timelineObserver.observe(painTimeline);
    }
  }


  /* ----------------------------------------------------------
     Smooth scroll for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ----------------------------------------------------------
     Lead cards hero animation — cycle the "new" card
  ---------------------------------------------------------- */
  const heroCards = document.querySelectorAll('.hero-lead-card');
  if (heroCards.length > 0) {
    let activeIndex = 0;
    setInterval(() => {
      heroCards.forEach(c => c.classList.remove('highlighted'));
      heroCards[activeIndex].classList.add('highlighted');
      activeIndex = (activeIndex + 1) % heroCards.length;
    }, 2200);
  }

});
