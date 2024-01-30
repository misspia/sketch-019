import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import { utils } from './utils'

const NUM_STEPS = 43
const SWITCH_DIRECTION_THRESHOLD = 10
const CURVE_THRESHHOLD = 3
const MIN_STEP_ROTATION = 0;
const MAX_STEP_ROTATION = utils.toRadians(45);
export class Stairs {
    constructor() {
        this.geometry = new THREE.BufferGeometry()
        this.createSteps()
        
        // this.material = new THREE.MeshBasicMaterial({ color: 0x000000 })
        this.material = new THREE.MeshPhysicalMaterial({
            color: 0x793e3e,
            emissive: 0x000000,
            roughness: 0.346,
            metalness: 0.802,
            ior: 1,
            reflectivity: 1,
            iridescence: 0,
            iridescenceIOR: 1.3,
            sheen: 1,
            sheenRoughness: 0,
            sheenColor: 0x000000,
            clearcoat: 0,
            clearcoatRoughness: 0,
            specularIntensity: 0,
            specularColor: 0xffffff,
          })
        this.group = new THREE.Mesh(this.geometry, this.material)
        this.group.position.set(0, -5, 0)
        this.bbox = new THREE.Box3().setFromObject(this.group)
    }

    get position() {    
        return this.group.position
    }

    createSteps() {
        const geometry = new THREE.BoxGeometry(5, 0.5, 2)
        let x = 0;
        let y = 0;
        let z = 0;
        
        const xIncrement = 1;
        const yIncrement = 0.5;
        const zIncrement = -1;
        let xCurveFactor = 1;

        let xDirection = 1; // 1 or -1

        const geometries = []

        for(let i = 0; i < NUM_STEPS; i++) {
            const stepGeometry = geometry.clone()
            
            const distanceFromTurningPoint = i % SWITCH_DIRECTION_THRESHOLD 
            if(distanceFromTurningPoint === 0) {
                xDirection *= -1;
            }  
            if(distanceFromTurningPoint < CURVE_THRESHHOLD) {
                xCurveFactor =  utils.remap(0, CURVE_THRESHHOLD, 0, 1, i % SWITCH_DIRECTION_THRESHOLD)
            } else {
                xCurveFactor = 1;
            }
            x += xIncrement * xDirection * xCurveFactor;
            y += yIncrement;
            z += zIncrement;

            stepGeometry.rotateY(utils.remap(0, SWITCH_DIRECTION_THRESHOLD, MIN_STEP_ROTATION, MAX_STEP_ROTATION, distanceFromTurningPoint))
            stepGeometry.translate(x, y, z)
            geometries.push(stepGeometry)
        }
        this.geometry = BufferGeometryUtils.mergeGeometries(geometries)
    }

    update() {

    }
}