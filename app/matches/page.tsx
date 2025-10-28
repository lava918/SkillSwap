"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { SkillCard } from "@/components/SkillCard"
import { Button } from "@/components/Button"
import { mockUsers } from "@/data/mockUsers"
import { Heart, Sparkles } from "lucide-react"

export default function MatchesPage() {
  const [users, setUsers] = useState(mockUsers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matchedUser, setMatchedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const currentUser = users[currentIndex]

  const handleTrade = () => {
    setMatchedUser(currentUser)
    setShowConfetti(true)
    setTimeout(() => {
      handleNext()
      setShowConfetti(false)
    }, 2000)
  }

  const handleSkip = () => {
    handleNext()
  }

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        {/* Main Content - improved responsive layout */}
        <main className="flex-1 overflow-auto w-full">
          <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto h-full flex flex-col">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8 space-y-2"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Find Your Match</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Swipe through our community and find people with complementary skills
              </p>
            </motion.div>

            {/* Match Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex items-center justify-between gap-4"
            >
              <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                {currentIndex + 1} of {users.length}
              </div>
              <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-warm"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / users.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center relative px-2 sm:px-0">
              <AnimatePresence mode="wait">
                {currentUser && (
                  <motion.div
                    key={currentUser.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md"
                  >
                    <SkillCard
                      id={currentUser.id}
                      name={currentUser.name}
                      avatar={currentUser.avatar}
                      bio={currentUser.bio}
                      skillsOffered={currentUser.skillsOffered}
                      skillsWanted={currentUser.skillsWanted}
                      onTrade={handleTrade}
                      onSkip={handleSkip}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confetti Animation */}
              {showConfetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 1,
                        x: Math.random() * 400 - 200,
                        y: -10,
                      }}
                      animate={{
                        opacity: 0,
                        y: window.innerHeight,
                      }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 0.2,
                      }}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#ff6b6b", "#ffd93d", "#6bcf7f", "#4d96ff"][Math.floor(Math.random() * 4)],
                        left: "50%",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Match Success Modal */}
            <AnimatePresence>
              {matchedUser && showConfetti && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                    className="bg-card rounded-2xl sm:rounded-3xl border-2 border-primary p-6 sm:p-8 text-center shadow-2xl pointer-events-auto max-w-sm"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-warm flex items-center justify-center mx-auto mb-4"
                    >
                      <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">It's a Match!</h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4">
                      You and {matchedUser.name} are a great fit. Start chatting now!
                    </p>
                    <Button variant="default" size="md" className="text-sm sm:text-base">
                      <Sparkles className="w-4 h-4" />
                      Start Chatting
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {users.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-secondary-foreground" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">No more matches</h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                  You've reviewed all available users. Check back later for new matches!
                </p>
                <Button variant="secondary" size="md" className="text-sm sm:text-base">
                  Refresh
                </Button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
