"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("[v0] About section is intersecting, triggering animations")

            if (titleRef.current) {
              titleRef.current.classList.add("fade-in-up")
            }

            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.add("scale-in")
              }
            }, 200)

            setTimeout(() => {
              if (detailsRef.current) {
                detailsRef.current.classList.add("fade-in-right")
              }
            }, 400)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 opacity-0">
            About <span className="gradient-text">Me</span>
          </h2>

          <Card ref={cardRef} className="backdrop-blur-sm bg-card/20 border-border/30 hover-lift opacity-0">
            <CardContent className="p-8">
              <div className="items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 gradient-text">UI/UX Developer</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    I'm a passionate UI/UX Designer and UI Developer with 1 year of hands-on experience in crafting
                    user-centric digital experiences. I specialize in translating complex requirements into intuitive,
                    engaging interfaces and developing responsive front-end solutions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    My approach combines design thinking with technical expertise to create meaningful digital
                    experiences that not only look great but also solve real user problems.
                  </p>
                </div>

                <div ref={detailsRef} className="space-x-4 mt-2 md:flex">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
                    <span className="ml-2 text-sm font-medium"> Phone: 6382323527</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
                    <span className="ml-2 text-sm font-medium"> Email: kumaresanraj388@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
                    <span className="ml-2 text-sm font-medium"> Location: Coimbatore, Tamil Nadu</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full pulse-glow"></div>
                    <span className="ml-2 text-sm font-medium"> Experience: 1+ Years</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
