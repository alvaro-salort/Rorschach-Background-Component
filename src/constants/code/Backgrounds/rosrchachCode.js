export const rorschach = `import React, { useRef, useEffect } from 'react';

interface RorschachProps {
  patternColor?: string;
  backgroundColor?: string;
  speed?: number;
  zoom?: number;
  density?: number;
  sharpness?: number;
  seed?: number;
  className?: string;
}

const vertexShaderSource = \`
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
\`;

const fragmentShaderSource = \`
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_seed;
  uniform float u_speed;
  uniform float u_zoom;
  uniform float u_density;
  uniform float u_sharpness;
  uniform vec3 u_color_pattern;
  uniform vec3 u_color_bg;

  // Simplex 3D Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857; 
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z); 
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ ); 
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 center = uv - 0.5;
    if (u_resolution.x > u_resolution.y) {
        center.x *= u_resolution.x / u_resolution.y;
    } else {
        center.y *= u_resolution.y / u_resolution.x;
    }
    center.x = abs(center.x);
    float t = u_time * u_speed * 0.1;
    float n1 = snoise(vec3(center * u_zoom, t + u_seed));
    float n2 = snoise(vec3(center * u_zoom * 2.0 + vec2(n1 * 0.5), t * 1.5 + u_seed + 10.0));
    float noiseVal = n1 * 0.6 + n2 * 0.4;
    float finalVal = noiseVal * 0.5 + 0.5;
    float threshold = 1.0 - u_density;
    float edgeWidth = (1.0 - u_sharpness) * 0.2 + 0.001;
    float mask = smoothstep(threshold - edgeWidth, threshold + edgeWidth, finalVal);
    vec3 color = mix(u_color_bg, u_color_pattern, mask);
    gl_FragColor = vec4(color, 1.0);
  }
\`;

function hexToRgb(hex: string): [number, number, number] {
  const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
}

const Rorschach: React.FC<RorschachProps> = ({
  patternColor = '#111111',
  backgroundColor = '#eeeeee',
  speed = 1.0,
  zoom = 2.5,
  density = 0.5,
  sharpness = 0.9,
  seed = 12345,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false });
    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      seed: gl.getUniformLocation(program, 'u_seed'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      zoom: gl.getUniformLocation(program, 'u_zoom'),
      density: gl.getUniformLocation(program, 'u_density'),
      sharpness: gl.getUniformLocation(program, 'u_sharpness'),
      colorPattern: gl.getUniformLocation(program, 'u_color_pattern'),
      colorBg: gl.getUniformLocation(program, 'u_color_bg'),
    };

    let startTime = performance.now();
    const render = (time: number) => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
      gl.uniform2f(locs.resolution, canvas.width, canvas.height);
      gl.uniform1f(locs.time, (time - startTime) * 0.001);
      gl.uniform1f(locs.seed, seed);
      gl.uniform1f(locs.speed, speed);
      gl.uniform1f(locs.zoom, zoom);
      gl.uniform1f(locs.density, density);
      gl.uniform1f(locs.sharpness, sharpness);
      const pColor = hexToRgb(patternColor);
      const bColor = hexToRgb(backgroundColor);
      gl.uniform3f(locs.colorPattern, pColor[0], pColor[1], pColor[2]);
      gl.uniform3f(locs.colorBg, bColor[0], bColor[1], bColor[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      reqIdRef.current = requestAnimationFrame(render);
    };
    reqIdRef.current = requestAnimationFrame(render);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      gl.deleteProgram(program);
    };
  }, [patternColor, backgroundColor, speed, zoom, density, sharpness, seed]);

  return <canvas ref={canvasRef} className={\`w-full h-full block \${className}\`} />;
};

export default Rorschach;`;
