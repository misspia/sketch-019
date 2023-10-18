import * as THREE from 'three'
import { utils } from './utils'

const MIN_X = -10;
const MAX_X = 5;
const MIN_Y = 1;
const MAX_Y = 2;
const MIN_Z = -4;
const MAX_Z = 4;

const X_OPACITY_THRESHOLD = MAX_X * 0.2
const LOWER_X_OPACITY_THRESHOLD = MIN_X + X_OPACITY_THRESHOLD
const UPPER_X_OPACITY_THRESHOLD = MAX_X - X_OPACITY_THRESHOLD

export class Cloud {
  constructor(freqIndex = 0) {
    this.freqIndex = freqIndex

    this.position = new THREE.Vector3(
      utils.randomFloatBetween(MIN_X, MAX_X),  
      utils.randomFloatBetween(MIN_Y, MAX_Y),  
      utils.randomFloatBetween(MIN_Z, MAX_Z),  
    )
    this.size = utils.randomFloatBetween(3, 6)
    this.alpha = 1
    this.alpha = utils.randomFloatBetween(0.8, 1)
    this.yMax = utils.randomFloatBetween(2, 3)
    this.xRotation = utils.randomFloatBetween(0, utils.toRadians(270))

    this.minXIncrement = utils.randomFloatBetween(0.001, 0.001)
    this.maxXIncrement = utils.randomFloatBetween(0.01, 0.05)
    this.minZIncrement = utils.randomFloatBetween(0.001, 0.001)
    this.maxZIncrement = utils.randomFloatBetween(0.01, 0.05)
    this.zIncrementSign = utils.randomBool() ? 1 : -1
  }
 
  update(freq) {
    if(this.position.x >= MAX_X) {
      this.position.x = MIN_X
    } else {
      this.position.x += utils.remapFreq(this.minXIncrement, this.maxXIncrement, freq)
    }

    if(this.position.z >= MAX_Z) {
      this.zIncrementSign = -1
    } else if(this.position.z <= MIN_Z) {
      this.zIncrementSign = 1
    }
    const zIncrement = utils.remapFreq(this.minZIncrement, this.maxZIncrement, freq)
    this.position.z += zIncrement * this.zIncrementSign


    /**
     * opacity
     */
    if(this.position.x >= UPPER_X_OPACITY_THRESHOLD) {
      this.alpha = 1 - utils.remap(
        UPPER_X_OPACITY_THRESHOLD, 
        MAX_X, 
        0,
        1, 
        this.position.x
      )
    }
    if(this.position.x <= LOWER_X_OPACITY_THRESHOLD) {
      this.alpha = utils.remap(
        0,
        LOWER_X_OPACITY_THRESHOLD, 
        0, 
        1, 
        this.position.x
      )
    }
  }
}
