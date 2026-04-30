'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Cpu, 
  Radio, 
  Wifi, 
  Network, 
  PenTool, 
  MessageSquare, 
  Lightbulb, 
  Users, 
  Target,
  Clock
} from 'lucide-react'

const technicalSkills = [
  { name: 'Arduino / Embedded Systems', level: 90, icon: Cpu },
  { name: 'Sensor Integration', level: 85, icon: Radio },
  { name: 'ESP8266 / ESP32', level: 85, icon: Wifi },
  { name: 'Networking & IT Support', level: 80, icon: Network },
  { name: 'CAD & Prototyping', level: 75, icon: PenTool },
]

const softSkills = [
  { name: 'Communication', icon: MessageSquare, description: 'Excellent interpersonal and communication abilities' },
  { name: 'Problem-solving', icon: Lightbulb, description: 'Analytical thinking and creative solutions' },
  { name: 'Teamwork', icon: Users, description: 'Effective collaboration and independent work' },
  { name: 'Detail-oriented', icon: Target, description: 'Highly organized and meticulous approach' },
  { name: 'Time Management', icon: Clock, description: 'Strong task prioritization skills' },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground">
            A blend of technical expertise in embedded systems and IoT, combined with strong soft skills 
            developed through teaching and collaborative project work.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-8 text-xl font-semibold text-foreground">
              <span className="text-primary">//</span> Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <skill.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                      className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-accent transition-shadow ${
                        hoveredSkill === skill.name ? 'shadow-[0_0_10px_oklch(0.7_0.18_220)]' : ''
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-8 text-xl font-semibold text-foreground">
              <span className="text-accent">//</span> Soft Skills
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-card/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-accent/10 p-2 text-accent transition-colors group-hover:bg-accent/20">
                      <skill.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{skill.name}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
