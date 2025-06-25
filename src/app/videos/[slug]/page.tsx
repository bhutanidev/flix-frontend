"use client"

import React, { useEffect, useRef, useState } from 'react';
import VideoJS from '@/components/video';
import videojs from 'video.js';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axiosInstance';
import SafetyPage from '@/components/safety';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Video() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const [url, setUrl] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getUrl = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/get-signed-cookie?id=${slug}`);
      if (response.data.data.url) {
        setUrl(response.data.data.url);
        setTitle(response.data.data.title);
        setDescription(response.data.data.description || '');
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setNotFound(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUrl();
  }, []);

  const playerRef = useRef(null);
  
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    aspectRatio: '16:9',
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    html5: {
      vhs: {
        xhr: {
          beforeRequest: function(options: any) {
            console.log('🔧 VHS XHR Before Request:', options.uri);
            options.withCredentials = true;
            
            if (!options.headers) {
              options.headers = {};
            }
            
            options.headers['credentials'] = 'include';
            console.log('🔧 XHR Options:', options);
            return options;
          },
          onRequest: function(options: any) {
            console.log('🔧 VHS XHR On Request:', options.uri);
          }
        },
        withCredentials: true
      }
    },
    sources: [{
      src: url,
      type: 'application/x-mpegURL'
    }]
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.ready(() => {
      console.log('🎬 Player ready with fullscreen support');
      
      const fullscreenToggle = player.controlBar.fullscreenToggle;
      if (fullscreenToggle) {
        fullscreenToggle.show();
      }
    });

    player.on('loadstart', () => {
      console.log('🎬 Video loading started');
    });

    player.on('error', (e: any) => {
      console.error('🔥 Video error:', e);
      console.error('🔥 Player error:', player.error());
    });

    player.on('timeupdate', () => {
      const currentTime = player.currentTime();
      const duration = player.duration();
      if (duration > 0) {
        const progress = (currentTime / duration) * 100;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound) {
    return <SafetyPage type='error' message='video not found' />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Floating header with glassmorphism effect */}
      <header className="fixed top-4 left-4 right-4 z-50 bg-background/80 backdrop-blur-md  rounded-2xl px-6  shadow-sm">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-muted/50 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg truncate text-foreground">
            {title}
          </h1>
        </div>
      </header>

      {/* Main content with better spacing */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Video Player Container - removed card wrapper */}
          <div className="w-full">
            <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
          </div>

          {/* Video Title with better typography */}
          <div className="px-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {title}
            </h1>
          </div>

          {/* Description with modern styling */}
          {description && (
            <div className="px-2">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Description</h3>
                <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30 rounded-2xl p-6 backdrop-blur-sm">
                  <p className="text-foreground/90 leading-relaxed text-lg whitespace-pre-wrap">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Spacer for better bottom spacing */}
          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
}