precision highp float;

uniform sampler2D diffuseTexture;
varying float vAlpha;
varying float vAngle;
varying float vFreq;

const float PI = 3.1415926535897932384626433832795;
const vec2 HALF = vec2(0.5);

float remap(float min1, float max1, float min2, float max2, float value) {
    return min2 + (max2 - min2) * (value - min1) / (max1 - min1);
}

float remapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, vFreq);
}

float reverseRemapFreq(float min, float max) {
    return remap(0.0, 255.0, min, max, 255.0 - vFreq);
}


void main() {
    vec2 coords = (gl_PointCoord - 0.5) + 0.5;

    float sin_factor = sin(vAngle);
    float cos_factor = cos(vAngle);
    /**
    * https://stackoverflow.com/a/69472553
    */
    // move rotation origin from upper left to centre of image
    coords -= HALF.xy;
    // rotate around centre
    coords *= mat2(cos_factor, sin_factor, -sin_factor, cos_factor);
    coords += HALF.xy;

    // vec3 color = vec3(0.94, 0.54, 0.64);
    // vec3 color = vec3(0.83, 0.15, 0.33);
    vec3 color = vec3(0.15, 0.1, 0.1);

 
    float alpha = vAlpha * (1.0 - length(gl_PointCoord.xy)) * 3.3;
    gl_FragColor = texture2D(diffuseTexture, coords) * vec4(color, alpha);
    
}
