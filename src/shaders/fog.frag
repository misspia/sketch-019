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

float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

// https://www.shadertoy.com/view/tstXzS
// Book of shaders: https://thebookofshaders.com/13/
// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = remapFreq(0.3, 0.99);

    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}


void main() {
    float alpha = 1.0;

    // Time varying pixel color
    vec3 col = mix(vec3(1.0,0.0,0.0), vec3(0.0), fbm(vUv));
    
    alpha = 1.0 - remap(0.0, 1.0, 0.0, 1.0, col.r);    

    // get vUv distance from center
    float len = length(vUv - vec2(0.5, 0.5));
    alpha = remap(0.0, 0.5, 0.4, 1.0, len);

    gl_FragColor = vec4(col,alpha);
}
