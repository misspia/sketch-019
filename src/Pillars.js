import * as THREE from 'three'
import { Pillar } from './Pillar';
import { utils } from './utils'

const NUM_PILLARS = 60;

export class Pillars {
  constructor(context) {
    this.context = context
    this.pillars = []
    this.group = new THREE.Group()
    this.createPillars()
  }

  get position() {
    return this.group.position
  }

  createPillars() {
    const freqIndex = utils.randomIntBetween(this.context.spectrumStart.midrange, this.context.spectrumStart.highrange)
    for(let i = 0; i < NUM_PILLARS; i ++) {
      const pillar = new Pillar(freqIndex)
      this.pillars.push(pillar)
      this.group.add(pillar.group)
    }
  }

  update() {
    const { frequencyData } = this.context.audio
    this.pillars.forEach((pillar) => pillar.update(frequencyData[pillar.freqIndex]))
  }
}
