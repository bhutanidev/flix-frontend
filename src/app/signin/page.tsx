"use client"
import { LoginForm } from "@/components/login-form"
import api from "@/lib/axiosInstance"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const router = useRouter()
  const check = async()=>{
    try {
      const response = await api.get('/api/auth')
      router.push('/videos')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    check()
  },[])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
