precision highp float;

uniform float uFreq;

varying vec2 vUv;

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
    vec3 color = vec3(0.0, 0.0, 0.0);

    if(vUv.y > 0.5) {
        color = vec3(
            reverseRemapFreq(0.05, 0.1),
            0.0, 
            reverseRemapFreq(0.05, 0.1)
        ); 

    } else {
        color = vec3(
            reverseRemapFreq(0.95, 1.0),
            0.9, 
            reverseRemapFreq(0.95, 1.0)
        ); 
    }
    gl_FragColor = vec4(color, 1.0);
    
}
