import * as THREE from 'three'
import utils from "../utils"

export class BlockOutline {
  constructor(baseGeometry) {
    this.geometry = new THREE.EdgesGeometry(baseGeometry);
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true
    })
    this.group = new THREE.LineSegments(this.geometry, this.material);
  }

  get uniforms() {
    return this.material.uniforms;
  }

  update() {

  }
}
