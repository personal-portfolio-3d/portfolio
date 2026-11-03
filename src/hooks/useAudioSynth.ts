"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Procedural Web Audio API sound generator for cyberpunk futuristic soundscape:
 * - Ambient sci-fi drone (smooth low-pass filtered oscillators)
 * - Scroll acceleration whoosh
 * - Futuristic UI click / blip
 * - Warp transition chime
 */
export function useAudioSynth() {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    gain: GainNode;
    filter: BiquadFilterNode;
  } | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  // Ambient Sci-Fi Drone
  const startDrone = useCallback(() => {
    if (!audioCtxRef.current || droneNodesRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A1

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      droneNodesRef.current = { osc1, osc2, gain, filter };
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  const stopDrone = useCallback(() => {
    if (!droneNodesRef.current || !audioCtxRef.current) return;
    try {
      const { osc1, osc2, gain } = droneNodesRef.current;
      const ctx = audioCtxRef.current;
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      setTimeout(() => {
        osc1.stop();
        osc2.stop();
        droneNodesRef.current = null;
      }, 600);
    } catch {
      droneNodesRef.current = null;
    }
  }, []);

  const toggleSound = useCallback(() => {
    initAudio();
    setIsMuted((prev) => {
      const next = !prev;
      if (!next) {
        startDrone();
      } else {
        stopDrone();
      }
      return next;
    });
  }, [initAudio, startDrone, stopDrone]);

  // UI interaction blip
  const playClick = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
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
  }, [isMuted]);

  // Scroll speed whoosh
  const playWhoosh = useCallback(
    (intensity: number = 0.5) => {
      if (isMuted || !audioCtxRef.current) return;
      try {
        const ctx = audioCtxRef.current;
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
    [isMuted]
  );

  // Warp portal sound
  const playWarp = useCallback(() => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
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
  }, [isMuted]);

  useEffect(() => {
    return () => {
      stopDrone();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopDrone]);

  return {
    isMuted,
    toggleSound,
    playClick,
    playWhoosh,
    playWarp,
  };
}

