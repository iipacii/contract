'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

interface LoginPageComponentProps {
  onLogin: (email: string, password: string) => string | null
}

export function LoginPageComponent({ onLogin }: LoginPageComponentProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    console.log('Login attempt:', { email, password })

    if (!email || !password) {
      setError('Please fill in all fields')
      console.log('Login error: Empty fields')
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long')
      console.log('Login error: Password too short')
      return
    }

    console.log('Calling onLogin function')
    const errorMessage = onLogin(email, password)
    if (errorMessage) {
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-center font-['Poppins'] bg-gradient-to-r from-[#3A506B] to-[#5BC0BE] text-transparent bg-clip-text">
            HomeRepair AI
          </h1>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-[#1C2541]">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#5BC0BE] focus:border-[#5BC0BE] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#5BC0BE] focus:border-[#5BC0BE] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3A506B] hover:bg-[#5BC0BE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5BC0BE] transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <a href="#" className="font-medium text-[#5BC0BE] hover:text-[#3A506B] transition-colors duration-200">
            Forgot your password?
          </a>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-[#5BC0BE] hover:text-[#3A506B] transition-colors duration-200">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}