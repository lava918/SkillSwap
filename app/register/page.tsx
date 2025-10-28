"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/Button"
import { Tag } from "@/components/Tag"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [skillsOffered, setSkillsOffered] = useState<string[]>([])
  const [skillsWanted, setSkillsWanted] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [skillType, setSkillType] = useState<"offered" | "wanted">("offered")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      if (skillType === "offered") {
        setSkillsOffered((prev) => [...prev, skillInput.trim()])
      } else {
        setSkillsWanted((prev) => [...prev, skillInput.trim()])
      }
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string, type: "offered" | "wanted") => {
    if (type === "offered") {
      setSkillsOffered((prev) => prev.filter((s) => s !== skill))
    } else {
      setSkillsWanted((prev) => prev.filter((s) => s !== skill))
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 py-8 sm:py-12 px-4">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto">
        {/* Header - improved responsive text sizing */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mx-auto mb-3 sm:mb-4 text-3xl sm:text-4xl">
            易
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">Join SkillSwap</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Start trading skills and learning from the community
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
          <form onSubmit={handleRegister} className="p-6 sm:p-8 space-y-5 sm:space-y-6">
            {/* Name */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 sm:py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 sm:py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 pt-4 border-t border-border"
            >
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Your Skills</h3>

              {/* Skill Type Toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSkillType("offered")}
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${
                    skillType === "offered"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Skills I Offer
                </button>
                <button
                  type="button"
                  onClick={() => setSkillType("wanted")}
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${
                    skillType === "wanted"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Skills I Want
                </button>
              </div>

              {/* Skill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  placeholder={`Add a skill you ${skillType === "offered" ? "offer" : "want to learn"}...`}
                  className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                />
                <Button type="button" variant="secondary" size="md" onClick={addSkill} className="text-sm">
                  Add
                </Button>
              </div>

              {/* Skills Display */}
              <div className="space-y-3">
                {skillsOffered.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Skills Offered</p>
                    <div className="flex flex-wrap gap-2">
                      {skillsOffered.map((skill) => (
                        <Tag
                          key={skill}
                          label={skill}
                          variant="primary"
                          onRemove={() => removeSkill(skill, "offered")}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {skillsWanted.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Skills Wanted</p>
                    <div className="flex flex-wrap gap-2">
                      {skillsWanted.map((skill) => (
                        <Tag
                          key={skill}
                          label={skill}
                          variant="secondary"
                          onRemove={() => removeSkill(skill, "wanted")}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Join Now"}
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 sm:py-6 bg-secondary/30 border-t border-border text-center">
            <p className="text-xs sm:text-sm text-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6 px-2">
          By signing up, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  )
}
