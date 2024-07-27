import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";

export function LoadMore({ onTrigger }) {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      onTrigger();
    }
  }, [intersection?.isIntersecting, onTrigger]);

  return <div ref={ref}></div>;
}
