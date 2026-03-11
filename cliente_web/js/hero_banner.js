(function () {
  'use strict';

  const hero = document.querySelector('.hero-banner');
  const cta = document.getElementById('hero-cta');
  const steps = Array.from(document.querySelectorAll('.hero-step'));

  if (!hero || !cta || steps.length === 0) {
    return;
  }

  let currentStep = 0;

  const activateStep = (index) => {
    steps.forEach((step, stepIndex) => {
      step.classList.toggle('hero-step--active', stepIndex === index);
    });
  };

  const runWorkflowAnimation = () => {
    currentStep = (currentStep + 1) % steps.length;
    activateStep(currentStep);
  };

  const intervalId = window.setInterval(runWorkflowAnimation, 1800);

  cta.addEventListener('click', function () {
    hero.classList.add('hero-banner--cta-pulse');
    activateStep(0);
    currentStep = 0;

    window.setTimeout(function () {
      hero.classList.remove('hero-banner--cta-pulse');
    }, 700);
  });

  window.addEventListener('beforeunload', function () {
    window.clearInterval(intervalId);
  });
})();
