import * as THREE from 'three'
import { utils } from './utils'

const MIN_Z = 0;
const MAX_Z = 1;

const MIN_RADIUS = 3
const MAX_RADIUS = 8

export class Cloud {
  constructor(freqIndex = 0) {
    this.freqIndex = freqIndex

    this.position = new THREE.Vector3(0, 0, 0)
    // this.size = utils.randomFloatBetween(7, 10)
    this.size = 10
    this.alpha = 1
    this.alpha = utils.randomFloatBetween(0.8, 1)
    this.xRotation = utils.randomFloatBetween(0, utils.toRadians(270))

    this.minZIncrement = utils.randomFloatBetween(0.001, 0.001)
    this.maxZIncrement = utils.randomFloatBetween(0.01, 0.05)

    this.angle = utils.randomFloatBetween(0, 2 * Math.PI)
    this.minAngleIncrement = utils.randomFloatBetween(0, 0)
    this.maxAngleIncrement = utils.randomFloatBetween(0.001, 0.01)
    this.updateCirclePos()
  }
 
  updateCirclePos() {
    const radius = utils.remap(MIN_Z, MAX_Z, MIN_RADIUS, MAX_RADIUS, this.position.z)
    this.position.set(
      radius * Math.cos(this.angle), 
      radius * Math.sin(this.angle),
      this.position.z
    )
  }

  update(freq) {
    this.angle += utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)

    let z = this.position.z
    if(z < MIN_Z) {
      z = MAX_Z
    } else {
      z -= utils.remapFreq(this.minZIncrement, this.maxZIncrement, freq)
    }
    this.position.setZ(z)

    this.updateCirclePos(freq)

  }
}
