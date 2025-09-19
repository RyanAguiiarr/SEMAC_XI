import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

export const FloatingDodecahedron = ({
  position,
}: {
  position: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const springs = useSpring({
    from: { scale: [0, 0, 0] as [number, number, number] },
    to: { scale: [1, 1, 1] as [number, number, number] },
    config: { mass: 2, tension: 170, friction: 20 },
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={springs.scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshPhongMaterial
        color="#4F238C"
        shininess={100}
        specular={new THREE.Color("#720F4B")}
      />
    </animated.mesh>
  );
};

export const FloatingTorus = ({
  position,
}: {
  position: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime()) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const springs = useSpring({
    from: { scale: [0, 0, 0] as [number, number, number] },
    to: { scale: [1, 1, 1] as [number, number, number] },
    config: { mass: 2, tension: 170, friction: 20 },
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={springs.scale}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshPhongMaterial
        color="#720F4B"
        shininess={100}
        specular={new THREE.Color("#4F238C")}
      />
    </animated.mesh>
  );
};

export const FloatingOctahedron = ({
  position,
}: {
  position: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  const springs = useSpring({
    from: { scale: [0, 0, 0] as [number, number, number] },
    to: { scale: [1, 1, 1] as [number, number, number] },
    config: { mass: 2, tension: 170, friction: 20 },
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={springs.scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhongMaterial
        color="#330859"
        shininess={100}
        specular={new THREE.Color("#4F238C")}
      />
    </animated.mesh>
  );
};
