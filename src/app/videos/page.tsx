"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { LogoutButton } from '@/components/logoutButton';
import api from '@/lib/axiosInstance';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '@/components/searchBar';
import { Video } from '@/lib/types';

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
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load
  
  // Refs to prevent race conditions
  const fetchingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const fallbackThumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop&crop=center";

  // Enhanced fetch function with better error handling
  const fetchVideos = useCallback(async (pageNum: number, reset: boolean = false) => {
    // Prevent concurrent requests
    if (fetchingRef.current) return;
    
    fetchingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/api/videos?page=${pageNum}&limit=12`);
      const data: ApiResponse = response.data.data;
      
      if (reset) {
        setVideos(data.videos);
        setPage(1);
      } else {
        setVideos(prev => [...prev, ...data.videos]);
      }
      
      // Update hasMore state consistently
      const newHasMore = data.pagination.hasNextPage;
      setHasMore(newHasMore);
      hasMoreRef.current = newHasMore;
      
      // Mark initial load as complete
      if (initialLoad) {
        setInitialLoad(false);
      }
      
    } catch (err: any) {
      if (err.response?.status === 403) {
        router.push('/safety');
        return;
      }
      
      // Handle 404 - no more videos
      if (err.response?.status === 404) {
        setHasMore(false);
        hasMoreRef.current = false;
        // Don't show error for 404, it's expected at end of pagination
        if (pageNum === 1) {
          setError('No videos available');
        }
        return;
      }
      
      // Handle other errors
      const errorMessage = err instanceof Error ? err.message : 'Failed to load videos';
      setError(errorMessage);
      console.error('Error fetching videos:', err);
      
      // Don't change hasMore for network errors - allow retry
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [router, initialLoad]);

  const changeVideos = (newVideos: Video[]) => {
    setVideos([...newVideos]);
    setHasMore(true); // Reset when search provides new videos
    hasMoreRef.current = true;
    setPage(1);
  };

  // Initial load
  useEffect(() => {
    fetchVideos(1, true);
  }, []);

  // Improved scroll handler with debouncing
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Debounce scroll events
      scrollTimeout = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1000;
        
        if (
          scrolledToBottom &&
          hasMoreRef.current &&
          !fetchingRef.current &&
          !loading
        ) {
          setPage(prev => prev + 1);
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [loading]);

  // Load more videos when page changes
  useEffect(() => {
    if (page > 1) {
      fetchVideos(page);
    }
  }, [page, fetchVideos]);

  const handleVideoClick = (videoId: string) => {
    router.push(`/videos/${videoId}`);
  };

  // VideoCard component remains the same
  const VideoCard = ({ video }: { video: Video }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    
    const thumbnailSrc = !imageError && video.thumbnailUrl ? video.thumbnailUrl : fallbackThumbnail;
    
    return (
      <Card  
        className="border hover:border-primary/50 group bg-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] p-1"
        onClick={() => handleVideoClick(video.id)}
      >
        <CardContent className="p-0 my-0">
          <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
            {imageLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
              </div>
            )}
            
            <img
              src={thumbnailSrc}
              alt={video.title}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className="w-12 h-12 bg-background/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                <Play className="w-6 h-6 text-foreground fill-current ml-1" />
              </div>
            </div>
            
            {imageError && video.thumbnailUrl && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full opacity-60" 
                   title="Using fallback thumbnail" />
            )}
          </div>
          
          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2 text-card-foreground group-hover:text-primary transition-colors duration-200">
              {video.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => fetchVideos(1, true)}>
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Image src={'/image.png'} width={20} height={20} alt='icon' className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:block">
              RotFlix
            </span>
          </div>

          <SearchBar setVideos={changeVideos}/>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded mb-6">
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* No More Videos - Only show if not loading and has videos and definitely no more */}
        {!hasMore && !loading && videos.length > 0 && !initialLoad && (
          <div className="text-center py-8 text-muted-foreground">
            <p>You've reached the end! No more videos available. <Link className='text-xs underline hover:text-primary' href={'/tech-used'} target='#'>Check out the tech</Link></p>
          </div>
        )}

        {/* No Videos Found - Only show after initial load completes */}
        {videos.length === 0 && !loading && !initialLoad && (
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