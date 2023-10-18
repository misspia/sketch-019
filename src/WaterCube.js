import * as THREE from 'three'

// https://www.liquid.fish/current/threejs
export class WaterCube {
  constructor() {
    this.geometry = new THREE.BoxGeometry(5, 5, 5)
    this.material = new THREE.MeshBasicMaterial({
      color: 0x0000ff
    })
    this.group = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.group.position
  }

  update() {

  }
}
