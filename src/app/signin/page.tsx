"use client"

import { LoginForm } from "@/components/login-form"
import api from "@/lib/axiosInstance"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const router = useRouter()

  const check = async () => {
    try {
      const response = await api.get('/api/auth')
      router.push('/videos')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    check()
  }, [])

  return (
    <div className="min-h-svh  w-full flex items-center justify-center p-6 md:p-10 bg-[url('/bg2.png')] bg-no-repeat bg-cover bg-left-top relative">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-0" />

      {/* Login Box */}
      <div className="relative border border-primary z-10 w-full max-w-sm rounded-2xl  bg-card text-card-foreground shadow-xl p-8">
        <h1 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-destructive via-red-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
          Welcome to RotFlix
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}
