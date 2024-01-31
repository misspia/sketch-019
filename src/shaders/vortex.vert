precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;
attribute float alpha;
attribute float freq;
attribute vec2 uv;

varying float vAlpha;
varying float vFreq;
varying vec2 vUv;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 10.0;
  vUv = uv;
  vAlpha = alpha;
  vFreq = freq;
}
