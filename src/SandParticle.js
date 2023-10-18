import * as THREE from 'three'
import { utils } from './utils'

const MIN_X = -10;
const MAX_X = 10;
const MIN_Y = -10;
const MAX_Y = 10;
const MIN_Z = -10;
const MAX_Z = 10;

export class SandParticle {
  constructor(freqIndex = 0) {
    this.freqIndex = freqIndex
    this.position = new THREE.Vector3()
  }

  update(freq = 0) {

  }
}
