'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { SVGLoader } from 'three-stdlib'
import { BRAIN_GEARS_SVG } from '@/data/brain-gears-svg'

// Parse SVG once
const parsedPaths = (() => {
  if (typeof window === 'undefined') return []
  const loader = new SVGLoader()
  // SVG needs to be wrapped in proper XML for the loader if it lacks xmlns
  const svgString = BRAIN_GEARS_SVG.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  return loader.parse(svgString).paths
})()

export default function ThreeBrainGears({ 
  activeGearId, 
  litGearIds,
  onGearClick 
}: { 
  activeGearId: string | null
  litGearIds: string[]
  onGearClick?: (id: string) => void
}) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 block" style={{ opacity: 1, pointerEvents: 'none', background: 'transparent' }}>
      <Canvas 
        camera={{ position: [0, 0, 500], fov: 45 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#2dd4bf" />
        
        <Center>
          <group scale={[0.5, -0.5, 0.5]} position={[0, 0, 0]}>
             <BrainMesh activeGearId={activeGearId} litGearIds={litGearIds} onGearClick={onGearClick} />
          </group>
        </Center>
        
        <Environment preset="city" />
        
        {/* Particle system when activated */}
        {activeGearId && (
          <Sparkles count={100} scale={400} size={4} color="#2dd4bf" speed={0.4} opacity={0.6} />
        )}
      </Canvas>
    </div>
  )
}

function BrainMesh({ 
  activeGearId, 
  litGearIds,
  onGearClick 
}: { 
  activeGearId: string | null
  litGearIds: string[]
  onGearClick?: (id: string) => void
}) {
  const groupRef = useRef<THREE.Group>(null)

  // Floating Parallax / Idle rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  const shapes = useMemo(() => {
    return parsedPaths.map((p) => {
      const node = p.userData?.node as Element | undefined
      const id = node?.id || node?.parentElement?.id || (node?.parentNode as Element)?.id || ''

      // ONLY allow explicit gear IDs
      if (!id.includes('gear-')) return null;

      // The original SVG uses <path fill="#D9D9D9"> for drop shadow filters which SVGLoader hallucinates into solid gray blocks!
      // All real 3D gears use linear gradients: fill="url(#paint...)"
      const fill = node?.getAttribute('fill') || ''
      if (!fill.startsWith('url')) return null;

      const shapeList = SVGLoader.createShapes(p)
      
      // Compute bounding box and point cloud density
      let bb = new THREE.Box3()
      let totalPts = 0
      shapeList.forEach(s => {
          let pts = s.getPoints()
          totalPts += pts.length
          pts.forEach(pt => bb.expandByPoint(new THREE.Vector3(pt.x, pt.y, 0)))
      })
      
      const size = new THREE.Vector3()
      bb.getSize(size)
      
      // Keep only reasonably complex shapes that are large enough to be gears but small enough not to be the canvas
      if (totalPts < 15) return null
      if (size.x > 1800 || size.y > 1700) return null

      return {
        path: p,
        shapes: shapeList,
        id
      }
    }).filter(Boolean) as { path: any, shapes: any[], id: string }[]
  }, [])

  return (
    <group ref={groupRef}>
      {shapes.map((item, index) => (
        <GearMesh 
          key={index} 
          item={item} 
          isActive={activeGearId === item.id}
          isLit={litGearIds.includes(item.id)}
          onClick={() => {
             if (item.id && onGearClick) onGearClick(item.id)
          }}
        />
      ))}
    </group>
  )
}

function GearMesh({ 
  item, 
  isActive, 
  isLit,
  onClick 
}: { 
  item: any
  isActive: boolean
  isLit: boolean
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Subtle rotation for each gear
  useFrame((state) => {
    if (meshRef.current) {
      // Gears should rotate slowly, even more if active
      const speed = isLit ? 1 : 0.2
      const direction = item.id?.includes('bg') ? -1 : 1
      meshRef.current.rotation.z += 0.01 * speed * direction
    }
  })

  // Material properties
  const color = isActive ? '#2dd4bf' : (isLit ? '#14b8a6' : (hovered ? '#ffffff' : '#3f3f46'))
  const emissive = isActive ? new THREE.Color('#2dd4bf') : (isLit ? new THREE.Color('#0d9488') : new THREE.Color('#000000'))
  const emissiveIntensity = isActive ? 0.8 : (isLit ? 0.4 : 0)

  return (
    <group>
      {item.shapes.map((shape: any, index: number) => (
        <mesh 
          key={index} 
          ref={meshRef}
          onClick={(e) => {
             e.stopPropagation()
             onClick()
          }}
          onPointerOver={(e) => {
             e.stopPropagation()
             setHovered(true)
             document.body.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
             setHovered(false)
             document.body.style.cursor = 'auto'
          }}
        >
          <extrudeGeometry 
            args={[shape, { 
              depth: isActive ? 20 : (isLit ? 10 : 5), 
              bevelEnabled: true,
              bevelThickness: 1,
              bevelSize: 0.5,
              bevelSegments: 2
            }]} 
          />
          <meshStandardMaterial 
            color={color} 
            metalness={0.8}
            roughness={0.2}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            transparent={true}
            opacity={item.id?.includes('bg') ? 0.5 : 0.9}
          />
        </mesh>
      ))}
    </group>
  )
}
