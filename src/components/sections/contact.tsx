import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowRight, 
  Facebook, 
  Youtube, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { PrivacyPolicyDialog, TermsAndConditionsDialog, LegalInfoDialog } from '@/components/legal/legal-dialogs'

export const ContactSection = () => {
  // Make the component responsive for all screen sizes
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Option 1: Using EmailJS (Add this script to your index.html)
      // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
      
      if (typeof window !== 'undefined' && (window as any).emailjs) {
        const emailjs = (window as any).emailjs
        
        // Initialize EmailJS with your public key
        emailjs.init('YOUR_EMAILJS_PUBLIC_KEY') // Replace with your actual key
        
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'your-email@example.com' // Your email address
        }
        
        await emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          templateParams
        )
        
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        // Fallback: Simulate form submission (for development)
        setTimeout(() => {
          toast({
            title: "Message sent successfully!",
            description: "We'll get back to you within 24 hours.",
          })
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 1000)
      }
    } catch (error) {
      console.error('Error sending email:', error)
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Subscribed successfully!",
      description: "Thank you for subscribing to our newsletter.",
    })
  }

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Creative Comrades CTA Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-4 sm:px-6 w-full">
        <div className="container mx-auto text-center w-full">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-foreground leading-tight px-2 sm:px-4">
              Not limited to video,<span className="inline xs:hidden"> </span><br className="hidden xs:inline" />
              we're your creative comrades.
            </h2>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2 sm:px-4">
              Got questions, project ideas, or just want to say hi? We're all ears!
            </p>
            <Button 
              size="lg" 
              className="px-5 xs:px-6 sm:px-8 md:px-12 py-2 xs:py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg rounded-full magnetic-hover active:scale-95 touch-manipulation"
              onClick={scrollToContact}
            >
              Let's Collaborate
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-10 sm:py-12 md:py-16 lg:py-24 bg-background px-4 sm:px-6 w-full">
        <div className="container mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Get in Touch</h3>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    Your footage + my passion = something extraordinary. Let's make it happen!
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-accent/10 flex-shrink-0">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div className="hidden">
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Address</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">123 Artistic Lane, Suite 302<br />New York, NY 10001, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-accent/10 flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Email</h4>
                    <a href="mailto:" className="text-muted-foreground hover:text-accent transition-colors text-sm sm:text-base">
                      contact@storystream.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-accent/10 flex-shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Phone</h4>
                    <a href="tel:+14165551234" className="text-muted-foreground hover:text-accent transition-colors text-sm sm:text-base">
                      (416) 555-1234
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-accent/10 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sm sm:text-base">Business Hours</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">Available when you need me — just contact for work</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-elegant">
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Send us a message</h4>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's your project about?"
                    required
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    rows={4}
                    required
                    className="rounded-lg resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity rounded-lg py-3 sm:py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-card border-t border-border px-4 sm:px-6">
        <div className="container mx-auto py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            {/* Newsletter */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Subscribe to our newsletter for the latest projects, industry insights, and creative inspiration.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <Input 
                    type="email" 
                    placeholder="name@email.com"
                    className="flex-1 rounded-full"
                    required
                  />
                  <Button type="submit" className="px-4 sm:px-6 rounded-full whitespace-nowrap text-sm">
                    Subscribe
                  </Button>
                </form>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div>
                    <div className="flex items-end space-x-2">
                      <span className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-[#FF7300] dark:text-[#FF7300]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>
                        THE
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold tracking-widest uppercase text-[#22223B] dark:text-white" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.12em' }}>
                        UNSUNG
                      </span>
                      <span className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-[#FF7300] dark:text-[#FF7300]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.08em' }}>
                        EDITOR
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Crafting stories that captivate & convert
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><a href="#home" className="text-muted-foreground hover:text-accent transition-colors text-sm">HOME</a></li>
                <li><a href="#showcase" className="text-muted-foreground hover:text-accent transition-colors text-sm">SHOWCASE</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-accent transition-colors text-sm">SERVICES</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-accent transition-colors text-sm">ABOUT</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-accent transition-colors text-sm">CONTACT</a></li>
              </ul>
            </div>

            {/* Legal & Social */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 sm:mb-6 text-sm sm:text-base">Legal</h3>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li><PrivacyPolicyDialog /></li>
                <li><TermsAndConditionsDialog /></li>
                <li><LegalInfoDialog /></li>
              </ul>

              <div>
                <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h4>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <a href="#" className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all group">
                    <Facebook className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all group">
                    <Youtube className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all group">
                    <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all group">
                    <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:bg-accent/10 transition-all group">
                    <Instagram className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-xs sm:text-sm">
                ©2025 ❤️ THE UNSUNG EDITOR. All rights reserved.
            </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                  Developed by 🚀Gx.
              </p>
          </div>
        </div>
      </footer>
    </>
  )
}