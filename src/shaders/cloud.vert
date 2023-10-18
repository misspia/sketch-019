precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float pointMultiplier;

attribute vec3 position;
attribute float size;
attribute float alpha;
attribute float freq;
attribute float yMin;
attribute float yMax;

varying float vAlpha;
varying float vFreq;
varying float vYMin;
varying float vYMax;

void main() {

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;
  vAlpha = alpha;
  vFreq = freq;
  vYMin = yMin;
  vYMax = yMax;
}
