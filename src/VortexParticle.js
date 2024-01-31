import * as THREE from 'three';
import { utils } from './utils';

const MIN_Z = -10;
const MAX_Z = 8;
const MIN_RADIUS = 1;
const MAX_RADIUS = 10;

export class VortexParticle {
    constructor(freqIndex, curve) {
        this.curve = curve
        this.freqIndex = freqIndex;
        this.position = new THREE.Vector3()
        this.zMinVelocity = utils.randomFloatBetween(0.01, 0.05)
        this.zMaxVelocity = utils.randomFloatBetween(0.01, 0.05)

        this.angle = utils.randomFloatBetween(0, 2 * Math.PI)
        this.minAngleIncrement = utils.randomFloatBetween(0, 0)
        this.maxAngleIncrement = utils.randomFloatBetween(0.001, 0.01)
        this.updateCirclePos()

        this.progress = 0;
        this.minProgressIncrement = utils.randomFloatBetween(0.001, 0.01)
        this.maxProgressIncrement = utils.randomFloatBetween(0.01, 0.05)
    }

    updateCirclePos() {
        const radius = utils.remap(MIN_Z, MAX_Z, MIN_RADIUS, MAX_RADIUS, this.position.z)
        this.position.set(
          radius * Math.cos(this.angle), 
          radius * Math.sin(this.angle),
          this.position.z
        )
      }

    update(freq) {
        this.angle += utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)
        this.updateCirclePos()

        const progressIncrement = utils.remapFreq(this.minProgressIncrement, this.maxProgressIncrement, freq)
        this.progress += progressIncrement
        if(this.progress > 1) {
            this.progress = 0;
        }
        const curvePosition = this.curve.getPointAt(this.progress)
        this.position.set(curvePosition.x, curvePosition.y, this.position.z)


    }
}