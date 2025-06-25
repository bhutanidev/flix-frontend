// In your VideoJS component
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = (props: any) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      
      videoElement.classList.add('vjs-big-play-centered');
      // ✅ Add these attributes for better functionality
      videoElement.setAttribute('crossorigin', 'use-credentials');
      videoElement.setAttribute('preload', 'metadata');
      
      // @ts-ignore
      videoRef.current.appendChild(videoElement);

      // @ts-ignore
      const player = playerRef.current = videojs(videoElement, {
        ...options,
        // ✅ Ensure these options are set
        controls: true,
        fluid: options.fluid !== false,
        responsive: true,
        aspectRatio: options.aspectRatio || '16:9',
        playbackRates: options.playbackRates || [0.5, 1, 1.25, 1.5, 2],
        // ✅ Fix fullscreen
        fullscreen: {
          options: {
            navigationUI: 'hide'
          }
        }
      }, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    } else {
      const player = playerRef.current;
      // @ts-ignore
      player.autoplay(options.autoplay);
      // @ts-ignore
      player.src(options.sources);
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      // @ts-ignore
      if (player && !player.isDisposed()) {
        // @ts-ignore
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className="w-full h-full">
      <div ref={videoRef} className="w-full h-full" />
    </div>
  );
}

export default VideoJS;