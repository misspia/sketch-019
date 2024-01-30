import * as THREE from 'three'
import { VortexParticle } from './VortexParticle';
import { utils } from './utils';
import { VortexLine } from './VortexLine';

const NUM_PARTICLES = 50;

const getPointMultiplier = () => {
    return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
  }

export class Vortex {
    constructor(context) {
        this.context = context;
        this.particles = [];
        this.geometry = new THREE.BufferGeometry()
        // this.createParticles();

        this.material = new THREE.PointsMaterial({
            color: 0x000000,
        })
        this.vortexLine = new VortexLine(context, [
            new THREE.Vector2( -10, 0 ),
            new THREE.Vector2( -2, 8 ),
            // new THREE.Vector2( 0, 0 ),
            // new THREE.Vector2( 5, -5 ),
            new THREE.Vector2( 10, 0 )
        ])

        const points = new THREE.Points(this.geometry, this.material)
        this.group = new THREE.Group();

        this.group.add(this.vortexLine.group)
        this.group.add(points)
    }

    createParticles() {
        for(let i = 0; i < NUM_PARTICLES; i++) {
            const freqIndex = utils.randomIntBetween(this.context.spectrumStart.midrange, this.context.spectrumStart.highrange)
            const particle = new VortexParticle(freqIndex)
            this.particles.push(particle)
        }
    }

    get position () {
        return this.group.position
    }

    update() {
        this.vortexLine.update()
        // const positions = []
        // const size = []
        // const alphas = []
        // const frequencies = []
        // const angles = []

        // this.particles.forEach(particle => {
        //     const freq = this.context.audio.frequencyData[particle.freqIndex]
        //     frequencies.push(freq)
      
        //     particle.update(freq)
      
        //     positions.push(
        //       particle.position.x,
        //       particle.position.y,
        //       particle.position.z,
        //     )
        //     alphas.push(particle.alpha)
        //     angles.push(particle.angle)
        // })
        // this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        // // this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
        // this.geometry.setAttribute('angle', new THREE.Float32BufferAttribute(size, 1))
        // this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(frequencies, 1))
    }
}