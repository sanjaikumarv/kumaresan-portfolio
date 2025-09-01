"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Figma } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Physi Guru Application",
    description:
      "Customized workout routines for different types of body pain and step-by-step exercise instructions. Improve mobility, reduce pain, and promote a healthier lifestyle.",
    role: "User Interface & User Experience",
    technologies: ["Figma"],
    category: "Mobile App Design",
    image: '/project/fizic.jpeg'
  },
  {
    title: "Covenant Health Insurance – Web Application (Freelance)",
    description:
      "Description: Healthcare insurance platform with streamlined navigation, responsive layouts, and accessible design tailored for patient and provider needs.",
    role: "User Interface & User Experience",
    technologies: ["Figma", "Wireframing", "Prototyping", "Usability Testing"],
    category: "Mobile App Design",
    image: ''
  },
  {
    title: "New Trend Website",
    description:
      "Modern car buying platform with intuitive browsing, advanced filtering, and a seamless user experience.",
    role: "User Interface & User Experience",
    technologies: ["Figma", "Wireframing", "Prototyping", "Usability Testing"],
    category: "Web Design",
    image: '/project/trent.jpeg'
  },
  {
    title: "NRI 2 NATIVE",
    description:
      '"NRI2Native" offers comprehensive support for NRIs, including shipping, property management, legal, financial, and family services—all in one place.',
    role: "User Interface & User Experience",
    technologies: ["Figma"],
    category: "Web Platform",
    image: '/project/nri.jpeg'
  },
  {
    title: "Agon",
    description:
      '"Agon" is a modern business platform web application designed to empower digital growth through a combination of innovative features and user-centric design. Tailored for startups and agencies.',
    role: "UI Developer",
    technologies: ["HTML", "CSS", "Bootstrap"],
    image: '/project/agon.jpeg',
    category: "Web Development",
  },
  {
    title: "Tournament Poster",
    description:
      'To promote sportsmanship, uncover local cricketing talent, and unite the community through a spirited and competitive tournament.',
    role: "UI Developer",
    technologies: ["Adobe PhotoShop"],
    image: '/project/cricket.jpeg',
    category: "Poster",
  },
  {
    title: "Gatezway",
    description:
      'To inform aspiring building workers about the essential qualifications, skills, and certifications needed to work safely and legally in Australia’s construction industry',
    role: "UI Developer",
    technologies: ["Adobe PhotoShop"],
    image: '/project/gatesway.jpeg',
    category: "Poster",
  },
  {
    title: "Career Zone",
    description:
      'To help students explore global education opportunities and guide them toward studying in top international universities.',
    role: "UI Developer",
    technologies: ["Adobe PhotoShop"],
    image: '/project/carrier.jpeg',
    category: "Poster",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("[v0] Projects section is intersecting, triggering animations")

            if (titleRef.current) {
              titleRef.current.classList.add("fade-in-up")
            }

            projectsRef.current.forEach((project, index) => {
              if (project) {
                setTimeout(
                  () => {
                    const animation = index % 2 === 0 ? "fade-in-left" : "fade-in-right"
                    project.classList.add(animation)
                  },
                  (index + 1) * 200,
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
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 opacity-0">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                ref={(el) => {
                  if (el) projectsRef.current[index] = el
                }}
                className="backdrop-blur-sm bg-card/20 border-border/30 hover:shadow-xl transition-all duration-300 group opacity-0"
              >
                <CardHeader>
                  <Image alt='image' width={600} className="rounded-md" height={100} src={project.image || '/placeholder.svg'} />
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-xl gradient-text group-hover:scale-105 transition-transform origin-left">
                        {project.title}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Role: {project.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech === "Figma" && <Figma className="w-3 h-3 mr-1" />}
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
