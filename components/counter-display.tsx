"use client"

import { useEffect, useState } from "react"

interface CounterProps {
  value?: number
  label?: string
  prefix?: string
}

function AnimatedCounter({ value = 0, prefix = "" }: { value: number; prefix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-3xl md:text-4xl font-bold text-blue">
      {prefix}
      {count.toLocaleString()}
    </span>
  )
}

export default function CounterDisplay({ value, label, prefix }: CounterProps) {
  // If props are provided, render single counter
  if (value !== undefined && label) {
    return (
      <div className="text-center">
        <AnimatedCounter value={value} prefix={prefix} />
        <p className="text-blue-600 mt-2">{label}</p>
      </div>
    )
  }

  // Otherwise render the full stats grid
  const stats = [
    { value: 1250000, label: "Total Raised", prefix: "$" },
    { value: 15000, label: "Active Donors", prefix: "" },
    { value: 350, label: "Campaigns", prefix: "" },
    { value: 42, label: "States", prefix: "" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat, index) => (
        <div key={index}>
          <AnimatedCounter value={stat.value} prefix={stat.prefix} />
          <p className="text-blue-600 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
