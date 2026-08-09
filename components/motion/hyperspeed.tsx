'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function Hyperspeed() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x000000, 8, 55)
        const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100)
        camera.position.set(0, 2.4, 7)
        camera.lookAt(0, 0, -22)
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        mount.appendChild(renderer.domElement)

        const road = new THREE.Mesh(
            new THREE.PlaneGeometry(13, 80),
            new THREE.MeshBasicMaterial({ color: 0x03040a }),
        )
        road.rotation.x = -Math.PI / 2
        road.position.set(0, -0.25, -28)
        scene.add(road)

        const runners: THREE.Mesh[] = []
        const addRunner = (x: number, color: number, z: number, length = 4) => {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(0.045, 0.025, length),
                new THREE.MeshBasicMaterial({ color }),
            )
            mesh.position.set(x, -0.16, z)
            scene.add(mesh)
            runners.push(mesh)
        }

        for (let z = -68; z < 8; z += 7) {
            addRunner(-4.8, 0x818cf8, z, 2.8)
            addRunner(4.8, 0x4f6ef7, z - 2, 2.8)
            addRunner(-0.08, 0x6366f1, z - 1, 1.7)
            addRunner(0.08, 0x6366f1, z + 2.5, 1.7)
        }

        const railMaterial = new THREE.LineBasicMaterial({ color: 0x3349b8, transparent: true, opacity: 0.65 })
        for (const x of [-5.8, -5.1, 5.1, 5.8]) {
            const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, -0.15, 7), new THREE.Vector3(x * 0.08, -0.15, -70)])
            scene.add(new THREE.Line(geometry, railMaterial))
        }

        const resize = () => {
            const width = mount.clientWidth
            const height = mount.clientHeight
            renderer.setSize(width, height, false)
            camera.aspect = width / Math.max(height, 1)
            camera.updateProjectionMatrix()
        }
        const observer = new ResizeObserver(resize)
        observer.observe(mount)
        resize()

        let frame = 0
        let animationFrame = 0
        const animate = () => {
            frame += 0.04
            for (const runner of runners) {
                runner.position.z += 0.42
                if (runner.position.z > 8) runner.position.z -= 77
            }
            camera.position.x = Math.sin(frame * 0.18) * 0.12
            renderer.render(scene, camera)
            animationFrame = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            cancelAnimationFrame(animationFrame)
            observer.disconnect()
            renderer.dispose()
            mount.removeChild(renderer.domElement)
        }
    }, [])

    return <div ref={mountRef} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(79,110,247,0.3),transparent_44%),#000]" aria-hidden="true" />
}
