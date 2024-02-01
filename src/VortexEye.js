import * as THREE from 'three'

export class VortexEye {
  constructor(context) {
    this.context = context;
    this.geometry = new THREE.IcosahedronGeometry(0.5, 8);
    this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });    
    this.group = new THREE.Mesh(this.geometry, this.material);
  } 
  
  get position() {
    return this.group.position
  }
  update() {

  }
}