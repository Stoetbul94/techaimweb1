export const motionTokens = {
  duration: { fast: 0.2, medium: 0.5, slow: 0.9 },
  easing: [0.22, 1, 0.36, 1] as const,
  stagger: 0.08,
  scrollTrigger: { start: "top 80%" },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: motionTokens.stagger } },
};
