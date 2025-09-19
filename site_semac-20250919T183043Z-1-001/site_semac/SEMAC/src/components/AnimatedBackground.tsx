import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

const AnimatedSpheres: React.FC = () => {
  const props = useSpring({
    loop: true,
    from: { scale: 1, positionY: 0 },
    to: { scale: 1.2, positionY: 0.5 },
    config: { duration: 3000 },
  });

  return (
    <a.mesh scale={props.scale} position-y={props.positionY}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#4F238C"
        emissive="#720F4B"
        metalness={0.8}
        roughness={0.2}
      />
    </a.mesh>
  );
};
const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = event;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX / width) * 2 - 1;
      const y = -(clientY / height) * 2 + 1;

      // Adicionando parallax ao mover o mouse
      containerRef.current.style.transform = `translate(${x * 20}px, ${
        y * 20
      }px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        transition: "transform 0.1s ease-out",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: "linear-gradient(to bottom, #1a0529, #330859)" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#4F238C" />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <AnimatedSpheres />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
