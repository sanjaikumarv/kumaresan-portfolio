"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "UI/UX Designer & UI Developer",
    company: "AEGIIZ Technologies",
    location: "Coimbatore, Tamil Nadu",
    period: "Aug 2024 – Present",
    type: "Full-time",
    description:
      "Currently working as a UI/UX Designer and UI Developer, focusing on creating user-centric digital experiences and developing responsive front-end solutions.",
  },
  {
    title: "UI/UX Designing & Development Intern",
    company: "AEGIIZ Technologies",
    location: "Coimbatore, Tamil Nadu",
    period: "May 2024 – Jul 2024",
    type: "Internship",
    description:
      "Gained hands-on experience in UI/UX design and development, working on various projects and learning industry best practices.",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null) // Added title ref for animation
  const experienceRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("[v0] Experience section is intersecting, triggering animations")

            if (titleRef.current) {
              titleRef.current.classList.add("fade-in-up")
            }

            experienceRefs.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add("slide-in-left")
                }, index * 200)
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
    <section id="experience" ref={sectionRef} className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 opacity-0">
            Work <span className="gradient-text">Experience</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                ref={(el) => {
                  if (el) experienceRefs.current[index] = el
                }}
              
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <div className=" gap-4">
                    <div>
                      <CardTitle className="text-xl gradient-text">{exp.title}</CardTitle>
                      <p className="text-lg font-semibold text-foreground mt-1">{exp.company}</p>
                    </div>
                    <Badge variant={exp.type === "Full-time" ? "default" : "secondary"} className="w-fit">
                      {exp.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
