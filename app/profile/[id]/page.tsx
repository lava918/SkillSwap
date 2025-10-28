"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { Tag } from "@/components/Tag"
import { Button } from "@/components/Button"
import { Modal } from "@/components/Modal"
import { mockUsers } from "@/data/mockUsers"
import { Edit, MessageSquare, Share2, Heart, TrendingUp, Users } from "lucide-react"

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

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = mockUsers[0]
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: user.name,
    bio: user.bio,
    location: user.location,
  })

  const handleSaveProfile = () => {
    setIsEditModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        {/* Main Content - improved responsive layout */}
        <main className="flex-1 overflow-auto w-full">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <motion.div
              variants={itemVariants}
              className="relative h-32 sm:h-40 md:h-48 bg-gradient-warm rounded-b-2xl sm:rounded-b-3xl shadow-lg"
            >
              {/* Avatar - improved responsive sizing */}
              <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-card shadow-xl"
                />
              </div>

              {/* Edit Button */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-white/20 text-white hover:bg-white/30 text-xs sm:text-sm"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  Edit Profile
                </Button>
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              variants={itemVariants}
              className="px-4 sm:px-8 pt-16 sm:pt-20 pb-6 sm:pb-8 space-y-4 sm:space-y-6"
            >
              {/* Name and Location */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{user.name}</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{user.location}</p>
              </div>

              {/* Bio */}
              <p className="text-base sm:text-lg text-foreground max-w-2xl">{user.bio}</p>

              {/* Stats */}
              <motion.div variants={containerVariants} className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md">
                {[
                  { label: "Matches", value: user.matches, icon: Heart },
                  { label: "Exchanges", value: user.exchanges, icon: TrendingUp },
                  { label: "Followers", value: user.followers, icon: Users },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      className="bg-card rounded-lg border border-border p-3 sm:p-4 text-center"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto mb-1 sm:mb-2" />
                      <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</p>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button variant="default" size="md" className="text-sm sm:text-base">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Button>
                <Button variant="secondary" size="md" className="text-sm sm:text-base">
                  <Share2 className="w-4 h-4" />
                  Share Profile
                </Button>
              </motion.div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              variants={itemVariants}
              className="px-4 sm:px-8 py-6 sm:py-8 border-t border-border space-y-6 sm:space-y-8"
            >
              {/* Skills Offered */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Skills I Offer</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {user.skillsOffered.map((skill) => (
                    <Tag key={skill} label={skill} variant="primary" />
                  ))}
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Skills I Want to Learn</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {user.skillsWanted.map((skill) => (
                    <Tag key={skill} label={skill} variant="secondary" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              variants={itemVariants}
              className="px-4 sm:px-8 py-6 sm:py-8 border-t border-border space-y-3 sm:space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Recent Activity</h2>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { action: "Started a skill exchange with Marcus Chen", time: "2 days ago" },
                  { action: "Completed a lesson in React.js", time: "1 week ago" },
                  { action: "Matched with Sofia Rodriguez", time: "2 weeks ago" },
                ].map((activity, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-lg border border-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Edit Profile Modal */}
          <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Bio</label>
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none text-sm"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">Location</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-4">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 bg-transparent text-sm"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="default" size="md" className="flex-1 text-sm" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  )
}
