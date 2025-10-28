"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LogOut, Settings } from "lucide-react"
import { Button } from "./Button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center text-white">易</div>
            <span className="hidden sm:inline">SkillSwap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/matches" className="text-foreground hover:text-primary transition-colors">
              Matches
            </Link>
            <Link href="/chat/1" className="text-foreground hover:text-primary transition-colors">
              Messages
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/profile/1">
              <img
                src="/diverse-user-avatars.png"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-primary hover:border-accent transition-colors cursor-pointer"
              />
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
              Dashboard
            </Link>
            <Link href="/matches" className="block px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
              Matches
            </Link>
            <Link href="/chat/1" className="block px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
              Messages
            </Link>
            <div className="px-4 py-2 space-y-2">
              <Link href="/profile/1" className="block">
                <Button variant="secondary" size="sm" className="w-full">
                  Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
