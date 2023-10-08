import * as THREE from 'three'
import { utils } from './utils'
import vertexShader from './shaders/line.vert'
import fragmentShader from './shaders/line.frag'

const MIN_X_INCREMENT = 0;
const MAX_X_INCREMENT = 0.1;

const MIN_X = 0;
const MAX_X = 10;

const X_OPACITY_THRESHOLD = MAX_X * 0.2
const LOWER_X_OPACITY_THRESHOLD = MIN_X + X_OPACITY_THRESHOLD
const UPPER_X_OPACITY_THRESHOLD = MAX_X - X_OPACITY_THRESHOLD



export class CrosswalkLine {
  constructor(width = 1, height = 3) {
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.material = new THREE.MeshToonMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
      transparent: true,
    })
    // this.material = new THREE.RawShaderMaterial({
    //   vertexShader,
    //   fragmentShader,
    //   uniforms: {
    //     uFreq: { value: 0 }
    //   }
    // })
    this.group = new THREE.Mesh(this.geometry, this.material)
    this.rotation.x = utils.toRadians(-90)
    this.group.receiveShadow = true
  }

  get position() {
    return this.group.position
  }
  get rotation() {
    return this.group.rotation
  }
  get width() {
    return this.bbox.max.x - this.bbox.min.x
  }
  get depth() {
    return this.bbox.max.z - this.bbox.min.z
  }
  center() {
    this.position.set(
      -this.width / 2,
      0,
      -this.depth / 2
    )
  }

  update(freq = 0) {
    /**
     * x position
     */
    if(this.position.x >= MAX_X) {
      this.position.x = MIN_X
    } else {
      this.position.x += Math.min(utils.remapFreq(MIN_X_INCREMENT, MAX_X_INCREMENT, freq), MAX_X)
    }


    /**
     * opacity
     */
    if(this.position.x >= UPPER_X_OPACITY_THRESHOLD) {
      this.material.opacity = 1 - utils.remap(
        UPPER_X_OPACITY_THRESHOLD, 
        MAX_X, 
        0,
        1, 
        this.position.x
      )
    }
    if(this.position.x <= LOWER_X_OPACITY_THRESHOLD) {
      this.material.opacity = utils.remap(
        0,
        LOWER_X_OPACITY_THRESHOLD, 
        0, 
        1, 
        this.position.x
      )
    }
  }
}
