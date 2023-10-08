precision highp float;

uniform sampler2D diffuseTexture;
varying float vAlpha;
varying float vFreq;
varying float vIsPositiveSide;

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
    vec3 color = vec3(0.0, 0.0, 0.0);

    if(vIsPositiveSide == 0.0) {
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
    float alpha = vAlpha * (1.0 - length(gl_PointCoord.xy)) * 3.3;
    gl_FragColor = texture2D(diffuseTexture, coords) * vec4(color, alpha);
    
}
