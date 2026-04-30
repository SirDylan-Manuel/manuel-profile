'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Phone, Mail, Facebook, MessageCircle, Send } from 'lucide-react'

const contactLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://www.facebook.com/dylan.manuel.58/',
    color: 'hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50',
    label: '@dylan.manuel.58',
  },
  {
    name: 'Phone',
    icon: Phone,
    href: 'tel:+639108641802',
    color: 'hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/50',
    label: '+63 910 864 1802',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:laurent.d.manuel@gmail.com',
    color: 'hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50',
    label: 'laurent.d.manuel@gmail.com',
  },
  {
    name: 'Indeed',
    icon: () => (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 1C5.1 1 0 6.1 0 12.5S5.1 24 11.5 24 23 18.9 23 12.5 17.9 1 11.5 1zm2.6 18.4c-.4.2-.8.3-1.3.3-.7 0-1.3-.2-1.7-.7-.4-.5-.6-1.1-.6-1.9V11h-1.4V9.5h1.4V7.2l2-.6v2.9h2v1.5h-2v5.7c0 .4.1.7.2.9.1.2.4.3.7.3.2 0 .5-.1.7-.2v1.7zm1.4-12.2c-.3 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8 0-.3.1-.6.3-.8.2-.2.5-.3.8-.3.3 0 .6.1.8.3.2.2.3.5.3.8 0 .3-.1.6-.3.8-.2.2-.5.3-.8.3zm1 12.2h-2V9.5h2v9.9z"/>
      </svg>
    ),
    href: 'https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-jobseeker-profile--profile-one-frontend',
    color: 'hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-500/50',
    label: 'Indeed Profile',
  },
  {
    name: 'Viber',
    icon: MessageCircle,
    href: 'viber://chat?number=%2B09917295339',
    color: 'hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/50',
    label: '+63 991 729 5339',
  },
  {
    name: 'Telegram',
    icon: Send,
    href: 'https://t.me/Dylan121802',
    color: 'hover:bg-sky-500/10 hover:text-sky-400 hover:border-sky-500/50',
    label: '@Dylan121802',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="contact" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-muted-foreground">
            {"Feel free to reach out for collaborations, opportunities, or just to say hello!"}
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactLinks.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-card/30 p-6 text-center backdrop-blur-sm transition-all duration-300 ${contact.color}`}
            >
              {/* Icon */}
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                  rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                }}
                transition={{ duration: 0.3 }}
                className="rounded-full bg-secondary p-4 text-muted-foreground transition-colors group-hover:bg-transparent"
              >
                <contact.icon className="h-6 w-6" />
              </motion.div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{contact.label}</p>
              </div>

              {/* Tooltip on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 10,
                }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full rounded-lg bg-foreground px-3 py-1 text-xs text-background"
              >
                Click to connect
                <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground" />
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Based in Caloocan City, Philippines
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Available for full-time opportunities and freelance projects
          </p>
        </motion.div>
      </div>
    </section>
  )
}
