"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/Button"
import { Bell, Lock, Palette, Check } from "lucide-react"

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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: "alex@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    matches: true,
    messages: true,
    updates: false,
    newsletter: true,
  })

  const handleSave = () => {
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const tabs = [
    { id: "account", label: "Account", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col md:flex-row">
        <Sidebar />

        {/* Main Content - improved responsive layout */}
        <main className="flex-1 overflow-auto w-full">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8 space-y-2"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Manage your account preferences and settings</p>
            </motion.div>

            {/* Tabs - improved responsive tab layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 border-b border-border overflow-x-auto"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm transition-smooth border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </motion.div>

            {/* Tab Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 sm:space-y-6"
            >
              {/* Account Tab */}
              {activeTab === "account" && (
                <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                  {/* Email Section */}
                  <div className="bg-card rounded-xl border border-border p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">Email Address</h2>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
                        Current Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                      />
                    </div>
                    <Button variant="secondary" size="md" className="text-xs sm:text-sm">
                      Update Email
                    </Button>
                  </div>

                  {/* Password Section */}
                  <div className="bg-card rounded-xl border border-border p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">Change Password</h2>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-sm"
                      />
                    </div>

                    <Button variant="secondary" size="md" onClick={handleSave} className="text-xs sm:text-sm">
                      Update Password
                    </Button>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-destructive/10 rounded-xl border border-destructive/30 p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-destructive">Danger Zone</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button
                      variant="outline"
                      size="md"
                      className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent text-xs sm:text-sm"
                    >
                      Delete Account
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
                  <div className="bg-card rounded-xl border border-border p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {[
                      { key: "matches", label: "New Matches", description: "Get notified when you have a new match" },
                      { key: "messages", label: "Messages", description: "Get notified when you receive a message" },
                      {
                        key: "updates",
                        label: "App Updates",
                        description: "Get notified about new features and updates",
                      },
                      { key: "newsletter", label: "Newsletter", description: "Receive our weekly newsletter" },
                    ].map((notif) => (
                      <motion.div
                        key={notif.key}
                        variants={itemVariants}
                        className="flex items-center justify-between p-3 sm:p-4 bg-background rounded-lg border border-border"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground text-sm">{notif.label}</p>
                          <p className="text-xs text-muted-foreground">{notif.description}</p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [notif.key]: !notifications[notif.key as keyof typeof notifications],
                            })
                          }
                          className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                            notifications[notif.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <motion.div
                            layout
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                              notifications[notif.key as keyof typeof notifications] ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <Button variant="secondary" size="md" onClick={handleSave} className="text-xs sm:text-sm">
                    Save Preferences
                  </Button>
                </motion.div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                  <div className="bg-card rounded-xl border border-border p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">Theme</h2>

                    <div className="space-y-2 sm:space-y-3">
                      {[
                        { id: "light", label: "Light Mode", description: "Bright and clean interface" },
                        { id: "dark", label: "Dark Mode", description: "Easy on the eyes" },
                        { id: "auto", label: "Auto", description: "Follow system preferences" },
                      ].map((theme) => (
                        <motion.label
                          key={theme.id}
                          variants={itemVariants}
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-background rounded-lg border border-border cursor-pointer hover:border-primary transition-colors"
                        >
                          <input
                            type="radio"
                            name="theme"
                            value={theme.id}
                            checked={isDarkMode === (theme.id === "dark")}
                            onChange={() => setIsDarkMode(theme.id === "dark")}
                            className="w-4 h-4 accent-primary"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground text-sm">{theme.label}</p>
                            <p className="text-xs text-muted-foreground">{theme.description}</p>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <Button variant="secondary" size="md" onClick={handleSave} className="text-xs sm:text-sm">
                    Save Preferences
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Save Success Toast */}
            {showSaveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                Settings saved successfully!
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
