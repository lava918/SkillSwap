"use client"
import { motion } from "framer-motion"
import { Tag } from "./Tag"
import { Button } from "./Button"
import { MessageSquare } from "lucide-react"

interface ProfileCardProps {
  id: number
  name: string
  avatar: string
  bio: string
  skillsOffered: string[]
  skillsWanted: string[]
  onMessage?: () => void
}

export function ProfileCard({ id, name, avatar, bio, skillsOffered, skillsWanted, onMessage }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-xl border border-border shadow-md overflow-hidden transition-smooth"
    >
      {/* Avatar */}
      <div className="relative h-40 bg-gradient-warm flex items-center justify-center">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          className="w-24 h-24 rounded-full border-4 border-card shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{bio}</p>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Offers</p>
            <div className="flex flex-wrap gap-1">
              {skillsOffered.slice(0, 2).map((skill) => (
                <Tag key={skill} label={skill} variant="primary" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Wants</p>
            <div className="flex flex-wrap gap-1">
              {skillsWanted.slice(0, 2).map((skill) => (
                <Tag key={skill} label={skill} variant="secondary" />
              ))}
            </div>
          </div>
        </div>

        {/* Action */}
        <Button variant="secondary" size="sm" className="w-full" onClick={onMessage}>
          <MessageSquare className="w-4 h-4" />
          Message
        </Button>
      </div>
    </motion.div>
  )
}
