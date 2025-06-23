"use client"
import api from "@/lib/axiosInstance";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {

    const router = useRouter()
    
    const handleLogout = async () => {
        try {
            const res = await api.post('/api/logout')
            router.push('/')
            alert("logged ou succesfully")
        } catch (error) {
            console.log(error)
            alert("some error in logging out")
        }
    }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors duration-200"
    >
      <div className="w-4 h-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </div>
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};