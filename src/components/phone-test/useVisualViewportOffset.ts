import { useEffect } from "react";

/**
 * Custom hook to track iOS Safari visual viewport offset.
 * Sets a CSS variable --visual-viewport-top that can be used for padding.
 */
export const useVisualViewportOffset = () => {
  useEffect(() => {
    const setVisualViewportOffset = () => {
      const offsetTop = window.visualViewport?.offsetTop ?? 0;
      document.documentElement.style.setProperty(
        "--visual-viewport-top",
        `${offsetTop}px`
      );
    };

    setVisualViewportOffset();

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", setVisualViewportOffset);
      vv.addEventListener("scroll", setVisualViewportOffset);
    }
    window.addEventListener("orientationchange", setVisualViewportOffset);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", setVisualViewportOffset);
        vv.removeEventListener("scroll", setVisualViewportOffset);
      }
      window.removeEventListener("orientationchange", setVisualViewportOffset);
    };
  }, []);
};
