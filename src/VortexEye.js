import * as THREE from 'three'
import { utils } from './utils';
export class VortexEye {
  constructor(context) {
    this.context = context;
    this.geometry = new THREE.IcosahedronGeometry(0.5, 8);
    this.material = new THREE.MeshBasicMaterial({ color: 0x000000 });    
    this.group = new THREE.Mesh(this.geometry, this.material);

    this.minScale = 0.5;
    this.maxScale = 1.7;
  } 
  
  get position() {
    return this.group.position
  }
  update() {
    const freq = this.context.beatManager.latestBassAverage
    const scale = utils.remapFreq(this.minScale, this.maxScale, freq)
    this.group.scale.set(scale, scale, scale)
  }
}