"use client"

import React ,{useEffect, useRef, useState} from 'react';
import VideoJS from '@/components/video';
import videojs from 'video.js';
import { useParams } from 'next/navigation';
import api from '@/lib/axiosInstance';
import SafetyPage from '@/components/safety';

export default function Video() {
  const params = useParams();
  const { slug } = params;
  const [url,setUrl] = useState<String|undefined>()
  const [title,setTitle] = useState<String|undefined>()
  const [notFound,setNotFound] = useState<Boolean>(false)

  const getUrl = async()=>{
    try {
        const response =  await api.get(`/api/get-signed-cookie?id=${slug}`)
        if(response.data.data.url){
            setUrl(response.data.data.url)
            setTitle(response.data.data.title)
        }else{
            setNotFound(true)
        }
    } catch (error) {
        setNotFound(true)
        console.log(error)
    }
  }

  useEffect(()=>{
    getUrl()
  },[])

  const playerRef = useRef(null);
  
  // ✅ Updated videoJsOptions with credentials support
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    // ✅ Configure HLS to send credentials
    html5: {
      vhs: {
        xhr: {
          beforeRequest: function(options:any) {
            // ✅ Force credentials to be sent with all HLS requests
            options.withCredentials = true;
            return options;
          }
        }
      }
    },
    sources: [{
      src: url,
      type: 'application/x-mpegURL'
    }]
  };

  // @ts-ignore
const handlePlayerReady = (player:any) => {
  playerRef.current = player;

  // ✅ Debug HLS requests
  player.on('loadstart', () => {
    console.log('🎬 Video loading started');
  });

  player.on('error', (e:any) => {
    console.error('🔥 Video error:', e);
    console.error('🔥 Player error:', player.error());
  });

  // ✅ Monitor network requests
  player.ready(() => {
    console.log('🎬 Player ready, tech:', player.tech(true));
  });
};


  return (
    <>
    {notFound?(<SafetyPage type='error' message='video not found' />):(<>
      <div className=' text-3xl h-1/12 p-3 bg-background'>{"Sample video of a girl teaching"}</div>
      <div className=' h-11/12 w-full'> <VideoJS  options={videoJsOptions} onReady={handlePlayerReady} /></div>
    </>)}
    </>
  );
}