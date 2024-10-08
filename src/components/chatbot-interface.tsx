'use client'

import React, { useState, useEffect } from 'react'
import { Send, Home, Wrench, User, Bell, Menu, Loader } from 'lucide-react'
import { getAIResponse, getIssues, getContractors } from '@/utils/langchain-setup'

// Remove or comment out unused variables
// const mockIssues = [
//   { id: 1, description: "Leaky faucet in kitchen", category: "Plumbing" },
//   { id: 2, description: "Broken window in living room", category: "Carpentry" },
//   { id: 3, description: "HVAC not cooling properly", category: "HVAC" },
// ]

// const mockContractors = [
//   { id: 1, name: "John Doe", specialty: "Plumbing", rating: 4.5 },
//   { id: 2, name: "Jane Smith", specialty: "Carpentry", rating: 4.8 },
//   { id: 3, name: "Bob Johnson", specialty: "HVAC", rating: 4.2 },
// ]

// Add types for the ChatMessage props
interface ChatMessageProps {
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, content, timestamp }) => (
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

  useEffect(() => {
    // Initial message
    setMessages([
      { sender: 'bot', content: 'Welcome! How can I assist you today? You can ask to view issues, find contractors, or contact a contractor.', timestamp: new Date().toLocaleTimeString() },
    ])
  }, [])

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', content: input, timestamp: new Date().toLocaleTimeString() }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsTyping(true)

      try {
        const aiResponse = await getAIResponse(input)
        
        if (aiResponse === "Viewing issues...") {
          setMessages(prev => [...prev, { sender: 'bot', content: aiResponse, timestamp: new Date().toLocaleTimeString() }])
          const issues = getIssues()
          const issuesContext = `Here are the current issues:\n${issues.map((issue, index) => `${index + 1}. ${issue.description} (Raised by ${issue.raisedBy})`).join('\n')}\n\nPlease list these issues for the user.`
          const issuesResponse = await getAIResponse(issuesContext)
          setMessages(prev => [...prev, { sender: 'bot', content: issuesResponse, timestamp: new Date().toLocaleTimeString() }])
        } else if (aiResponse === "Finding contractors...") {
          setMessages(prev => [...prev, { sender: 'bot', content: aiResponse, timestamp: new Date().toLocaleTimeString() }])
          const contractors = getContractors()
          const contractorsContext = `Here are the available contractors:\n${contractors.map((contractor, index) => `${index + 1}. ${contractor.name} (${contractor.specialty}, Rating: ${contractor.rating}, Cost: ${contractor.cost})`).join('\n')}\n\nPlease list these contractors for the user and suggest the best one for fixing a leaky faucet.`
          const contractorsResponse = await getAIResponse(contractorsContext)
          setMessages(prev => [...prev, { sender: 'bot', content: contractorsResponse, timestamp: new Date().toLocaleTimeString() }])
        } else if (aiResponse === "Contacting contractor...") {
          setMessages(prev => [...prev, { sender: 'bot', content: aiResponse, timestamp: new Date().toLocaleTimeString() }])
          // Here you would implement the logic to contact a contractor
          // For now, we'll just send a follow-up message
          const contactingResponse = await getAIResponse("Please provide more details about which contractor you'd like to contact and for which issue.")
          setMessages(prev => [...prev, { sender: 'bot', content: contactingResponse, timestamp: new Date().toLocaleTimeString() }])
        } else {
          // For other responses, we'll pass the previous message context
          const previousMessage = messages[messages.length - 1].content
          const contextualResponse = await getAIResponse(`Previous message: "${previousMessage}"\nUser input: "${input}"\nPlease provide a helpful response based on this context.`)
          setMessages(prev => [...prev, { sender: 'bot', content: contextualResponse, timestamp: new Date().toLocaleTimeString() }])
        }
      } catch (error) {
        console.error('Error getting AI response:', error)
        setMessages(prev => [...prev, { sender: 'bot', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toLocaleTimeString() }])
      } finally {
        setIsTyping(false)
      }
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
                <ChatMessage key={index} {...message as ChatMessageProps} />
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