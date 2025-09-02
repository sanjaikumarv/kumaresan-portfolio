"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react"
import { sendEmail } from "@/lib/sendEmail"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const contactFormRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await sendEmail(formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("[v0] Contact section is intersecting, triggering animations")

            const titleElement = entry.target.querySelector("h2")
            if (titleElement) {
              titleElement.classList.add("fade-in-up")
            }

            setTimeout(() => {
              if (contactInfoRef.current) {
                contactInfoRef.current.classList.add("slide-in-left")
              }
            }, 200)

            setTimeout(() => {
              if (contactFormRef.current) {
                contactFormRef.current.classList.add("slide-in-right")
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
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl font-bold text-center mb-12 opacity-0">
            Get In <span className="gradient-text">Touch</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div ref={contactInfoRef} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 gradient-text">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                  want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">6382323527</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">kumaresanraj388@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/kumaresan-t"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-secondary transition-colors"
                    >
                      linkedin.com/in/kumaresan-t
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Coimbatore, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card
              ref={contactFormRef}
              className="backdrop-blur-sm bg-card/20 border-border/30 hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="gradient-text">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input id="name" name="name" value={formData.name}
                        onChange={handleChange} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input id="email" name="email" value={formData.email}
                        onChange={handleChange} type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input id="subject" value={formData.subject}
                      onChange={handleChange} name='subject' placeholder="What's this about?" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea id="message" value={formData.message}
                      onChange={handleChange} name='message' placeholder="Tell me about your project or just say hello!" rows={5} />
                  </div>

                  <Button type="submit" className="w-full group">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
