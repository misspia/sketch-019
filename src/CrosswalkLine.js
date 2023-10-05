import * as THREE from 'three'
import utils from './utils'

export class CrosswalkLine {
  constructor(width = 1, height = 3) {
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.material = new THREE.MeshToonMaterial({
      color: 0xffffff,
      side: THREE.FrontSide,
    })
    this.group = new THREE.Mesh(this.geometry, this.material)
    this.rotation.x = utils.toRadians(-90)
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

  update() {

  }
}
