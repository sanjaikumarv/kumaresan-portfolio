"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Mail, Phone, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left mt-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Hi, I'm </span>
              <span className="gradient-text">Kumaresan</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
              I'm a <span className="gradient-text font-semibold">UI/UX Designer & UI Developer</span>
            </p>

            <p className="text-lg text-muted-foreground mb-8 max-w-[490px] leading-relaxed">
              Creative UI/UX Designer & UI Developer with 1 year of experience in building user-friendly interfaces
              and responsive web solutions. Skilled in design thinking, prototyping, and front-end development to
              deliver engaging digital experiences.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="https://github.com/KumaresanRaj" target="_blank" className="inline-flex rounded-md px-2 py-1 border hover:text-black bg-gradient-to-r  hover:bg-gradient-to-r  hover:from-primary/90 hover:to-accent/90">
                <Github className="mr-2 mt-1 h-4 w-4" />
                GitHub
              </Link>
              <Link href="https://www.linkedin.com/in/kumaresan-t" target="_blank" className="inline-flex rounded-md px-2 py-1 border hover:text-black bg-gradient-to-r  hover:bg-gradient-to-r  hover:from-primary/90 hover:to-accent/90">
                <Linkedin className="mr-2 mt-1 h-4 w-4" />
                LinkedIn
              </Link>
              <Link href="mailto:kumaresanraj388@gmail.com" target="_blank" className="inline-flex rounded-md px-2 py-1 border hover:text-black bg-gradient-to-r  hover:bg-gradient-to-r  hover:from-primary/90 hover:to-accent/90">
                <Mail className="mr-2 mt-1 h-4 w-4" />
                Email
              </Link>
              <Link href="tel:+916382323527" target="_blank" className="inline-flex rounded-md px-2 py-1 border hover:text-black bg-gradient-to-r  hover:bg-gradient-to-r  hover:from-primary/90 hover:to-accent/90">
                <Phone className="mr-2 mt-1 h-4 w-4" />
                Call
              </Link>
            </div>

            {/* Download Resume Button */}
            <Button
              onClick={() => window.location.href = "https://drive.google.com/file/d/1C94n1PozQ8JJWz3dSy31N0rVrp-FKtz3/view?usp=sharing"}
              size="lg"
              className="group bg-gradient-to-r hover:cursor-pointer from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Download className="mr-2 hover:cursor-pointer h-4 w-4 group-hover:scale-110 transition-transform" />
              Download Resume
            </Button>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-background">
                    <img
                      src="/kumaresan.jpeg"
                      alt="Kumaresan T - UI/UX Designer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Floating elements around profile */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm floating" />
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full blur-sm floating"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-1/2 -left-8 w-4 h-4 bg-secondary/20 rounded-full blur-sm floating"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button variant="ghost" size="icon" onClick={scrollToNext} className="animate-bounce">
            <ArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section >
  )
}
