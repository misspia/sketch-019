import * as THREE from 'three'
import { utils } from './utils'

const MIN_X = -5;
const MAX_X = 5;
const MIN_Y = 0;
const MAX_Y = 6;
const MIN_Z = -10;
const MAX_Z = 3;

export class Pillar {
  constructor(freqIndex = 0) {
    this.freqIndex = freqIndex

    this.geometry = new THREE.BoxGeometry(0.5, 5, 0.5)
    this.material = new THREE.MeshPhysicalMaterial({
      color: 0xbd9999,
      emissive: 0x000000,
      roughness: 0.346,
      metalness: 0.802,
      ior: 1,
      reflectivity: 1,
      iridescence: 0,
      iridescenceIOR: 1.3,
      sheen: 1,
      sheenRoughness: 0,
      sheenColor: 0x000000,
      clearcoat: 0,
      clearcoatRoughness: 0,
      specularIntensity: 0,
      specularColor: 0xffffff,
    })
    this.group = new THREE.Mesh(this.geometry, this.material)

    this.minZIncrement = utils.randomFloatBetween(0.001, 0.001)
    this.maxZIncrement = utils.randomFloatBetween(0.01, 0.05)

    this.reset()
    this.position.z = utils.randomFloatBetween(MIN_Z, MAX_Z / 2)
  }

  get position() {
    return this.group.position
  }

  reset() {
    const x = utils.randomFloatBetween(MIN_X, MAX_X)
    const y = MAX_Y - utils.remap(0, MAX_X, MIN_Y, MAX_Y, Math.abs(x))
    this.position.set(x, y, MIN_Z)
    this.group.scale.setY(utils.remap(MIN_Y, MAX_Y, 0.5, 1, MAX_Y - y))

  }

  update(freq) {
    if(this.position.z >= MAX_Z) {
      this.reset()
    } else {
      this.position.z += utils.remapFreq(this.minZIncrement, this.maxZIncrement, freq)
    }
  }
}
