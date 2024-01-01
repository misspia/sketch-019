precision highp float;

uniform float uFreq;
varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/classic/2d')

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
    float alpha = 1.0;

    // get vUv distance from center
    float len = length(vUv - vec2(0.5, 0.5));

    if(len < 0.2) {
        alpha = 0.0;
    } else if(len < 0.25) {
        alpha = 0.3;
        // alpha = noise(vUv * 10.0) * 0.5 + 0.5;
        // alpha = noise(vUv);
        alpha = noise(vUv * 20.0) * 0.3 + 0.0;
    } else if(len < 0.3) {
        alpha = 0.6;
        // alpha = noise(vUv * 1.5);
    }

    gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
}
