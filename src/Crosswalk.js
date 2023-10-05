import * as THREE from 'three'
import { CrosswalkLine } from './CrosswalkLine'

const NUM_LINES = 5;
const LINE_WIDTH = 1;
const LINE_HEIGHT = 3;
const LINE_X_GAP = 1;

// https://www.pinterest.ca/pin/516295544785518297/
export class Crosswalk {
  constructor(context) {
    this.context = context
    
    this.lines = []
    this.group = new THREE.Group();

    this.createLines()
    this.bbox = new THREE.Box3()
    this.bbox.setFromObject(this.group)
  }
  get position() {
    return this.group.position
  }
  get width() {
    return this.bbox.max.x - this.bbox.min.x
  }
  get depth() {
    return this.bbox.max.z - this.bbox.min.z
  }

  createLines() {
    let x = 0;

    for(let i = 0; i < NUM_LINES; i++) {
      const line = new CrosswalkLine(LINE_WIDTH, LINE_HEIGHT);
      line.position.x = x
      x += LINE_WIDTH + LINE_X_GAP;

      this.group.add(line.group)
      this.lines.push(line)
    }
  }

  center() {
    this.position.set(
      -this.width / 2,
      0,
      this.depth / 2
    )
  }
  update() {
    this.lines.forEach((line) => line.update(100))
  }
}
