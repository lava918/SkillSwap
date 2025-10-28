"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Send, Smile } from "lucide-react"
import { Button } from "./Button"

interface Message {
  id: number
  sender: "user" | "other"
  text: string
  timestamp: string
}

interface ChatBoxProps {
  messages: Message[]
  userName: string
  userAvatar: string
  onSendMessage?: (message: string) => void
}

export function ChatBox({ messages, userName, userAvatar, onSendMessage }: ChatBoxProps) {
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage?.(input)
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
          <Button variant="secondary" size="md" onClick={() => setIsTyping(!isTyping)} className="px-3">
            <Smile className="w-5 h-5" />
          </Button>
          <Button variant="default" size="md" onClick={handleSend} className="px-3">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
