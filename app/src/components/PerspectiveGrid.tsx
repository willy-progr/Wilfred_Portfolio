'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function PerspectiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setClearColor(0xffffff, 0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Grid construction — 20x20 sparse grid
    const geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15)
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0f1a2e'),
      emissive: new THREE.Color('#4eb5ff'),
      emissiveIntensity: 0.1,
      metalness: 0.5,
      roughness: 0.35,
    })

    const cubes: THREE.Mesh[] = []
    const gridSize = 20
    const spacing = 0.5

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Sparse grid — skip some cells for visual interest
        if (Math.random() > 0.6) continue

        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = (col - gridSize / 2) * spacing
        cube.position.y = (row - gridSize / 2) * spacing
        cube.position.z = 0
        cube.userData.initX = cube.position.x
        cube.userData.initY = cube.position.y
        cube.userData.phase = Math.random() * Math.PI * 2
        scene.add(cube)
        cubes.push(cube)
      }
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(-5, -5, 5)
    scene.add(pointLight)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Visibility tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0 }
    )
    observer.observe(container)

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      const time = Date.now() * 0.001

      // Update cubes
      cubes.forEach((cube) => {
        cube.position.z = Math.sin(time + cube.userData.phase) * 0.3
        cube.rotation.x = time * 0.5 + cube.userData.phase
        cube.rotation.y = time * 0.3 + cube.userData.phase
      })

      // CSS 3D tilt on container
      if (container) {
        container.style.transform = `rotateX(${mouseRef.current.y * 8}deg) rotateY(${mouseRef.current.x * 8}deg)`
      }

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        pointerEvents: 'none',
      }}
    />
  )
}
