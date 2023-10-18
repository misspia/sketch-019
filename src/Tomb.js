import * as THREE from 'three'
import { Wall } from './TombMaterial'

// https://www.pinterest.ca/pin/516295544797671431/
// merge geometry: 
// https://stackoverflow.com/a/30246157
export class Tomb {
  constructor() {
    this.geometry = new THREE.BufferGeometry()
    const platformGeometry = new THREE.BoxGeometry(5, 10, 10)
    const platformMesh = new THREE.Mesh(platformGeometry)
    platformMesh.updateMatrix()
    this.geometry.merge(platformMesh.geometry, platformMesh.matrix)

    const wallGeometry = new THREE.PlaneGeometry(10, 10)
    const wallMesh = new THREE.Mesh(wallGeometry)
    wallMesh.updateMatrix()
    this.geometry.merge(wallMesh.geometry, wallMesh.matrix)

    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });
    this.group = new THREE.Mesh(this.geometry, this.material)
  }

  get position() {
    return this.group.position
  }

  update() {

  }
}
