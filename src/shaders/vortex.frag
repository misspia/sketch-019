precision highp float;

uniform sampler2D diffuseTexture;

uniform float uFreq;
varying vec2 vUv;
varying float vAlpha;
varying float vFreq;

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, uFreq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - uFreq);
}

void main() {
    vec2 coords = (gl_PointCoord - 0.5) + 0.5;
    gl_FragColor = texture2D(diffuseTexture, coords) * vec4(0.0, 0.0, 1.0, 1.0);
}
