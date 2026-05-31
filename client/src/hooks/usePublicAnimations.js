import { useEffect } from "react";
import { gsap } from "gsap";

const DEFAULT_Y_OFFSET = 16;
const DEFAULT_DURATION = 0.6;

export default function usePublicAnimations(scopeRef, dependency) {
  useEffect(() => {
    const scope = scopeRef?.current;
    if (!scope) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    const elements = Array.from(scope.querySelectorAll("[data-anim]"));
    if (!elements.length) {
      return;
    }

    elements.forEach((element) => {
      gsap.set(element, { autoAlpha: 0, y: DEFAULT_Y_OFFSET });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target;
          const delayValue = target.getAttribute("data-anim-delay");
          const delay = delayValue ? Number.parseFloat(delayValue) : 0;

          gsap.to(target, {
            autoAlpha: 1,
            y: 0,
            duration: DEFAULT_DURATION,
            ease: "power2.out",
            delay,
          });

          observer.unobserve(target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [scopeRef, dependency]);
}
