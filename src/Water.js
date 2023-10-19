import * as THREE from 'three'
import { utils } from './utils'

export class Water {
  constructor(context = {}) {
    this.context = context
    this.geometry = new THREE.PlaneGeometry(10, 10);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xaaaaff
    })
    this.group = new THREE.Mesh(this.geometry, this.material)
    this.rotation.x = -utils.toRadians(90)
    this.position.y = -0.5
  }

  get position() {
    return this.group.position
  }

  get rotation() {
    return this.group.rotation
  }
  update() {

  }
}
