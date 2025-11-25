import { whatsappNo } from "@/lib/config";
import React, { useEffect, useRef, useState } from "react";

const Connect = () => {
  const buttonRef = useRef(null);
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  useEffect(() => {
    const checkBackgroundColor = () => {
      if (!buttonRef.current) return;

      // Get the element behind the button
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Temporarily hide the button to get the element behind it
      buttonRef.current.style.pointerEvents = "none";
      const elementBehind = document.elementFromPoint(centerX, centerY);
      buttonRef.current.style.pointerEvents = "auto";

      if (elementBehind) {
        const computedStyle = window.getComputedStyle(elementBehind);
        const bgColor = computedStyle.backgroundColor;

        // Parse RGB values and calculate brightness
        const rgb = bgColor.match(/\d+/g);
        if (rgb) {
          const brightness =
            (parseInt(rgb[0]) * 299 +
              parseInt(rgb[1]) * 587 +
              parseInt(rgb[2]) * 114) /
            1000;
          setIsDarkBackground(brightness < 128);
        }
      }
    };

    // Check on mount and scroll
    checkBackgroundColor();
    window.addEventListener("scroll", checkBackgroundColor);
    window.addEventListener("resize", checkBackgroundColor);

    return () => {
      window.removeEventListener("scroll", checkBackgroundColor);
      window.removeEventListener("resize", checkBackgroundColor);
    };
  }, []);
  return (
    <div>
      <a
        ref={buttonRef}
        href={`https://wa.me/+91${whatsappNo}?text=Hi%2C%20I'm%20interested%20to%20connect`}
        target="_blank"
        rel="noopener noreferrer"
        className={`border fixed bottom-10 text-nowrap right-5 px-3 lg:px-5 py-1 lg:py-2 flex bg-transparent backdrop-blur-lg hover:bg-[#EA6100] group transition-all duration-500 ease-in-out rounded-full text-center gap-x-2 items-center z-[9999]`}
      >
        <span
          className={`group-hover:text-white transition-colors duration-300`}
        >
          Connect
        </span>
        <img src="/assets/social/whatsapp.png" alt="wp" className="w-[30px]" />
      </a>
    </div>
  );
};

export default Connect;
