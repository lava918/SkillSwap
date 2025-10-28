"use client"
import { cn } from "@/lib/utils"

interface TagProps {
  label: string
  variant?: "primary" | "secondary" | "accent" | "muted"
  onRemove?: () => void
}

const tagColors = {
  primary: "bg-primary/20 text-primary border border-primary/30",
  secondary: "bg-secondary/20 text-secondary-foreground border border-secondary/30",
  accent: "bg-accent/20 text-accent-foreground border border-accent/30",
  muted: "bg-muted text-muted-foreground border border-border",
}

export function Tag({ label, variant = "primary", onRemove }: TagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth",
        tagColors[variant],
      )}
    >
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 hover:opacity-70 transition-opacity" aria-label={`Remove ${label}`}>
          ×
        </button>
      )}
    </div>
  )
}
