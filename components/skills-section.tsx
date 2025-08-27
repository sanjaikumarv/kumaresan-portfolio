"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "UI/UX Design",
    skills: ["UI/UX Design", "Graphic Design", "Figma", "User Experience (UX)", "User Interface (UI)"],
  },
  {
    title: "Web Technologies",
    skills: ["JavaScript", "Bootstrap", "CSS3", "HTML"],
  },
  {
    title: "Development",
    skills: ["Flutter Flow", "Shopify", "Power Apps", "Power BI"],
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("[v0] Skills section is intersecting, triggering animations")

            if (titleRef.current) {
              titleRef.current.classList.add("fade-in-up")
              console.log("[v0] Added fade-in-up to skills title")
            }

            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add("bounce-in")
                  console.log(`[v0] Added bounce-in to skills card ${index}`)
                }, index * 100)
              }
            })
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
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 opacity-0">
            My <span className="gradient-text">Skills</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="backdrop-blur-sm bg-card/20 border-border/30 hover-lift hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg gradient-text">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`text-white hover:scale-105 transition-transform`}
                        style={{ animationDelay: `${skillIndex * 50}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
