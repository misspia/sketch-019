import * as THREE from 'three'
import { utils } from '../utils'
import { BlockBase } from './BlockBase'
import { BlockOutline } from './BlockOutline'

const WIDTH = 2;
const HEIGHT = 4;
const DEPTH = 1;

// https://www.pinterest.ca/misspialeung/s-019/
// https://www.pinterest.ca/pin/516295544796430174/
// https://www.pinterest.ca/pin/516295544797553941/
export class Block {
  constructor() {
    this.base = new BlockBase(WIDTH, HEIGHT, DEPTH);
    this.outline = new BlockOutline(this.base.geometry);
    
    this.group = new THREE.Group()
    this.group.add(this.base.group)
    this.group.add(this.outline.group)
    this.group.rotateY(utils.toRadians(45))
  }

  get uniforms() {
    return this.material.uniforms;
  }

  update() {

  }
}
