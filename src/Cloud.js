import * as THREE from 'three'
import { utils } from './utils'

const MIN_X = -6;
const MAX_X = 6;
const MIN_Y = 5;
const MAX_Y = 8;
const MIN_Z = -5;
const MAX_Z = 5;
export class Cloud {
  constructor(freqIndex = 0) {
    this.freqIndex = freqIndex
    this.position = new THREE.Vector3(
      utils.randomFloatBetween(MIN_X, MAX_X),  
      utils.randomFloatBetween(MIN_Y, MAX_Y),  
      utils.randomFloatBetween(MIN_Z, MAX_Z),  
    )
    this.size = utils.randomFloatBetween(1, 5)
    this.alpha = utils.randomFloatBetween(0.8, 1)
    this.yMin = utils.randomFloatBetween(0, 1)
    this.yMax = utils.randomFloatBetween(2, 3)
  }
 
  update() {

  }
}
