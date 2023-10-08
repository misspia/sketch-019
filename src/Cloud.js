import * as THREE from 'three'
import { utils } from './utils'

const MIN_X = -5;
const MAX_X = 1;
const MIN_Y = 4;
const MAX_Y = 6;

const POSITIVE_MIN_Z = 4;
const POSITIVE_MAX_Z = 12;
const NEGATIVE_MIN_Z = -4;
const NEGATIVE_MAX_Z = -12;
export class Cloud {
  constructor(freqIndex = 0) {
    this.freqIndex = freqIndex

    this.positiveSide = utils.randomBool()
    this.position = new THREE.Vector3(
      utils.randomFloatBetween(MIN_X, MAX_X),  
      utils.randomFloatBetween(MIN_Y, MAX_Y),  
      utils.randomFloatBetween(
        this.positiveSide ?  POSITIVE_MIN_Z : NEGATIVE_MIN_Z,
        this.positiveSide ? POSITIVE_MAX_Z : NEGATIVE_MAX_Z,
      ),  
    )
    this.size = utils.randomFloatBetween(4, 8)
    this.alpha = 1
    this.alpha = utils.randomFloatBetween(0.8, 1)
    this.yMax = utils.randomFloatBetween(2, 3)
    this.xRotation = utils.randomFloatBetween(0, utils.toRadians(270))
  }
 
  update() {

  }
}
