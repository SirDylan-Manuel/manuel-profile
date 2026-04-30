'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Code, Cpu, Wifi, Wrench, Users } from 'lucide-react'

const highlights = [
  {
    icon: GraduationCap,
    title: 'IT Instructor',
    description: 'Teaching Programming, Robotics, IoT, and CAD to Senior High and College students',
  },
  {
    icon: Code,
    title: 'Freelance Developer',
    description: 'Guiding students in hardware assembly, Arduino projects, and prototype development',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Experience with Arduino, ESP8266/ESP32, and sensor integration for IoT solutions',
  },
  {
    icon: Wifi,
    title: 'IoT Developer',
    description: 'Building connected systems with Wi-Fi modules for remote monitoring and data transmission',
  },
  {
    icon: Wrench,
    title: 'CAD & Prototyping',
    description: 'Designing and building physical prototypes with industry-standard CAD tools',
  },
  {
    icon: Users,
    title: 'Laboratory Tech',
    description: 'Managing lab infrastructure, OS installations, and providing IT support',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-lg text-muted-foreground">
            I am a <span className="font-medium text-foreground">Computer Engineering graduate</span> from 
            Batangas State University with a passion for building innovative solutions. Currently working as an 
            <span className="text-primary"> IT Instructor & Laboratory Technician</span> at Systems Plus Computer College, 
            I combine my technical expertise with a drive to educate and inspire the next generation of tech professionals.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
