"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar } from "lucide-react"

const education = [
  {
    degree: "Master of Computer Applications",
    institution: "Dr SNS Rajalakshmi College of Arts & Science",
    location: "Coimbatore",
    period: "2022 - 2024",
    type: "Master's Degree",
  },
  {
    degree: "Bachelor of Computer Applications",
    institution: "Dr SNS Rajalakshmi College of Arts & Science",
    location: "Coimbatore",
    period: "2019 - 2022",
    type: "Bachelor's Degree",
  },
]

const certifications = [
  {
    title: 'Workshop on "Sensors & IoT"',
    issuer: "Sri Ramakrishna Engineering College",
    date: "Nov 2023",
    type: "Workshop",
  },
  {
    title: "Certificate of Internship - UI/UX Designing & Development",
    issuer: "Aegiiz Technologies",
    date: "Jul 2024",
    type: "Internship Certificate",
  },
  {
    title: "TCS iON Career Edge - Young Professional",
    issuer: "Tata Consultancy Services (TCS iON)",
    date: "Aug 2025",
    type: "Professional Certificate",
  },
]

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const educationRefs = useRef<HTMLDivElement[]>([])
  const certificationRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up")
            educationRefs.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add("slide-in-left")
                }, index * 150)
              }
            })
            certificationRefs.current.forEach((card, index) => {
              if (card) {
                setTimeout(
                  () => {
                    card.classList.add("slide-in-right")
                  },
                  (index + 2) * 150,
                )
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
    <section id="education" ref={sectionRef} className=" bg-muted/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 opacity-0">
            Education & <span className="gradient-text">Certifications</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <Card
                    key={index}
                    ref={(el) => {
                      if (el) educationRefs.current[index] = el
                    }}
                    className="backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg gradient-text">{edu.degree}</CardTitle>
                          <p className="text-foreground font-medium mt-1">{edu.institution}</p>
                          <p className="text-muted-foreground text-sm">{edu.location}</p>
                        </div>
                        <Badge variant="outline">{edu.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{edu.period}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-accent" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card
                    key={index}
                    ref={(el) => {
                      if (el) certificationRefs.current[index] = el
                    }}
                    className="backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg gradient-text">{cert.title}</CardTitle>
                          <p className="text-foreground font-medium mt-1">{cert.issuer}</p>
                        </div>
                        <Badge variant="secondary">{cert.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{cert.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
