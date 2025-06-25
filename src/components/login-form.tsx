"use client"

import React, { useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import api from "@/lib/axiosInstance"
import axios from "axios"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router  = useRouter()
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const email = emailRef.current?.value || ""
    const password = passwordRef.current?.value || ""
    if(!email || !password){
      toast("enter valid credentials")
    }

    try {
      const result  = await api.post('/api/signin' , {email,password} )
      router.push('/videos')
    } catch (error:any) {
      console.log(error)
      toast(error?.response?.data?.message || "somethig happened unexpectedly");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className=" border-none">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  ref={passwordRef}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <button onClick={()=>router.push('/signup')} className="underline underline-offset-4 hover:cursor-pointer">
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
