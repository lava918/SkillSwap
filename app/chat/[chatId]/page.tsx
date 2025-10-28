"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { ChatBox } from "@/components/ChatBox"
import { Button } from "@/components/Button"
import { mockChats } from "@/data/mockUsers"
import { Phone, Video, MoreVertical, Search, X } from "lucide-react"

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [messages, setMessages] = useState(selectedChat.messages)
  const [showChatList, setShowChatList] = useState(true)

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: "user" as const,
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages([...messages, newMessage])
  }

  const filteredChats = mockChats.filter((chat) => chat.userName.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)] flex-col md:flex-row">
        <Sidebar />

        {/* Chat Container */}
        <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
          {/* Chat List Sidebar - improved responsive visibility */}
          {showChatList && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full md:w-80 border-r border-border bg-card flex flex-col"
            >
              {/* Header */}
              <div className="p-3 sm:p-4 border-b border-border space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Messages</h2>
                  <button
                    onClick={() => setShowChatList(false)}
                    className="md:hidden p-1 hover:bg-secondary rounded-lg transition-colors"
                    aria-label="Close chat list"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto space-y-2 p-2">
                {filteredChats.map((chat) => (
                  <motion.button
                    key={chat.id}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setSelectedChat(chat)
                      setMessages(chat.messages)
                      setShowChatList(false)
                    }}
                    className={`w-full p-2 sm:p-3 rounded-lg transition-smooth text-left text-sm ${
                      selectedChat.id === chat.id
                        ? "bg-primary/20 border border-primary"
                        : "hover:bg-secondary/50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={chat.avatar || "/placeholder.svg"}
                        alt={chat.userName}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-foreground truncate text-xs sm:text-sm">{chat.userName}</h3>
                          {chat.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{chat.timestamp}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 flex flex-col bg-background hidden md:flex"
          >
            {/* Chat Header */}
            <div className="border-b border-border p-3 sm:p-4 flex items-center justify-between bg-card">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={selectedChat.avatar || "/placeholder.svg"}
                  alt={selectedChat.userName}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-sm sm:text-base truncate">{selectedChat.userName}</h3>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Button variant="ghost" size="sm" className="px-2">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="px-2">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="px-2">
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-hidden">
              <ChatBox
                messages={messages}
                userName={selectedChat.userName}
                userAvatar={selectedChat.avatar}
                onSendMessage={handleSendMessage}
              />
            </div>
          </motion.div>

          {/* Mobile Chat View */}
          {!showChatList && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col bg-background md:hidden"
            >
              {/* Chat Header */}
              <div className="border-b border-border p-3 sm:p-4 flex items-center justify-between bg-card">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowChatList(true)}
                    className="p-1 hover:bg-secondary rounded-lg transition-colors"
                    aria-label="Back to chat list"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img
                    src={selectedChat.avatar || "/placeholder.svg"}
                    alt={selectedChat.userName}
                    className="w-10 h-10 rounded-full border-2 border-primary flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground text-sm truncate">{selectedChat.userName}</h3>
                    <p className="text-xs text-muted-foreground">Active now</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="px-2">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="px-2">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-hidden">
                <ChatBox
                  messages={messages}
                  userName={selectedChat.userName}
                  userAvatar={selectedChat.avatar}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </motion.div>
          )}

          {/* Desktop Empty State */}
          <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-background">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-secondary-foreground" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Select a conversation</h2>
              <p className="text-sm text-muted-foreground">Choose a chat from the list to start messaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
