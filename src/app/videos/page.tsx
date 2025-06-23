"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { LogoutButton } from '@/components/logoutButton';
import api from '@/lib/axiosInstance';
import Link from 'next/link';
import Image from 'next/image';

interface Video {
  id: string;
  title: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalVideos: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface ApiResponse {
  videos: Video[];
  pagination: PaginationData;
}

const VideoHomePage = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sample thumbnail image
  const sampleThumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&crop=center";

  // Fetch videos function
  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    // In a real app, you'd implement search functionality here
    // console.log('Searching for:', searchQuery);
  };

  const fetchVideos = useCallback(async (pageNum: number, reset: boolean = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/api/videos?page=${pageNum}&limit=12`);
      const data: ApiResponse = response.data.data;
      
      if (reset) {
        setVideos(data.videos);
      } else {
        setVideos(prev => [...prev, ...data.videos]);
      }
      
      setHasMore(data.pagination.hasNextPage);
      
    } catch (err:any) {
      if (err.response?.status === 403) {
        router.push('/safety')
        return;
      }
      if (err.response?.status === 404) {
        setHasMore(false);
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Initial load
  useEffect(() => {
    fetchVideos(1, true);
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 &&
        hasMore &&
        !loading
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  // Load more videos when page changes
  useEffect(() => {
    if (page > 1) {
      fetchVideos(page);
    }
  }, [page, fetchVideos]);

  const handleVideoClick = (videoId: string) => {
    router.push(`/videos/${videoId}`);
  };

  const VideoCard = ({ video }: { video: Video }) => (
    <Card  
      className=" border-2 border-border hover:border-chart-5 group bg-secondary cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] p-0"
      onClick={() => handleVideoClick(video.id)}
    >
      <CardContent className="p-0 my-0 ">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={sampleThumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-background bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 text-foreground fill-current ml-1" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
            {video.title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b-1 border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-destructive rounded flex items-center justify-center">
              <Image src={'/image.png'} width={20} height={20} alt='icon' className="w-5 h-5 text-destructive-foreground fill-current" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:block">
              RotFlix
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Logout Button */}
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-destructive/10 border border-chart-1  text-destructive px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-1 border-border"></div>
          </div>
        )}

        {/* No More Videos */}
        {!hasMore && videos.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>You've reached the end! No more videos available. <Link className=' text-xs underline' href={'/tech-used'}>Check out the tech</Link></p>
          </div>
        )}

        {/* No Videos Found */}
        {videos.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">No videos found</h3>
            <p className="text-muted-foreground">Try refreshing the page or check back later.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoHomePage;