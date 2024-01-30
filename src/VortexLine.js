import * as THREE from 'three';
import { VortexParticle } from './VortexParticle'
import { utils } from './utils'

const NUM_PARTICLES = 50;

const getPointMultiplier = () => {
return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export class VortexLine {
    constructor(context, points = []) {
        this.context = context;
        this.particles = [];

        this.curve = new THREE.SplineCurve(points);
        this.createParticles();

        this.group = new THREE.Group();
    }

    get position() {
        return this.group.position
    }

    createParticles() {
        for(let i = 0; i < NUM_PARTICLES; i++) {
            const freqIndex = utils.randomIntBetween(this.context.spectrumStart.midrange, this.context.spectrumStart.highrange)
            const particle = new VortexParticle(freqIndex, this.curve)
            this.particles.push(particle)
        }
    }

    update() {
        this.particles.forEach(particle => {
            const freq = this.context.audio.frequencyData[particle.freqIndex]
            particle.update(freq)
        })
    }
}