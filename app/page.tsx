"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import Image from "next/image"
import { Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "PrimeBroth Packaging",
    category: "Branding & Packaging",
    image: "/images/primebroth-chicken.jpg",
    description: "Premium broth powder packaging design",
    height: "h-48",
  },
  {
    id: 2,
    title: "PrimalCare Products",
    category: "Product Design",
    image: "/images/primalcare-tallow.jpg",
    description: "Luxury skincare product branding",
    height: "h-80",
  },
  {
    id: 3,
    title: "Circular Brand Identity",
    category: "Logo Design",
    image: "/images/circular-logo.png",
    description: "Modern circular logo with gradient effects",
    height: "h-64",
  },
  {
    id: 4,
    title: "D'Arcy Thomson Law",
    category: "Web Design",
    image: "/images/darcy-thomson.png",
    description: "Professional legal services website",
    height: "h-72",
  },
  {
    id: 5,
    title: "Numerik App",
    category: "UI/UX Design",
    image: "/images/numerik-app.png",
    description: "Mobile app interface design",
    height: "h-56",
  },
  {
    id: 6,
    title: "Victoria St Health Club",
    category: "Branding",
    image: "/images/victoria-health.png",
    description: "Health club branding and signage",
    height: "h-96",
  },
  {
    id: 7,
    title: "Ngai Tahu Pounamu",
    category: "Web Design",
    image: "/images/ngai-tahu.png",
    description: "Authentic New Zealand greenstone website",
    height: "h-60",
  },
  {
    id: 8,
    title: "Miz Mooz Photography",
    category: "Photography",
    image: "/images/miz-mooz.png",
    description: "Creative product photography",
    height: "h-88",
  },
  {
    id: 9,
    title: "Watch App Interface",
    category: "App Design",
    image: "/images/watch-app.png",
    description: "Minimalist watch app design",
    height: "h-52",
  },
]

export default function MondoWebsite() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 30, damping: 15, restDelta: 0.001 })

  const homeRef = useRef(null)
  const workRef = useRef(null)
  const offeringsRef = useRef(null)
  const contactRef = useRef(null)

  const homeInView = useInView(homeRef, { threshold: 0.5 })
  const workInView = useInView(workRef, { threshold: 0.3 })
  const offeringsInView = useInView(offeringsRef, { threshold: 0.5 })
  const contactInView = useInView(contactRef, { threshold: 0.5 })

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const isLightSection = currentSection % 2 === 0
  const showTicker = !isLightSection

  // Smoother parallax transforms
  const yTransform = useTransform(smoothProgress, [0, 0.25], [0, -100])
  const yTransformWork = useTransform(smoothProgress, [0.25, 0.5], [0, -150])
  const yTransformOfferings = useTransform(smoothProgress, [0.5, 0.75], [0, -100])
  const yTransformContact = useTransform(smoothProgress, [0.75, 1], [0, -80])

  useEffect(() => {
    if (homeInView) setCurrentSection(0)
    else if (workInView) setCurrentSection(1)
    else if (offeringsInView) setCurrentSection(2)
    else if (contactInView) setCurrentSection(3)
  }, [homeInView, workInView, offeringsInView, contactInView])

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative">
      {/* Fixed Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            className={`text-xl md:text-2xl font-black transition-colors duration-300 ease-out ${isLightSection ? "text-black" : "text-white"}`}
            style={{ letterSpacing: "-1px" }}
          >
            MONDO
          </motion.div>
          <div className="flex space-x-4 md:space-x-8">
            {["WORK", "OFFERING", "CONTACT"].map((item, index) => (
              <motion.button
                key={item}
                className={`text-xs font-medium tracking-wide hover:opacity-70 transition-colors duration-300 ease-out ${isLightSection ? "text-black" : "text-white"}`}
                onClick={() => {
                  const refs = [workRef, offeringsRef, contactRef]
                  scrollToSection(refs[index])
                }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Home Section */}
      <section
        ref={homeRef}
        className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(1.2) contrast(0.8)" }}
        >
          <source src="/videos/m-o-n-d-o.mp4" type="video/mp4" />
        </video>

        {/* White overlay to maintain white background */}
        <div className="absolute inset-0 bg-white bg-opacity-95" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50"
          style={{
            y: yTransform,
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6">
          <motion.p
            className="text-xs font-light uppercase tracking-widest text-gray-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            DIGITAL EXCELLENCE
          </motion.p>
          <motion.h1
            className="text-2xl md:text-4xl lg:text-5xl font-black text-black mb-6 md:mb-8 leading-tight"
            style={{ letterSpacing: "-1px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          >
            BEAUTIFUL CREATIVE
            <br />
            MADE WITH MONDO CAN-DO
          </motion.h1>
          <motion.p
            className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
          >
            We craft exceptional digital experiences that push boundaries and redefine what's possible in the digital
            realm.
          </motion.p>
        </div>
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-3 md:w-4 h-5 md:h-6 border border-gray-400 rounded-full flex justify-center">
            <div className="w-0.5 h-1 md:h-1.5 bg-gray-400 rounded-full mt-1" />
          </div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section ref={workRef} className="min-h-screen bg-black py-12 md:py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
          style={{
            y: yTransformWork,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <motion.p
            className="text-xs font-light uppercase tracking-widest text-gray-500 mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            SHOWCASE
          </motion.p>
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-12 md:mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            WORK
          </motion.h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`break-inside-avoid ${item.height} w-full overflow-hidden bg-gray-800 cursor-pointer relative`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offering Section */}
      <section ref={offeringsRef} className="min-h-screen bg-white py-12 md:py-16 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"
          style={{
            y: yTransformOfferings,
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <motion.p
            className="text-xs font-light uppercase tracking-widest text-gray-500 mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            WHAT WE DO
          </motion.p>
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl font-black text-black mb-8 md:mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            OFFERING
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
            {[
              {
                title: "Brand Identity",
                description:
                  "Creating powerful visual identities that resonate with your audience and stand the test of time.",
              },
              {
                title: "Web Design",
                description:
                  "Crafting beautiful, functional websites that deliver exceptional user experiences across all devices.",
              },
              {
                title: "Digital Strategy",
                description:
                  "Developing comprehensive digital strategies that drive growth and maximize your online presence.",
              },
              {
                title: "UI/UX Design",
                description:
                  "Designing intuitive interfaces that prioritize user experience and drive meaningful interactions.",
              },
              {
                title: "Mobile Apps",
                description:
                  "Building native and cross-platform mobile applications that engage users and deliver results.",
              },
              {
                title: "Creative Direction",
                description:
                  "Providing strategic creative leadership to ensure your brand message is compelling and consistent.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-base md:text-lg font-bold text-black mb-3 md:mb-4"
                  style={{ letterSpacing: "-1px" }}
                >
                  {service.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Video Background */}
      <section ref={contactRef} className="min-h-screen bg-black py-12 md:py-20 relative overflow-hidden">
        {/* Video Background - Hidden on mobile for performance */}
        {!isMobile && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            style={{ filter: "blur(1px)" }}
          >
            <source src="/videos/m-o-n-d-o-.mp4" type="video/mp4" />
          </video>
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"
          style={{
            y: yTransformContact,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.p
            className="text-xs font-light uppercase tracking-widest text-gray-500 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            GET IN TOUCH
          </motion.p>
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            LET'S TALK
          </motion.h2>
          <motion.div
            className="space-y-4 md:space-y-6 mb-12 md:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 text-white text-sm">
              <Phone className="w-4 h-4" />
              <a href="tel:+64210296614" className="hover:opacity-70 transition-opacity duration-300">
                +64 210 296614
              </a>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white text-sm">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:hello@mondodigital.nz?subject=Enquiry from mondodigital.nz"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                hello@mondodigital.nz
              </a>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center space-x-6 mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {[
              { icon: Facebook, label: "Facebook", href: "https://facebook.com/mondodigitalnz" },
              { icon: Instagram, label: "Instagram", href: "https://instagram.com/mondodigitalnz" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/mondodigitalnz" },
            ].map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-opacity-20 transition-all duration-300 ease-out"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Text Ticker - Only show on dark sections */}
      {showTicker && (
        <div className="fixed bottom-0 left-0 right-0 z-40 overflow-hidden bg-transparent pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -2000] }}
            transition={{ duration: isMobile ? 60 : 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center text-white font-thin mx-8 md:mx-20"
                style={{
                  fontSize: isMobile ? "4rem" : "12rem",
                  letterSpacing: "-3px",
                  lineHeight: "1",
                }}
              >
                INNOVATIVE VISIONARY ADAPTIVE
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}
