"use client"

import { useEffect, useRef } from "react"

export function TesseractAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

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

    let rotationXY = 0
    let rotationXZ = 0
    let rotationXW = 0
    let rotationYZ = 0
    let rotationYW = 0
    let rotationZW = 0

    // Project 4D to 3D
    function project4Dto3D(vertex: number[], distance: number) {
      const w = vertex[3]
      const factor = distance / (distance - w)
      return [vertex[0] * factor, vertex[1] * factor, vertex[2] * factor]
    }

    // Project 3D to 2D
    function project3Dto2D(vertex: number[], distance: number) {
      const z = vertex[2]
      const factor = distance / (distance - z)
      return [vertex[0] * factor, vertex[1] * factor]
    }

    // Rotation matrices
    function rotateXY(vertex: number[], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [vertex[0] * cos - vertex[1] * sin, vertex[0] * sin + vertex[1] * cos, vertex[2], vertex[3]]
    }

    function rotateXZ(vertex: number[], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [vertex[0] * cos - vertex[2] * sin, vertex[1], vertex[0] * sin + vertex[2] * cos, vertex[3]]
    }

    function rotateXW(vertex: number[], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [vertex[0] * cos - vertex[3] * sin, vertex[1], vertex[2], vertex[0] * sin + vertex[3] * cos]
    }

    function rotateYZ(vertex: number[], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [vertex[0], vertex[1] * cos - vertex[2] * sin, vertex[1] * sin + vertex[2] * cos, vertex[3]]
    }

    function rotateYW(vertex: number[], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [vertex[0], vertex[1] * cos - vertex[3] * sin, vertex[2], vertex[1] * sin + vertex[3] * cos]
    }

    function rotateZW(vertex: number[], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [vertex[0], vertex[1], vertex[2] * cos - vertex[3] * sin, vertex[2] * sin + vertex[3] * cos]
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update rotation angles
      rotationXY += 0.005
      rotationXZ += 0.007
      rotationXW += 0.003
      rotationYZ += 0.006
      rotationYW += 0.004
      rotationZW += 0.008

      // Transform vertices
      const transformedVertices = vertices4D.map((vertex) => {
        let v = [...vertex]
        v = rotateXY(v, rotationXY)
        v = rotateXZ(v, rotationXZ)
        v = rotateXW(v, rotationXW)
        v = rotateYZ(v, rotationYZ)
        v = rotateYW(v, rotationYW)
        v = rotateZW(v, rotationZW)
        return v
      })

      // Project to 2D
      const projectedVertices = transformedVertices.map((vertex) => {
        const vertex3D = project4Dto3D(vertex, 4)
        const vertex2D = project3Dto2D(vertex3D, 4)
        return [vertex2D[0] * 100 + canvas.width / 2, vertex2D[1] * 100 + canvas.height / 2]
      })

      // Draw edges
      ctx.strokeStyle = "rgba(168, 85, 247, 0.3)" // Purple with transparency
      ctx.lineWidth = 1
      edges.forEach((edge) => {
        const start = projectedVertices[edge[0]]
        const end = projectedVertices[edge[1]]

        ctx.beginPath()
        ctx.moveTo(start[0], start[1])
        ctx.lineTo(end[0], end[1])
        ctx.stroke()
      })

      // Draw vertices
      ctx.fillStyle = "rgba(168, 85, 247, 0.6)" // Purple with transparency
      projectedVertices.forEach((vertex) => {
        ctx.beginPath()
        ctx.arc(vertex[0], vertex[1], 2, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 1 }}
    />
  )
}
