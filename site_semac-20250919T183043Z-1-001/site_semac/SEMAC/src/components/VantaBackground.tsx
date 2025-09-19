// src/components/VantaBackground.tsx

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// A importação DEVE apontar para o arquivo .min, e não .d.ts
import FOG from 'vanta/dist/vanta.fog.min'; 

const VantaBackground: React.FC = () => {
  // ... o resto do seu código continua igual
  const vantaRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = FOG({
        el: vantaRef.current,
        THREE: THREE,
        // ...outras propriedades
        highlightColor: 0x4f238c, 
        midtoneColor: 0x720f4b, 
        lowlightColor: 0x330859, 
        baseColor: 0x1a0529, 
        blurFactor: 0.6, 
        speed: 1.2,
        zoom: 0.8,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div ref={vantaRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1
    }} />
  );
};

export default VantaBackground;