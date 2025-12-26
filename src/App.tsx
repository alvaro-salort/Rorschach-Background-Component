import { useState } from 'react';
import Rorschach from './components/Rorschach';

export default function App() {
    const [patternColor, setPatternColor] = useState('#111111');
    const [backgroundColor, setBackgroundColor] = useState('#eeeeee');
    const [speed, setSpeed] = useState(1.0);
    const [zoom, setZoom] = useState(2.5);
    const [density, setDensity] = useState(0.5);
    const [sharpness, setSharpness] = useState(0.9);

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

            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                width: '280px'
            }}>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Rorschach Controls</h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Ink Color</label>
                    <input type="color" value={patternColor} onChange={e => setPatternColor(e.target.value)} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>BG Color</label>
                    <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Speed ({speed})</label>
                    <input type="range" min="0" max="5" step="0.1" value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Zoom ({zoom})</label>
                    <input type="range" min="0.5" max="5" step="0.1" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Density ({density})</label>
                    <input type="range" min="0" max="1" step="0.05" value={density} onChange={e => setDensity(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Sharpness ({sharpness})</label>
                    <input type="range" min="0" max="1" step="0.05" value={sharpness} onChange={e => setSharpness(parseFloat(e.target.value))} style={{ width: '100%' }} />
                </div>
            </div>
        </div>
    );
}
