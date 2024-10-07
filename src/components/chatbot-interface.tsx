'use client'

import React, { useState } from 'react'
import { Send, Home, Wrench, User, Bell, Menu, ChevronDown, Loader } from 'lucide-react'

const ChatMessage = ({ sender, content, timestamp }) => (
  <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] p-3 rounded-lg ${sender === 'user' ? 'bg-[#5BC0BE] text-white' : 'bg-white'}`}>
      <p className="text-sm">{content}</p>
      <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
    </div>
  </div>
)

export function ChatbotInterface() {
  const [messages, setMessages] = useState([
    { sender: 'bot', content: 'Hello! How can I assist you today?', timestamp: '10:00 AM' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', content: input, timestamp: '10:05 AM' }])
      setInput('')
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, { sender: 'bot', content: "I understand you're reporting an issue. Can you please provide more details about the problem?", timestamp: '10:06 AM' }])
      }, 2000)
    }
  }

  return (
    <div className="bg-[#F0F4F8] text-[#1C2541] font-['Inter']">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 text-[#3A506B] cursor-pointer hover:text-[#5BC0BE] transition-colors" />
            <h1 className="text-2xl font-bold font-['Poppins'] bg-gradient-to-r from-[#3A506B] to-[#5BC0BE] text-transparent bg-clip-text">
              HomeRepair AI
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-[#3A506B] cursor-pointer hover:text-[#5BC0BE] transition-colors" />
            <div className="w-8 h-8 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 font-['Poppins']">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 bg-[#3A506B] text-white rounded-md hover:bg-[#5BC0BE] transition-colors flex items-center justify-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Report Issue</span>
              </button>
              <button className="w-full py-2 px-4 bg-[#3A506B] text-white rounded-md hover:bg-[#5BC0BE] transition-colors flex items-center justify-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>Find Contractor</span>
              </button>
              <button className="w-full py-2 px-4 bg-[#3A506B] text-white rounded-md hover:bg-[#5BC0BE] transition-colors flex items-center justify-center space-x-2">
                <User className="h-5 w-5" />
                <span>My Profile</span>
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 font-['Poppins']">Active Issues</h2>
            <div className="space-y-4">
              {['Leaky Faucet', 'Broken Window', 'HVAC Maintenance'].map((issue, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{issue}</span>
                  <span className="px-2 py-1 bg-[#5BC0BE] text-white text-xs rounded-full">In Progress</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat Interface */}
        <section className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold font-['Poppins']">AI Assistant</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} {...message} />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>AI is typing...</span>
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-4 rounded-full bg-[#F0F4F8] focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]"
                />
                <button
                  onClick={handleSend}
                  className="p-2 rounded-full bg-[#5BC0BE] text-white hover:bg-[#3A506B] transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#3A506B] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">&copy; 2023 HomeRepair AI. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#5BC0BE] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#5BC0BE] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#5BC0BE] transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}