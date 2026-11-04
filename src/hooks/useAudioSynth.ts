"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const AUDIO_SRC = `${basePath}/assets/audio/ambient-cyber.mp3`;

/**
 * Cyberpunk futuristic soundscape:
 * - Plays user-uploaded ambient cyber music loop (`ambient-cyber.mp3`) with smooth volume fades
 * - Scroll acceleration whoosh
 * - Futuristic UI click / blip
 * - Warp transition chime
 */
export function useAudioSynth() {
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize background audio element on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = 0;
      audio.muted = true;
      audio.preload = "auto";
      bgAudioRef.current = audio;
    }
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current.muted = true;
        bgAudioRef.current.src = "";
        bgAudioRef.current = null;
      }
    };
  }, []);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current?.state === "suspended" && !isMutedRef.current) {
      audioCtxRef.current.resume().catch(() => {});
    }
  }, []);

  // Stop background track immediately with zero leakage
  const stopTrackImmediately = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    const audio = bgAudioRef.current;
    if (audio) {
      audio.muted = true;
      audio.volume = 0;
      audio.pause();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend().catch(() => {});
    }
  }, []);

  // Smooth fade-in of background ambient track
  const playTrack = useCallback(() => {
    const audio = bgAudioRef.current;
    if (!audio || isMutedRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    audio.muted = false;
    audio.volume = 0.05;
    audio.play().catch(() => {
      // Browser autoplay policy fallback
    });

    const targetVolume = 0.35;
    fadeIntervalRef.current = setInterval(() => {
      if (!audio || isMutedRef.current) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        return;
      }
      if (audio.volume < targetVolume - 0.03) {
        audio.volume = Math.min(targetVolume, audio.volume + 0.05);
      } else {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, 70);
  }, []);

  const toggleSound = useCallback(() => {
    initAudio();
    const nextMuted = !isMutedRef.current;
    isMutedRef.current = nextMuted;
    setIsMuted(nextMuted);

    if (nextMuted) {
      // Instantly kill sound
      stopTrackImmediately();
    } else {
      // Unmute and start playback
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }
      playTrack();
    }
  }, [initAudio, playTrack, stopTrackImmediately]);

  // UI interaction blip
  const playClick = useCallback(() => {
    if (isMutedRef.current || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state !== "running") return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore audio interruptions
    }
  }, []);

  // Scroll speed whoosh
  const playWhoosh = useCallback(
    (intensity: number = 0.5) => {
      if (isMutedRef.current || !audioCtxRef.current) return;
      try {
        const ctx = audioCtxRef.current;
        if (ctx.state !== "running") return;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320 * intensity, ctx.currentTime + 0.25);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.02 * intensity, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.26);
      } catch {
        // Ignore
      }
    },
    []
  );

  // Warp portal sound
  const playWarp = useCallback(() => {
    if (isMutedRef.current || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state !== "running") return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.45);
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    return () => {
      stopTrackImmediately();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopTrackImmediately]);

  return {
    isMuted,
    toggleSound,
    playClick,
    playWhoosh,
    playWarp,
  };
}
