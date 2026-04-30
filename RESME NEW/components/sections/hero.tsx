'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Eye, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/three/scene-3d'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-background" />,
})

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/backgrounds/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* 3D Scene */}
      <Scene3D />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-8"
        >
          <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-primary/30 glow-blue sm:h-48 sm:w-48">
            <Image
              src="/images/profile/profile.jpg"
              alt="Laurent Dylan P. Manuel"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          <span className="text-glow-cyan">LAURENT DYLAN</span>
          <br />
          <span className="text-primary">P. MANUEL</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          <span className="font-medium text-foreground">Computer Engineering Graduate</span>
          {' | '}
          <span className="text-primary">IT Instructor</span>
          {' | '}
          <span className="text-accent">IoT & Robotics Developer</span>
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mb-10 max-w-xl text-base text-muted-foreground italic sm:text-lg"
        >
          {'"Building smart systems, teaching future innovators, and designing connected technologies."'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-blue sm:w-auto"
            onClick={() => scrollToSection('#projects')}
          >
            <Eye className="h-5 w-5" />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full gap-2 border-accent/50 text-accent hover:bg-accent/10 sm:w-auto"
            onClick={() => scrollToSection('#contact')}
          >
            <Mail className="h-5 w-5" />
            Contact Me
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </motion.div>

      {/* Cursor Glow Effect */}
      <CursorGlow />
    </section>
  )
}

function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }
  }

  return (
    <div
      className="absolute inset-0 -z-5 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={cursorRef}
        className="pointer-events-none fixed h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, oklch(0.7 0.18 220 / 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
