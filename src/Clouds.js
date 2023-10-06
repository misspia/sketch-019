import * as THREE from 'three'
import { Cloud } from './Cloud'
import { utils } from './utils';

const NUM_CLOUDS = 5;

const MIN_X = -6;
const MAX_X = 6;
const MIN_Y = 5;
const MAX_Y = 8;
const MIN_Z = -5;
const MAX_Z = 5;

export class Clouds {
  constructor(context) {
    this.context = context
    this.group = new THREE.Group()
    this.clouds = []

    this.createClouds()
    this.group.receiveShadow = true
    this.group.castShadow = true
  }
  get position() {
    return this.group.position
  }
  createClouds() {
    for(let i = 0; i < NUM_CLOUDS; i ++) {
      const cloud = new Cloud();
      cloud.position.set(
        utils.randomFloatBetween(MIN_X, MAX_X),
        utils.randomFloatBetween(MIN_Y, MAX_Y),
        utils.randomFloatBetween(MIN_Z, MAX_Z),
      )

      this.group.add(cloud.group);
      this.clouds.push(cloud)
    }
  }
  update() {
    this.clouds.forEach(cloud => cloud.update())
  }
}
