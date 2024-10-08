'use client'

import { useState, useEffect } from 'react'
import { LoginPageComponent } from '@/components/login-page'
import { ChatbotInterface } from '@/components/chatbot-interface'
import { fetchData } from '../utils/langchain-setup';

export default function Home() {
  // Change this line to set isLoggedIn to true by default
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

  useEffect(() => {
    fetchData();
  }, []);

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
