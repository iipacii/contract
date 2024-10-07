'use client'

import { useState } from 'react'
import { LoginPageComponent } from '@/components/login-page'
import { ChatbotInterface } from '@/components/chatbot-interface'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt in Home component:', { email, password })
    if (email === 'owner@mail.com' && password === 'pass') {
      console.log('Login successful')
      setIsLoggedIn(true)
    } else {
      console.log('Login failed')
      // Optionally, you could pass an error message back to the LoginPageComponent
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {isLoggedIn ? (
        <ChatbotInterface />
      ) : (
        <LoginPageComponent onLogin={handleLogin} />
      )}
    </div>
  )
}
