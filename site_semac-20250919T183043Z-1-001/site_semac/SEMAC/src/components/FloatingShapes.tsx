import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Torus, Dodecahedron, Octahedron } from '@react-three/drei';

interface FloatingProps {
  position: [number, number, number];
}

export const FloatingTorus: React.FC<FloatingProps> = ({ position }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Torus args={[1, 0.3, 16, 32]} position={position} ref={meshRef}>
      <meshStandardMaterial color="#720F4B" wireframe />
    </Torus>
  );
};

export const FloatingDodecahedron: React.FC<FloatingProps> = ({ position }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Dodecahedron args={[1]} position={position} ref={meshRef}>
      <meshStandardMaterial color="#4F238C" wireframe />
    </Dodecahedron>
  );
};

export const FloatingOctahedron: React.FC<FloatingProps> = ({ position }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Octahedron args={[1]} position={position} ref={meshRef}>
      <meshStandardMaterial color="#61DAFB" wireframe />
    </Octahedron>
  );
};
