import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GSAPReveal = ({
  children,
  duration = 1,
  delay = 0,
  y = 50,
  x = 0,
  stagger = 0.2,
  trigger = null,
  start = "top 85%",
  once = true,
  className = "",
}) => {
  const revealRef = useRef(null);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return;

    const childrenElements = element.children;

    const anim = gsap.fromTo(
      childrenElements,
      {
        opacity: 0,
        y: y,
        x: x,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger || element,
          start: start,
          toggleActions: once ? "play none none none" : "play none none reverse",
          once: once,
        },
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [duration, delay, y, x, stagger, trigger, start, once]);

  return (
    <div ref={revealRef} className={className}>
      {children}
    </div>
  );
};

export default GSAPReveal;
