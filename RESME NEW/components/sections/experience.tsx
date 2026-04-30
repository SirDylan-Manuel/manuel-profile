'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, Calendar, MapPin, Briefcase } from 'lucide-react'

const experiences = [
  {
    id: 1,
    title: 'IT Instructor & Laboratory Tech',
    company: 'Systems Plus Computer College',
    location: 'Quezon City Branch',
    period: 'October 2025 - April 2026',
    description: [
      'Taught Programming 1 & 3, Robotics 1, and Prototyping to Senior High School students, covering coding fundamentals, robotics applications, and hands-on project development',
      'Delivered tertiary-level instruction in Internet of Things (IoT) and Computer-Aided Design (CAD) to 3rd-year college students, focusing on connected systems, design principles, and industry-standard tools',
      'Installed and upgraded operating systems across laboratory computers as part of Laboratory Technician duties',
      'Managed and maintained laboratory network infrastructure, including troubleshooting and general IT support',
      'Provided IT support for IELTS examinations every Saturday, ensuring smooth and reliable technical operations',
    ],
    tags: ['Teaching', 'Programming', 'IoT', 'CAD', 'IT Support'],
  },
  {
    id: 2,
    title: 'Freelance Developer/Tutor',
    company: 'Freelance',
    location: 'Remote',
    period: '2024 - 2025',
    description: [
      'Assisted Senior High School students in designing and building prototypes for their academic projects',
      'Guided students in hardware assembly, wiring, and using Arduino components',
      'Provided troubleshooting support and suggested design improvements',
      'Promoted collaborative learning to help students understand and apply essential engineering concepts',
    ],
    tags: ['Arduino', 'Prototyping', 'Tutoring', 'Hardware'],
  },
  {
    id: 3,
    title: 'Internship/OJT',
    company: 'Batangas State University',
    location: 'Research Office Alangilan Campus',
    period: 'February 2025 - May 2025',
    description: [
      'Collaborated with a team to design and assemble solar-powered rain gauges with built-in Wi-Fi for remote weather data monitoring',
      'Assisted in circuit design, hardware assembly, and sensor integration to ensure accurate rainfall measurement and seamless data transmission',
      'Conducted testing and troubleshooting to enhance the system reliability and overall performance',
    ],
    tags: ['IoT', 'Solar Power', 'Research', 'Teamwork'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expandedId, setExpandedId] = useState<number | null>(1)

  return (
    <section id="experience" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground">
            My professional journey in education, development, and research.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-accent to-primary/30 sm:left-8 sm:block" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative sm:pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background sm:left-8 sm:block">
                  <div className="absolute inset-1 rounded-full bg-primary" />
                </div>

                {/* Card */}
                <motion.div
                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                    expandedId === exp.id
                      ? 'border-primary/50 bg-card/80'
                      : 'border-border/50 bg-card/30 hover:border-border'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                    className="flex w-full items-start justify-between p-6 text-left"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                        {exp.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-primary">
                        <Briefcase className="h-4 w-4" />
                        {exp.company}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 flex-shrink-0 text-muted-foreground"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  {/* Content */}
                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/50 px-6 pb-6 pt-4">
                          <ul className="space-y-3">
                            {exp.description.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
