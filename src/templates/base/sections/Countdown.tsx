'use client'

import { useState, useEffect } from 'react'
import type { SectionProps } from '../types'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown({ content, config }: SectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  if (!content.sections || !(content.sections as any).countdown) return null

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const weddingDate = new Date(content.weddingDate).getTime()
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [content.weddingDate])

  if (!timeLeft) return null

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{
            fontFamily: config.fonts.heading,
            color: config.colors.text,
          }}
        >
          Counting Down to Our Big Day
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timeUnits.map(({ label, value }) => (
            <div
              key={label}
              className="p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: 'white' }}
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                  fontFamily: config.fonts.heading,
                  color: config.colors.primary,
                }}
              >
                {value}
              </div>
              <div
                className="text-sm md:text-base uppercase tracking-wider"
                style={{
                  fontFamily: config.fonts.body,
                  color: config.colors.text,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
