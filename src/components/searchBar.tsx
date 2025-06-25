"use client"

import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRef, useState } from "react"
import api from "@/lib/axiosInstance"
import { Video } from "@/lib/types"
import { toast } from "sonner"

export const SearchBar = ({setVideos}:{setVideos: (newVideos: Video[]) => void})=>{

    const searchRef = useRef<HTMLInputElement | null>(null);
    const handleSearch = async(e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        const searchString = searchRef.current?.value
        if(!searchString){
            return
        }
        const searchQuery = searchString.replaceAll(" ","-")
        try {
            const result = await api.get(`/api/search?search=${searchQuery}`)
            const {data} = result
            setVideos(data.data.videos)
        } catch (error) {
            console.log(error);
            toast("Something unexpected happened")
        }
    }

    return(<>
        <div className="flex-1 max-w-2xl">
        <div className="relative">
            <Input
            type="text"
            placeholder="Search videos..."
            ref={searchRef}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            className="w-full pr-12 h-10"
            />
            <Button
            onClick={handleSearch}
            size="sm"
            className="absolute right-1 top-1 h-8 w-8 p-0"
            variant="ghost"
            >
            <Search className="w-4 h-4" />
            </Button>
        </div>
        </div>
    </>)
}