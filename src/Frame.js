import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';


const FRAME_WIDTH = 5;
const FRAME_PLANE_HEIGHT = FRAME_WIDTH * 1.5
const FRAME_ARC_RADIUS = FRAME_WIDTH / 2

export class Frame {
  constructor() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      transparent: true,
    });
   
    const arcGeometry = new THREE.CircleGeometry(FRAME_ARC_RADIUS, 20, 0, Math.PI);
    arcGeometry.translate(0, FRAME_PLANE_HEIGHT / 2, 0)
    const planeGeometry = new THREE.PlaneGeometry(FRAME_WIDTH, FRAME_PLANE_HEIGHT)
    
    this.geometry = BufferGeometryUtils.mergeGeometries([arcGeometry, planeGeometry])

    this.group = new THREE.Mesh(this.geometry, this.material);
  }

  get position () {
    return this.group.position
  }

  get uniforms () {
    return this.material.uniforms
  }

  update() {

  }
}
