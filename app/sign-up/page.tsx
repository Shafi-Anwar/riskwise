'use client'

import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUpPage() {
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleEmailPassword = async () => {
    if (!isLoaded) return
    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else if (result.status === 'missing_requirements') {
        // Handle verification flow - user needs to verify email
        // You can redirect to a verification page or handle it in-place
        router.push('/verify-email') // optional step
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign up failed.')
    }
  }

  const handleOAuth = async () => {
    if (!isLoaded) return
    await signUp.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/dashboard',
      redirectUrlComplete: '/dashboard',
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-6">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <Button className="w-full mb-4" onClick={handleOAuth}>
          Sign Up with Google
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-300 dark:border-zinc-700" />
          </div>
          <div className="relative text-center text-zinc-500 dark:text-zinc-400 text-sm">
            <span className="bg-white dark:bg-zinc-800 px-2">or</span>
          </div>
        </div>

        <Input
          type="email"
          placeholder="Email"
          className="mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <Button className="w-full" onClick={handleEmailPassword}>
          Create Account
        </Button>
      </div>
    </div>
  )
}
