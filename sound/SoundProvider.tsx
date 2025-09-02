import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type SoundName = 'click' | 'confirm' | 'error';

interface SoundContextValue {
  play: (name: SoundName) => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const STORAGE_KEY = 'eta_sound_muted';
  const VOLUME_KEY = 'eta_sound_volumes';
  const ACTIVE_KEY = 'eta_sound_active';

  const [muted, setMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [isActive, setIsActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ACTIVE_KEY) === '1';
    } catch {
      return false;
    }
  });

  type Volumes = { master: number } & Record<SoundName, number>;
  const DEFAULT_VOLUMES: Volumes = { master: 1, click: 1, confirm: 0.9, error: 0.9 };
  const [volumes, setVolumes] = useState<Volumes>(() => {
    try {
      const raw = localStorage.getItem(VOLUME_KEY);
      if (!raw) return DEFAULT_VOLUMES;
      return { ...DEFAULT_VOLUMES, ...JSON.parse(raw) } as Volumes;
    } catch {
      return DEFAULT_VOLUMES;
    }
  });

  const [buffers, setBuffers] = useState<Partial<Record<SoundName, AudioBuffer>>>({});

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
      setIsActive(ctx.state === 'running');
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
  setIsActive(true);
      } catch {}
    }
  };

  // Sample loader: fetches /assets/sfx/<name>.ogg and decodes to AudioBuffer
  const loadSample = async (name: SoundName) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    try {
      const res = await fetch(`/assets/sfx/${name}.ogg`);
      if (!res.ok) throw new Error('no asset');
      const ab = await res.arrayBuffer();
      const buf = await ctx.decodeAudioData(ab);
      setBuffers((b) => ({ ...b, [name]: buf }));
    } catch {
      // ignore; fallback to oscillator will be used
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
    const master = volumes.master ?? 1;
    const sfxVol = (volumes[name] ?? 1) * master;

    // If we have a buffer loaded, play that
    const buf = buffers[name];
    if (buf) {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const g = ctx.createGain();
      g.gain.value = sfxVol;
      src.connect(g);
      g.connect(masterGainRef.current!);
      src.start(now);
      return;
    }

    const makeTone = (freq: number, type: OscillatorType, dur = 0.12, amp = 0.12) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.0001 * sfxVol, now);
      osc.connect(g);
      g.connect(masterGainRef.current!);
      g.gain.exponentialRampToValueAtTime(amp * sfxVol, now + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001 * sfxVol, now + dur);
      osc.start(now);
      osc.stop(now + dur + 0.02);
    };

    if (name === 'click') {
      makeTone(880, 'square', 0.12, 0.12);
    } else if (name === 'confirm') {
      // two-note rising chime
      makeTone(900, 'triangle', 0.14, 0.08);
      setTimeout(() => makeTone(1300, 'triangle', 0.12, 0.06), 60);
    } else if (name === 'error') {
      makeTone(220, 'sawtooth', 0.24, 0.16);
      setTimeout(() => makeTone(180, 'sawtooth', 0.18, 0.12), 80);
    }
  };

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {}
      return next;
    });
  };

  const setVolume = (key: keyof Volumes, value: number) => {
    setVolumes((v) => {
      const next = { ...v, [key]: value };
      try {
        localStorage.setItem(VOLUME_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const activateAudio = async () => {
    await ensureResume();
    // ensure state flag updated
    const s = audioCtxRef.current?.state;
    const active = s === 'running';
    setIsActive(active);
    try {
      localStorage.setItem(ACTIVE_KEY, active ? '1' : '0');
    } catch {}
  };

  return (
    <SoundContext.Provider value={{ play, muted, toggleMute, activateAudio, isActive, setVolume, volumes, loadSample }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext) as any;
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx as {
    play: (name: SoundName) => void;
    muted: boolean;
    toggleMute: () => void;
    activateAudio: () => Promise<void>;
    isActive: boolean;
    setVolume: (k: string, v: number) => void;
    volumes: { master: number } & Record<SoundName, number>;
    loadSample: (name: SoundName) => Promise<void>;
  };
};

export default SoundProvider;
