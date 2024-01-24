import * as THREE from 'three';
import fragmentShader from './shaders/fog.frag'
import vertexShader from './shaders/fog.vert'

export class FogPlane {
    constructor(context) {
        this.context = context;
        this.geometry = new THREE.PlaneGeometry(22, 22);
        this.material = new THREE.RawShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms: {
                uFreq: { value: 0 },
            },
            transparent: true,
        })
        this.group = new THREE.Mesh(this.geometry, this.material)
    }

    get position() {
        return this.group.position
    }

    get uniforms() {
        return this.material.uniforms
    }

    update() {
        this.uniforms.uFreq.value = this.context.beatManager.latestBassAverage
    }
}