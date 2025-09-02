import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type SoundName = 'click';

interface SoundContextValue {
  play: (name: SoundName) => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    try {
      const Ctor = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return;
      const ctx: AudioContext = new Ctor();
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.value = muted ? 0 : 1;
      audioCtxRef.current = ctx;
      masterGainRef.current = gain;
    } catch (err) {
      // ignore; audio not supported
      // console.warn('AudioContext init failed', err);
    }

    return () => {
      try {
        audioCtxRef.current?.close();
      } catch {}
      audioCtxRef.current = null;
      masterGainRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (masterGainRef.current) masterGainRef.current.gain.value = muted ? 0 : 1;
  }, [muted]);

  const ensureResume = async () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {}
    }
  };

  // Attempt to resume the AudioContext on the first user gesture (some browsers require this)
  useEffect(() => {
    const onUserGesture = async () => {
      await ensureResume();
    };

    window.addEventListener('pointerdown', onUserGesture, { once: true });
    window.addEventListener('keydown', onUserGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', onUserGesture as any);
      window.removeEventListener('keydown', onUserGesture as any);
    };
  }, []);

  // Global delegated handlers: play click SFX for actionable elements
  useEffect(() => {
    const isActionable = (el: Element | null) => {
      if (!el) return false;
      const actionable = (el as Element).closest(
        'button, [role="button"], a, input[type="button"], input[type="submit"], [data-sound="click"]'
      );
      return !!actionable;
    };

    const pointerHandler = (ev: PointerEvent) => {
      // only primary button
      if ((ev as any).button !== undefined && (ev as any).button !== 0) return;
      if (!ev.isTrusted) return;
      const target = ev.target as Element | null;
      // skip if element explicitly opts out
      const actionable = target ? target.closest('[data-no-sound], button[aria-hidden="true"]') : null;
      if (actionable) return;
      if (isActionable(target)) play('click');
    };

    const keyHandler = (ev: KeyboardEvent) => {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      if (!ev.isTrusted) return;
      const active = document.activeElement;
      if (!active) return;
      // skip inputs where Enter/Space shouldn't trigger SFX (like text inputs)
      const tag = active.tagName.toLowerCase();
      if (tag === 'input' && (active as HTMLInputElement).type === 'text') return;
      if (isActionable(active)) play('click');
    };

    window.addEventListener('pointerdown', pointerHandler, { capture: true });
    window.addEventListener('keydown', keyHandler, { capture: true });

    return () => {
      window.removeEventListener('pointerdown', pointerHandler, { capture: true } as any);
      window.removeEventListener('keydown', keyHandler, { capture: true } as any);
    };
  }, [muted]);

  const play = async (name: SoundName) => {
    const ctx = audioCtxRef.current;
    if (!ctx || muted) return;
    await ensureResume();

    const now = ctx.currentTime;
    if (name === 'click') {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);
      g.gain.setValueAtTime(0.0001, now);
      osc.connect(g);
      g.connect(masterGainRef.current!);
      // quick percussive envelope
      g.gain.exponentialRampToValueAtTime(0.2, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  return (
    <SoundContext.Provider value={{ play, muted, toggleMute }}>{children}</SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
};

export default SoundProvider;
