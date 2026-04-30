'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { X, ExternalLink, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 1,
    title: 'Barangay Queuing System',
    image: '/images/projects/queuing-system.jpg',
    year: '2026',
    shortDescription: 'Local-host queue system with admin panel and dual display with ads',
    fullDescription: 'Developed a local-host-based queuing system for Barangay Pinagkaisahan featuring an admin panel and control panel for efficient queue management and operations. Integrated a dual-window queue display with an advertisement section, enhancing service flow while providing space for announcements and local promotions.',
    features: [
      'Admin panel for queue management',
      'Control panel for operations',
      'Dual-window queue display',
      'Advertisement section integration',
      'Local-host based system',
    ],
    techStack: ['Web Technologies', 'Local Server', 'Database'],
  },
  {
    id: 2,
    title: 'SafeToss - Smart Sanitation Bin',
    image: '/images/projects/safetoss.jpg',
    year: '2024',
    shortDescription: 'Arduino-based automatic trash bin with sanitizer system',
    fullDescription: 'Built an Arduino-based trash bin with an automatic lid and integrated hand sanitizer system. Programmed sensors to ensure safe and efficient operation, combining waste management with hygiene in a single smart device.',
    features: [
      'Automatic lid opening mechanism',
      'Integrated hand sanitizer dispenser',
      'Sensor-based touchless operation',
      'Arduino microcontroller',
      'Safe and efficient design',
    ],
    techStack: ['Arduino', 'Sensors', 'Servo Motors', 'C/C++'],
  },
  {
    id: 3,
    title: 'Solar Rain Gauge IoT',
    image: '/images/projects/rain-gauge.jpg',
    year: '2025',
    shortDescription: 'Wi-Fi-enabled rainfall monitoring system',
    fullDescription: 'Collaborated with a team to design and assemble solar-powered rain gauges with built-in Wi-Fi for remote weather data monitoring. Assisted in circuit design, hardware assembly, and sensor integration to ensure accurate rainfall measurement and seamless data transmission.',
    features: [
      'Solar-powered operation',
      'Wi-Fi connectivity for remote monitoring',
      'Accurate rainfall measurement',
      'Real-time data transmission',
      'Weather-resistant design',
    ],
    techStack: ['ESP8266/ESP32', 'Solar Panel', 'Rain Sensor', 'IoT'],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground">
            A showcase of my work in IoT, embedded systems, and software development.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ 
  project, 
  onClick 
}: { 
  project: typeof projects[0]
  onClick: () => void 
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full overflow-hidden rounded-xl border border-border/50 bg-card/30 text-left transition-all duration-300 hover:border-primary/50"
      whileHover={{ scale: 1.02 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {project.year}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 3D Tilt Effect Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, oklch(0.7 0.18 220 / 0.1) 0%, transparent 50%)'
            : 'transparent',
        }}
      />
    </motion.button>
  )
}

function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: typeof projects[0]
  onClose: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-primary">
            <Calendar className="h-4 w-4" />
            {project.year}
          </div>
          <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
            {project.title}
          </h3>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Close Project
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
