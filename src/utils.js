import * as THREE from 'three';

export const utils = {
  clamp: (min, max, value) => (
    Math.min(Math.max(value, min), max)
  ),
  toRadians: (degrees) => (
    degrees * Math.PI / 180
  ),
  calcCircumference: (radius) => (
    2 * Math.PI * radius
  ),
  getCenter: (obj3d) => (
    new THREE.Box3().setFromObject(obj3d).getCenter()
  ),
  randomFloatBetween: (min, max) => (
    Math.random() * (max - min) + min
  ),
  randomIntBetween: (min, max) => (
    Math.round(utils.randomFloatBetween(min, max))
  ),
  randomBool: () => (
    Math.random() > 0.5
  ),
  remap: (min1, max1, min2, max2, value) => (
    min2 + (max2 - min2) * (value - min1) / (max1 - min1)
  ),
  remapFreq: (min, max, value) => (
    utils.remap(0, 255, min, max, value)
  ),
}
