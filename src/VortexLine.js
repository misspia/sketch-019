import * as THREE from 'three';
import { VortexParticle } from './VortexParticle'
import { utils } from './utils'
import { Assets } from './assets'
import fragmentShader from './shaders/vortex.frag'
import vertexShader from './shaders/vortex.vert'

const NUM_PARTICLES = 50;

const getPointMultiplier = () => {
return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export class VortexLine {
    constructor(context, points = []) {
        this.context = context;
        this.particles = [];

        this.curve = new THREE.CatmullRomCurve3(points);
        this.createParticles();

        this.geometry = new THREE.BufferGeometry()
        this.material = new THREE.RawShaderMaterial({
            depthTest: true,
            depthWrite: false,
            transparent: true,
            vertexColors: true,
            vertexShader,
            fragmentShader,
            uniforms: {
              diffuseTexture: {
                value: new THREE.TextureLoader().load(Assets.cloudTexture),
              },
              pointMultiplier: {
                value: getPointMultiplier()
              }
            },
          })
          this.group = new THREE.Points(this.geometry, this.material)
    }

    get position() {
        return this.group.position
    }

    get rotation() {
        return this.group.rotation
    }

    createParticles() {
        for(let i = 0; i < NUM_PARTICLES; i++) {
            const freqIndex = utils.randomIntBetween(this.context.spectrumStart.midrange, this.context.spectrumStart.highrange)
            const particle = new VortexParticle(freqIndex, this.curve)
            this.particles.push(particle)
        }
    }

    update() {
        const positions = []
        const alphas = [];
        const frequencies = []
        this.particles.forEach(particle => {
            const freq = this.context.audio.frequencyData[particle.freqIndex]
            particle.update(freq)

            positions.push(particle.position.x, particle.position.y, particle.position.z)
            alphas.push(particle.alpha)
            frequencies.push(freq)

        });

        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
        this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(frequencies, 1))
    }
}