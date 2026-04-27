"use client"

import { useEffect, useRef, useState } from "react"

class Particle {
  constructor() {
    this.pos = { x: 0, y: 0 }
    this.vel = { x: 0, y: 0 }
    this.acc = { x: 0, y: 0 }
    this.target = { x: 0, y: 0 }

    this.closeEnoughTarget = 100
    this.maxSpeed = 1.0
    this.maxForce = 0.1
    this.particleSize = 10
    this.isKilled = false

    this.startColor = { r: 0, g: 0, b: 0 }
    this.targetColor = { r: 0, g: 0, b: 0 }
    this.colorWeight = 0
    this.colorBlendRate = 0.01
  }

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx, drawAsPoints) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
    if (drawAsPoints) {
      ctx.fillRect(this.pos.x, this.pos.y, 2.5, 2.5)
    } else {
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  kill(width, height) {
    if (!this.isKilled) {
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
      this.target.x = randomPos.x
      this.target.y = randomPos.y

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0

      this.isKilled = true
    }
  }

  generateRandomPos(x, y, mag) {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }
}

const DEFAULT_WORDS = ["THE 7AM CLUB", "RUN", "VIBE", "CONNECT", "RAIPUR"]

export function ParticleTextEffect({ words = DEFAULT_WORDS }) {
  const canvasRef = useRef(null)
  const animationRef = useRef()
  const particlesRef = useRef([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const [isMobile, setIsMobile] = useState(false)
  const pixelSteps = isMobile ? 8 : 5
  const drawAsPoints = isMobile

  const generateRandomPos = (x, y, mag) => {
    const randomX = Math.random() * 1000
    const randomY = Math.random() * 500

    const direction = {
      x: randomX - x,
      y: randomY - y,
    }

    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag
      direction.y = (direction.y / magnitude) * mag
    }

    return {
      x: x + direction.x,
      y: y + direction.y,
    }
  }

  const nextWord = (word, canvas) => {
    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext("2d")

    // Dynamic font size based on canvas width
    const fontSize = Math.min(canvas.width / (word.length > 10 ? 8 : 5), 180)
    offscreenCtx.fillStyle = "white"
    offscreenCtx.font = `900 ${fontSize}px "Inter", "system-ui", "sans-serif"`
    offscreenCtx.textAlign = "center"
    offscreenCtx.textBaseline = "middle"
    // Place text in the gap between header and buttons
    const yPos = isMobile ? canvas.height * 0.45 : canvas.height * 0.55
    offscreenCtx.fillText(word, canvas.width / 2, yPos)

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    const newColor = {
      r: 100,
      g: 164,
      b: 60, // Darker Brand Green
    }

    const particles = particlesRef.current
    let particleIndex = 0

    const coordsIndexes = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      coordsIndexes.push(i)
    }

    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex
      const alpha = pixels[pixelIndex + 3]

      if (alpha > 0) {
        const x = (pixelIndex / 4) % canvas.width
        const y = Math.floor(pixelIndex / 4 / canvas.width)

        let particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()
          const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y
          particle.maxSpeed = Math.random() * 8 + 6 // Faster
          particle.maxForce = particle.maxSpeed * 0.08 // More agile
          particle.particleSize = Math.random() * 3 + 3
          particle.colorBlendRate = Math.random() * 0.04 + 0.01 // Faster color blend
          particles.push(particle)
        }

        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        
        // Vary the color slightly for a richer look - Darker Green/Olive variations
        particle.targetColor = {
          r: 51 + Math.floor(Math.random() * 53), // 51 to 104
          g: 105 + Math.floor(Math.random() * 54), // 105 to 159
          b: 30 + Math.floor(Math.random() * 26)  // 30 to 56
        }
        particle.colorWeight = 0
        particle.target.x = x
        particle.target.y = y
      }
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const particles = particlesRef.current

    ctx.fillStyle = "rgba(5, 5, 5, 0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()
      particle.draw(ctx, drawAsPoints)

      if (particle.isKilled) {
        if (
          particle.pos.x < 0 ||
          particle.pos.x > canvas.width ||
          particle.pos.y < 0 ||
          particle.pos.y > canvas.height
        ) {
          particles.splice(i, 1)
        }
      }
    }

    if (mouseRef.current.isPressed) {
      particles.forEach((particle) => {
        const distance = Math.sqrt(
          Math.pow(particle.pos.x - mouseRef.current.x, 2) + Math.pow(particle.pos.y - mouseRef.current.y, 2),
        )
        if (distance < 100) {
            if (mouseRef.current.isRightClick) {
                particle.kill(canvas.width, canvas.height)
            } else {
                // Push particles away
                const angle = Math.atan2(particle.pos.y - mouseRef.current.y, particle.pos.x - mouseRef.current.x)
                particle.acc.x += Math.cos(angle) * 5
                particle.acc.y += Math.sin(angle) * 5
            }
        }
      })
    }

    frameCountRef.current++
    if (frameCountRef.current % 120 === 0) { // Faster word change (2s at 60fps)
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      nextWord(words[wordIndexRef.current], canvas)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement
        const width = parent.clientWidth
        const height = parent.clientHeight || window.innerHeight
        canvasRef.current.width = width
        canvasRef.current.height = height
        setDimensions({ width, height })
        setIsMobile(width < 768)
        nextWord(words[wordIndexRef.current], canvasRef.current)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    animate()

    const canvas = canvasRef.current
    const handleMouseDown = (e) => {
      mouseRef.current.isPressed = true
      mouseRef.current.isRightClick = e.button === 2
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleContextMenu = (e) => e.preventDefault()

    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("contextmenu", handleContextMenu)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [words])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
      <canvas
        ref={canvasRef}
        className="cursor-crosshair w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  )
}
