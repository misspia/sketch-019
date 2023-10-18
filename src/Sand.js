import * as THREE from 'three'
import { utils } from './utils'
import { SandParticle } from './SandParticle';
const NUM_PARTICLES = 50;


export class Sand {
  constructor(context) {
    this.context = context
    this.particles = []
    this.geometry = new THREE.BufferGeometry()
    this.createSandParticles()

    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })
    this.group = new THREE.Points()
  }

  get position() {
    return this.group.position
  }

  createSandParticles() {
    const { midrange, highrange } = this.context.spectrumStart
    for(let i = 0; i < NUM_PARTICLES; i ++) {
      const freqIndex = utils.randomIntBetween(midrange, highrange)
      const particle = new SandParticle(freqIndex)
      this.particles.push(particle)
    }
  }

  update() {
    const positions = []
    const frequencies = []

    this.particles.forEach(particle => {
      particle.update()
      
      const freq = this.context.audio.frequencyData[particle.freqIndex]
      frequencies.push(freq)
      
      positions.push(
        particle.position.x,
        particle.position.y,
        particle.position.z,
      )
    })
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(frequencies, 31))
  }
}
