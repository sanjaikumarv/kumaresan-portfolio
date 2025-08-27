"use client"

import { useEffect, useRef } from "react"

export function GlobalTesseractBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
    }> = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 60 + 270, // Purple to pink range
      })
    }

    // Tesseract vertices in 4D space
    const vertices4D = [
      [-1, -1, -1, -1],
      [1, -1, -1, -1],
      [1, 1, -1, -1],
      [-1, 1, -1, -1],
      [-1, -1, 1, -1],
      [1, -1, 1, -1],
      [1, 1, 1, -1],
      [-1, 1, 1, -1],
      [-1, -1, -1, 1],
      [1, -1, -1, 1],
      [1, 1, -1, 1],
      [-1, 1, -1, 1],
      [-1, -1, 1, 1],
      [1, -1, 1, 1],
      [1, 1, 1, 1],
      [-1, 1, 1, 1],
    ]

    // Tesseract edges
    const edges = [
      // Inner cube (w = -1)
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
      // Outer cube (w = 1)
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 8],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 12],
      [8, 12],
      [9, 13],
      [10, 14],
      [11, 15],
      // Connections between cubes
      [0, 8],
      [1, 9],
      [2, 10],
      [3, 11],
      [4, 12],
      [5, 13],
      [6, 14],
      [7, 15],
    ]

    const project4Dto3D = (vertex: number[], w: number) => {
      const distance = 3
      const factor = distance / (distance - vertex[3])
      return [vertex[0] * factor, vertex[1] * factor, vertex[2] * factor]
    }

    const project3Dto2D = (vertex: number[]) => {
      const distance = 5
      const factor = distance / (distance - vertex[2])
      return [vertex[0] * factor * 100 + canvas.width / 2, vertex[1] * factor * 100 + canvas.height / 2]
    }

    const rotateX = (vertex: number[], angle: number) => [
      vertex[0],
      vertex[1] * Math.cos(angle) - vertex[2] * Math.sin(angle),
      vertex[1] * Math.sin(angle) + vertex[2] * Math.cos(angle),
      vertex[3],
    ]

    const rotateY = (vertex: number[], angle: number) => [
      vertex[0] * Math.cos(angle) + vertex[2] * Math.sin(angle),
      vertex[1],
      -vertex[0] * Math.sin(angle) + vertex[2] * Math.cos(angle),
      vertex[3],
    ]

    const rotateZ = (vertex: number[], angle: number) => [
      vertex[0] * Math.cos(angle) - vertex[1] * Math.sin(angle),
      vertex[0] * Math.sin(angle) + vertex[1] * Math.cos(angle),
      vertex[2],
      vertex[3],
    ]

    const rotateW = (vertex: number[], angle: number) => [
      vertex[0] * Math.cos(angle) - vertex[3] * Math.sin(angle),
      vertex[1],
      vertex[2],
      vertex[0] * Math.sin(angle) + vertex[3] * Math.cos(angle),
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Animate size and opacity
        const pulseSize = particle.size + Math.sin(time * 2 + particle.x * 0.01) * 0.5
        const pulseOpacity = particle.opacity + Math.sin(time * 3 + particle.y * 0.01) * 0.1

        // Draw particle
        const isDark = document.documentElement.classList.contains("dark")
        ctx.fillStyle = `hsla(${particle.hue}, 70%, ${isDark ? "70%" : "50%"}, ${pulseOpacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = `hsla(${particle.hue}, 70%, ${isDark ? "70%" : "50%"}, 0.3)`
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulseSize * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Apply 4D rotations
      const rotatedVertices = vertices4D.map((vertex) => {
        let rotated = rotateX(vertex, time * 0.5)
        rotated = rotateY(rotated, time * 0.3)
        rotated = rotateZ(rotated, time * 0.7)
        rotated = rotateW(rotated, time * 0.4)
        return rotated
      })

      // Project to 2D
      const projectedVertices = rotatedVertices
        .map((vertex) => project4Dto3D(vertex, time))
        .map((vertex) => project3Dto2D(vertex))

      // Draw edges with gradient effect
      const isDark = document.documentElement.classList.contains("dark")
      const baseColor = isDark ? "rgba(168, 85, 247, " : "rgba(147, 51, 234, "

      edges.forEach((edge) => {
        const [start, end] = edge
        const startPoint = projectedVertices[start]
        const endPoint = projectedVertices[end]

        if (startPoint && endPoint) {
          const gradient = ctx.createLinearGradient(startPoint[0], startPoint[1], endPoint[0], endPoint[1])

          const opacity = 0.1 + 0.1 * Math.sin(time * 2 + start * 0.5)
          gradient.addColorStop(0, baseColor + opacity + ")")
          gradient.addColorStop(0.5, baseColor + (opacity + 0.1) + ")")
          gradient.addColorStop(1, baseColor + opacity + ")")

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(startPoint[0], startPoint[1])
          ctx.lineTo(endPoint[0], endPoint[1])
          ctx.stroke()
        }
      })

      // Draw vertices
      projectedVertices.forEach((vertex, index) => {
        if (vertex) {
          const size = 2 + Math.sin(time * 3 + index * 0.3) * 1
          const opacity = 0.2 + 0.2 * Math.sin(time * 2 + index * 0.5)

          ctx.fillStyle = baseColor + opacity + ")"
          ctx.beginPath()
          ctx.arc(vertex[0], vertex[1], size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.3 }} />
}
