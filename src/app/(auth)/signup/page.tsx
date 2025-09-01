"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Check } from 'lucide-react'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Calculate password strength
    if (field === 'password') {
      let strength = 0
      if (value.length >= 8) strength++
      if (/[A-Z]/.test(value)) strength++
      if (/[a-z]/.test(value)) strength++
      if (/\d/.test(value)) strength++
      if (/[^A-Za-z\d]/.test(value)) strength++
      setPasswordStrength(strength)
    }
  }

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return { text: 'Weak', color: 'text-red-500' }
      case 2:
      case 3: return { text: 'Medium', color: 'text-yellow-500' }
      case 4:
      case 5: return { text: 'Strong', color: 'text-green-500' }
      default: return { text: '', color: '' }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle signup logic here
      console.log('Signup attempt:', formData)
    }, 2000)
  }

  const passwordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-base-50 to-primary-100 flex">
      {/* Left Side - Image/Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary-500/20 to-primary-700/30" />
        {/* Replace this div with your image */}
        {/* <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h3 className="font-playfair text-3xl mb-4">
              Begin Your Transformation
            </h3>
            <p className="font-sans text-lg opacity-90 max-w-md mb-6">
              Join thousands of souls on their journey to spiritual wellness and inner harmony.
            </p>
            <div className="space-y-2 text-left">
              {[
                'Personalized meditation practices',
                'Aura reading and spiritual guidance', 
                'Supportive spiritual community',
                'Daily insights and affirmations'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-sans text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <Image 
          src="/candid.jpg" 
          alt="Spiritual journey" 
          fill
          className="object-cover"
          priority
        />
        {/* To use an actual image, replace the above div with:
        <img 
          src="/path-to-your-image.jpg" 
          alt="Spiritual journey" 
          className="w-full h-full object-cover"
        />
        */}
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary-600" />
            <h1 className="font-marcellus text-3xl">
              <span className="text-primary-700">Soul</span>
              <span className="text-primary-500">ara</span>
            </h1>
          </div>
          <p className="text-base-600 font-sans text-sm">
            You just stepped into a playground for magnetic souls.
Let&apos;s get you a Soulara.
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-200/50 p-8 mr-8">
          <div className="mb-6">
            <h2 className="font-playfair text-2xl text-foreground mb-2">
              Create Your Account
            </h2>
            <p className="text-muted-foreground font-sans text-sm">
             
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-sans font-medium text-foreground">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-400" />
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-lg border border-base-300",
                      "bg-background text-foreground placeholder:text-base-400",
                      "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                      "transition-colors duration-200 font-sans"
                    )}
                    placeholder="First name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-sans font-medium text-foreground">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-base-300",
                    "bg-background text-foreground placeholder:text-base-400",
                    "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                    "transition-colors duration-200 font-sans"
                  )}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-sans font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-3 rounded-lg border border-base-300",
                    "bg-background text-foreground placeholder:text-base-400",
                    "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                    "transition-colors duration-200 font-sans"
                  )}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-sans font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-12 py-3 rounded-lg border border-base-300",
                    "bg-background text-foreground placeholder:text-base-400",
                    "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                    "transition-colors duration-200 font-sans"
                  )}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-400 hover:text-base-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors duration-200",
                          passwordStrength >= level 
                            ? level <= 2 ? 'bg-red-500' 
                              : level <= 3 ? 'bg-yellow-500' 
                              : 'bg-green-500'
                            : 'bg-base-200'
                        )}
                      />
                    ))}
                  </div>
                  <p className={cn("text-xs font-sans", getPasswordStrengthText().color)}>
                    {getPasswordStrengthText().text}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-sans font-medium text-foreground">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-12 py-3 rounded-lg border",
                    formData.confirmPassword === '' 
                      ? 'border-base-300'
                      : passwordMatch 
                        ? 'border-green-500' 
                        : 'border-red-500',
                    "bg-background text-foreground placeholder:text-base-400",
                    "focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                    "transition-colors duration-200 font-sans"
                  )}
                  placeholder="Confirm your password"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {formData.confirmPassword !== '' && (
                    passwordMatch ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-red-500" />
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-base-400 hover:text-base-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-base-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground font-sans leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !passwordMatch || passwordStrength < 3}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-sans font-medium",
                "bg-primary-600 hover:bg-primary-700 text-white",
                "focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200"
              )}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground font-sans">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Signup */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full py-3 px-4 rounded-lg font-sans",
                  "border-base-300 hover:bg-base-100",
                  "transition-colors duration-200"
                )}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground font-sans">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-base-500 font-sans">
            By creating an account, you&apos;re joining a community dedicated to spiritual growth and wellness
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SignupPage