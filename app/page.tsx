"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Zap, Heart, Code, Palette, Music, BookOpen, Briefcase, Globe } from "lucide-react"
import { Button } from "@/components/Button"
import { Navbar } from "@/components/Navbar"
import { testimonials, skillCategories } from "@/data/mockUsers"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Music: <Music className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Briefcase: <Briefcase className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-6 sm:space-y-8"
          >
            {/* Main Heading - improved responsive text sizing and line breaking */}
            <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight sm:leading-tight md:leading-snug text-balance">
                Trade Skills.{" "}
                <span className="bg-gradient-warm bg-clip-text text-transparent block sm:inline">Learn Anything.</span>{" "}
                <span className="block">Grow Together.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
                Connect with a vibrant community of learners and experts. Exchange your skills, build meaningful
                relationships, and unlock your potential.
              </p>
            </motion.div>

            {/* CTA Buttons - improved responsive layout */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-2 sm:px-0"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="default" size="lg" className="group w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Sign In
                </Button>
              </Link>
            </motion.div>

            {/* Stats - improved responsive grid and spacing */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-2 sm:gap-4 pt-8 sm:pt-12 max-w-md mx-auto text-center px-2 sm:px-0"
            >
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-3xl font-bold text-primary">2.5K+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-3xl font-bold text-accent">500+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Skill Exchanges</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-2xl sm:text-3xl font-bold text-secondary">98%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 px-2 sm:px-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">How It Works</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started in three simple steps and begin your learning journey
              </p>
            </motion.div>

            {/* Steps */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {[
                {
                  step: 1,
                  title: "Create Your Profile",
                  description: "Sign up and tell us what skills you offer and what you want to learn.",
                  icon: Users,
                },
                {
                  step: 2,
                  title: "Find Your Match",
                  description: "Browse through our community and find people with complementary skills.",
                  icon: Heart,
                },
                {
                  step: 3,
                  title: "Start Learning",
                  description: "Connect, chat, and begin your skill exchange journey together.",
                  icon: Zap,
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.step}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="relative bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-lg"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 px-2 sm:px-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                Popular Skill Categories
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the most sought-after skills in our community
              </p>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {skillCategories.map((category) => (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 sm:p-8 text-white shadow-lg cursor-pointer transition-smooth`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                      {iconMap[category.icon]}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-white/80">Explore {category.name.toLowerCase()} skills</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 px-2 sm:px-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
                What Our Community Says
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from real learners who transformed their skills
              </p>
            </motion.div>

            {/* Testimonials Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-lg"
                >
                  {/* Quote */}
                  <p className="text-base sm:text-lg text-foreground mb-6 italic">"{testimonial.quote}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-primary flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-warm rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center text-black shadow-2xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
              Ready to Start Trading Skills?
            </h2>
            <p className="text-base sm:text-lg text-black/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of learners and experts who are already transforming their careers through skill exchange.
            </p>
            <Link href="/register" className="inline-block">
              <Button variant="default" size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                Join SkillSwap Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center text-white flex-shrink-0">
                  易
                </div>
                <span className="truncate">SkillSwap</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Trade skills, learn anything, grow together.</p>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies", "License"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
            <p className="text-muted-foreground">© 2025 SkillSwap. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="https://lavanya-sharma0.vercel.app/" className="text-muted-foreground hover:text-primary transition-colors">
                Developer
              </a>
              <a href="https://linkedin.com/in/lavanya-sharma-329b41246" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/lava918/SkillSwap.git" className="text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
