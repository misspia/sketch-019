import * as THREE from 'three';
import fragmentShader from './shaders/fog.frag'
import vertexShader from './shaders/fog.vert'

export class FogPlane {
    constructor(context) {
        this.context = context;
        this.geometry = new THREE.PlaneGeometry(20, 20);
        this.material = new THREE.RawShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms: {

            },
            transparent: true,
        })
        this.group = new THREE.Mesh(this.geometry, this.material)
    }

    get position() {
        return this.group.position
    }
    update() {

    }
}