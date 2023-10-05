import * as THREE from 'three'
import utils from "../utils"

export class BlockBase {
  constructor(width, height, depth) {
    // this.geometry = new THREE.BoxGeometry(width, height, depth);
    this.geometry = new THREE.IcosahedronGeometry(2, 8)
    // this.material = new THREE.MeshPhysicalMaterial({
    //   color: 0x2c6335,
    //   emissive: 0x000000,
    //   roughness: 0.3,
    //   metalness: 0,
    //   ior: 1.5,
    //   reflectivity: 0.5,
    //   iridescence: 0,
    //   iridescenceIOR: 1.3,
    //   sheen: 0,
    //   sheenRoughness: 1,
    //   sheenColor: 0x000000,
    //   clearcoat: 0,
    //   clearcoatRoughness: 0,
    //   specularIntensity: 1,
    //   specularColor: 0xffffff,
    //   side: THREE.FrontSide,
    // })
    this.material = new THREE.MeshToonMaterial({
      side: THREE.FrontSide,
      color: 0x049ef4,
    })
    this.group = new THREE.Mesh(this.geometry, this.material);
  }

  get uniforms() {
    return this.material.uniforms;
  }

  update() {

  }
}
