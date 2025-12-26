import { useState } from 'react';
import Rorschach from './components/Rorschach';

export default function App() {
    const [patternColor, setPatternColor] = useState('#111111');
    const [backgroundColor, setBackgroundColor] = useState('#eeeeee');
    const [speed, setSpeed] = useState(1.0);
    const [zoom, setZoom] = useState(2.5);
    const [density, setDensity] = useState(0.5);
    const [sharpness, setSharpness] = useState(0.9);
    const [showControls, setShowControls] = useState(true);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
                <Rorschach
                    patternColor={patternColor}
                    backgroundColor={backgroundColor}
                    speed={speed}
                    zoom={zoom}
                    density={density}
                    sharpness={sharpness}
                />
            </div>

            <button
                onClick={() => setShowControls(!showControls)}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 100,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                }}
            >
                {showControls ? '✕ Close Controls' : '.'}
            </button>

            {showControls && (
                <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: '20px',
                    background: 'rgba(255, 255, 255, 0.98)',
                    padding: '24px',
                    borderRadius: '16px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '300px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <h2 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', fontWeight: 600 }}>Rorschach Controls</h2>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ fontSize: '0.9rem', color: '#444' }}>Ink Color</label>
                        <input type="color" value={patternColor} onChange={e => setPatternColor(e.target.value)} style={{ border: 'none', background: 'none', width: '30px', height: '30px', cursor: 'pointer' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ fontSize: '0.9rem', color: '#444' }}>BG Color</label>
                        <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} style={{ border: 'none', background: 'none', width: '30px', height: '30px', cursor: 'pointer' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#444' }}>Speed ({speed})</label>
                        <input type="range" min="0" max="5" step="0.1" value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#111' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#444' }}>Zoom ({zoom})</label>
                        <input type="range" min="0.5" max="5" step="0.1" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#111' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#444' }}>Density ({density})</label>
                        <input type="range" min="0" max="1" step="0.05" value={density} onChange={e => setDensity(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#111' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#444' }}>Sharpness ({sharpness})</label>
                        <input type="range" min="0" max="1" step="0.05" value={sharpness} onChange={e => setSharpness(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#111' }} />
                    </div>
                </div>
            )}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
