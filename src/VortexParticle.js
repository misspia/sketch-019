import * as THREE from 'three';
import { utils } from './utils';

const MIN_Z = -10;
const MAX_Z = 8;
const MIN_RADIUS = 1;
const MAX_RADIUS = 10;

export class VortexParticle {
    constructor(freqIndex) {
        this.freqIndex = freqIndex;
        this.position = new THREE.Vector3()
        this.zMinVelocity = utils.randomFloatBetween(0.01, 0.05)
        this.zMaxVelocity = utils.randomFloatBetween(0.01, 0.05)

        this.angle = utils.randomFloatBetween(0, 2 * Math.PI)
        this.minAngleIncrement = utils.randomFloatBetween(0, 0)
        this.maxAngleIncrement = utils.randomFloatBetween(0.001, 0.01)
        this.updateCirclePos()
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
        const zIncrement = utils.remapFreq(this.zMinVelocity, this.zMaxVelocity, freq)
        if(this.position.z <= MIN_Z) {
            this.position.z = MAX_Z;
        } else {
            this.position.z -= zIncrement;
        }
        this.angle += utils.remapFreq(this.minAngleIncrement, this.maxAngleIncrement, freq)
        this.updateCirclePos()
    }
}