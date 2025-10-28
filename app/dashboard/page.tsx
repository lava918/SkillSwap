"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { ProfileCard } from "@/components/ProfileCard"
import { Button } from "@/components/Button"
import { mockUsers } from "@/data/mockUsers"
import { TrendingUp, Users, Heart, MessageSquare } from "lucide-react"

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

export default function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold text-foreground">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Here's what's happening in your skill exchange community</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { label: "Active Matches", value: "12", icon: Heart, color: "from-pink-400 to-pink-600" },
                { label: "Completed Exchanges", value: "7", icon: TrendingUp, color: "from-green-400 to-green-600" },
                { label: "Messages", value: "24", icon: MessageSquare, color: "from-blue-400 to-blue-600" },
                { label: "Followers", value: "245", icon: Users, color: "from-purple-400 to-purple-600" },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="bg-card rounded-xl border border-border p-6 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Your Matches Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Your Recent Matches</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {mockUsers.slice(0, 4).map((user) => (
                  <motion.div
                    key={user.id}
                    variants={itemVariants}
                    onClick={() => setSelectedUser(user.id)}
                    className="cursor-pointer"
                  >
                    <ProfileCard
                      id={user.id}
                      name={user.name}
                      avatar={user.avatar}
                      bio={user.bio}
                      skillsOffered={user.skillsOffered}
                      skillsWanted={user.skillsWanted}
                      onMessage={() => console.log(`Message ${user.name}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Suggested Users Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Suggested for You</h2>
                <Button variant="outline" size="sm">
                  Explore More
                </Button>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {mockUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    variants={itemVariants}
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Header with gradient */}
                    <div className="h-24 bg-gradient-warm relative">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="absolute bottom-0 left-4 w-20 h-20 rounded-full border-4 border-card shadow-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="pt-12 px-4 pb-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-foreground">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.location}</p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>

                      {/* Skills Preview */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Offers</p>
                          <div className="flex flex-wrap gap-1">
                            {user.skillsOffered.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="inline-block px-2 py-1 rounded-full text-xs bg-primary/20 text-primary font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Wants</p>
                          <div className="flex flex-wrap gap-1">
                            {user.skillsWanted.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="inline-block px-2 py-1 rounded-full text-xs bg-secondary/20 text-secondary-foreground font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button variant="secondary" size="sm" className="w-full">
                        <Heart className="w-4 h-4" />
                        Trade Skill
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
