import React from "react";

const Mobile: React.FC = () => {
  // Helper function to detect mobile device
  const isMobileDevice = (): boolean => {
    return (
      !!navigator.userAgent.match(/Android/i) ||
      !!navigator.userAgent.match(/webOS/i) ||
      !!navigator.userAgent.match(/iPhone/i) ||
      !!navigator.userAgent.match(/iPad/i) ||
      !!navigator.userAgent.match(/iPod/i) ||
      !!navigator.userAgent.match(/BlackBerry/i) ||
      !!navigator.userAgent.match(/Windows Phone/i)
    );
  };

  // Only render if on a mobile device
  if (isMobileDevice()) {
    return (
      <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center text-center p-12 bg-neutral-800 z-[1000] text-neutral-200">
        <p className="animate-pulse">
          Thank you for visiting my portfolio! The mobile version is still in
          development. Please visit on a desktop for the best experience 👨‍💻.
        </p>
      </div>
    );
  }

  return null;
};

export default Mobile;
