import React from 'react';
import { useSound } from '../sound/SoundProvider';

const SoundControls: React.FC = () => {
  const { volumes, setVolume, play, loadSample } = useSound();

  return (
    <div className="mt-4 text-sm text-slate-400 font-mono">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        <div>
          <label className="block">Master</label>
          <input type="range" min={0} max={1} step={0.01} value={volumes.master} onChange={(e) => setVolume('master', Number(e.target.value))} />
        </div>
        <div>
          <label className="block">Click</label>
          <input type="range" min={0} max={1} step={0.01} value={volumes.click} onChange={(e) => setVolume('click', Number(e.target.value))} />
          <div className="mt-1">
            <button onClick={() => play('click')} className="mr-2 px-2 py-1 rounded bg-slate-800 text-xs">Preview</button>
            <button onClick={() => loadSample('click')} className="px-2 py-1 rounded bg-slate-800 text-xs">Load sample</button>
          </div>
        </div>
        <div>
          <label className="block">Confirm</label>
          <input type="range" min={0} max={1} step={0.01} value={volumes.confirm} onChange={(e) => setVolume('confirm', Number(e.target.value))} />
          <div className="mt-1">
            <button onClick={() => play('confirm')} className="mr-2 px-2 py-1 rounded bg-slate-800 text-xs">Preview</button>
            <button onClick={() => loadSample('confirm')} className="px-2 py-1 rounded bg-slate-800 text-xs">Load sample</button>
          </div>
        </div>
        <div>
          <label className="block">Error</label>
          <input type="range" min={0} max={1} step={0.01} value={volumes.error} onChange={(e) => setVolume('error', Number(e.target.value))} />
          <div className="mt-1">
            <button onClick={() => play('error')} className="mr-2 px-2 py-1 rounded bg-slate-800 text-xs">Preview</button>
            <button onClick={() => loadSample('error')} className="px-2 py-1 rounded bg-slate-800 text-xs">Load sample</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundControls;
