'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ 
  position, 
  geometry, 
  color, 
  speed = 1 
}: { 
  position: [number, number, number]
  geometry: 'sphere' | 'torus' | 'octahedron' | 'icosahedron'
  color: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed
      meshRef.current.rotation.y += 0.003 * speed
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.002
    }
  })

  const geometryElement = useMemo(() => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[0.5, 16, 16]} />
      case 'torus':
        return <torusGeometry args={[0.4, 0.15, 16, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.5]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[0.4]} />
      default:
        return <sphereGeometry args={[0.5, 16, 16]} />
    }
  }, [geometry])

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometryElement}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

function Particles({ count = 200 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <Particles count={150} />
      
      <FloatingShape position={[-3, 2, -2]} geometry="torus" color="#60a5fa" speed={0.8} />
      <FloatingShape position={[3, -1, -3]} geometry="octahedron" color="#a855f7" speed={1.2} />
      <FloatingShape position={[-2, -2, -4]} geometry="icosahedron" color="#22d3ee" speed={0.6} />
      <FloatingShape position={[4, 2, -5]} geometry="sphere" color="#60a5fa" speed={1} />
      <FloatingShape position={[0, 3, -4]} geometry="torus" color="#a855f7" speed={0.9} />
      <FloatingShape position={[-4, 0, -3]} geometry="octahedron" color="#22d3ee" speed={1.1} />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
