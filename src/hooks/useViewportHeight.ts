import { useState, useEffect } from 'react';

export function useViewportHeight() {
  useEffect(() => {
    function setAppHeight() {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    }
    
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    return () => window.removeEventListener('resize', setAppHeight);
  }, []);
}
