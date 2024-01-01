precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float pointMultiplier;

attribute vec3 position;
attribute float size;
attribute float angle;
attribute float alpha;
attribute float freq;

varying float vAlpha;
varying float vAngle;
varying float vFreq;
varying float vYMin;
varying float vYMax;

void main() {

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  // gl_PointSize = size * pointMultiplier / gl_Position.w;
  gl_PointSize = 100000000.0;
  vAlpha = alpha;
  vAngle = angle;
  vFreq = freq;
}
