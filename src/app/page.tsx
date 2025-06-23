"use client"
import RotFlixLanding from "@/components/landingPage";
import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
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
  return(<RotFlixLanding/>)
};

export default Page;