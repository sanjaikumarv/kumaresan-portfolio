"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface AnimationWrapperProps {
  children: ReactNode
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right" | "scale-in" | "slide-in-up"
  delay?: number
  className?: string
}

export function AnimationWrapper({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
}: AnimationWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(animation)
            }, delay)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [animation, delay])

  return (
    <div ref={elementRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}
