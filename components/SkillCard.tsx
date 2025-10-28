"use client"
import { motion } from "framer-motion"
import { Tag } from "./Tag"
import { Button } from "./Button"
import { Heart } from "lucide-react"

interface SkillCardProps {
  id: number
  name: string
  avatar: string
  bio: string
  skillsOffered: string[]
  skillsWanted: string[]
  onTrade?: () => void
  onSkip?: () => void
}

export function SkillCard({ id, name, avatar, bio, skillsOffered, skillsWanted, onTrade, onSkip }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden transition-smooth"
    >
      {/* Header with Avatar */}
      <div className="relative h-32 bg-gradient-warm">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          className="absolute bottom-0 left-6 w-24 h-24 rounded-full border-4 border-card shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="pt-16 px-6 pb-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{bio}</p>
        </div>

        {/* Skills Offered */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Skills Offered</p>
          <div className="flex flex-wrap gap-2">
            {skillsOffered.map((skill) => (
              <Tag key={skill} label={skill} variant="primary" />
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Wants to Learn</p>
          <div className="flex flex-wrap gap-2">
            {skillsWanted.map((skill) => (
              <Tag key={skill} label={skill} variant="secondary" />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" size="md" className="flex-1 bg-transparent" onClick={onSkip}>
            Skip
          </Button>
          <Button variant="default" size="md" className="flex-1" onClick={onTrade}>
            <Heart className="w-4 h-4" />
            Trade Skill
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
