import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import 'videojs-youtube';
import { getMimeType } from '@/utilities/videoUtils';

interface LiveStreamPlayerProps {
  playing: boolean;
  muted: boolean;
  controls: boolean;
  url: string;
  width?: string | number;
  height?: string | number;
  volume?: number;
  onEnded?: () => void;
  onReady?: () => void;
  type?: string;
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({
  playing,
  muted,
  controls,
  url,
  width = '100%',
  height = '100%',
  volume = 1,
  onEnded,
  onReady,
  type,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isReady, setIsReady] = useState(false);

  // Initialize player only once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!videoRef.current || playerRef.current) return;

    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-default-skin', 'vjs-big-play-centered');
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.objectFit = 'cover';
    videoElement.setAttribute('playsInline', '');

    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      techOrder: ['youtube', 'html5'],
      autoplay: false,
      muted,
      controls,
      fluid: true,
      responsive: true,
      experimentalSvgIcons: true,
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        skipButtons: {
          forward: 10,
          backward: 10,
        },
      },
      sources: [
        {
          src: url,
          type: type || getMimeType(url) || 'video/mp4',
        },
      ],
    });

    playerRef.current = player;

    player.ready(() => {
      setIsReady(true);
      if (onReady) onReady();
    });

    if (onEnded) {
      player.on('ended', onEnded);
    }
  }, []);

  // Update player source when URL or type changes
  useEffect(() => {
    if (!playerRef.current || !isReady) return;
    playerRef.current.src({
      src: url,
      type: type || getMimeType(url) || 'video/mp4',
    });
  }, [url, type, isReady]);

  // Control playback state
  useEffect(() => {
    if (!playerRef.current || !isReady) return;

    if (playing) {
      playerRef.current?.play()?.catch((err) => {
        console.warn('Autoplay/play failed:', err);
      });
    } else {
      playerRef.current.pause();
    }
  }, [playing, isReady]);

  // Sync mute, volume, and playbackRate
  useEffect(() => {
    if (!playerRef.current || !isReady) return;

    playerRef.current.muted(muted);
    playerRef.current.volume(volume);
    playerRef.current.playbackRate(playbackRate);
  }, [muted, volume, playbackRate, isReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className='flex' style={{ width, height }}>
      <div data-vjs-player ref={videoRef} className='flex-1' />
    </div>
  );
};

export default LiveStreamPlayer;
