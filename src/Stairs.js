import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

const NUM_STEPS = 70

export class Stairs {
    constructor() {
        this.geometry = new THREE.BufferGeometry()
        this.createSteps()
        
        this.material = new THREE.MeshBasicMaterial({ color: 0x000000 })
        this.group = new THREE.Mesh(this.geometry, this.material)
    }

    get position() {    
        return this.group.position
    }

    createSteps() {
        const geometry = new THREE.BoxGeometry(3, 0.2, 1)
        let x = 0;
        let y = 0;
        let z = 0;
        
        const xIncrement = 0.2;
        const yIncrement = 0.2;
        const zIncrement = -1;

        let xDirection = 1;
        const geometries = []

        for(let i = 0; i < NUM_STEPS; i++) {
            const stepGeometry = geometry.clone()
            
            if(i % 10 === 0) {
                xDirection *= -1;
            }
            x += xIncrement * xDirection;
            y += yIncrement;
            z += zIncrement;

            stepGeometry.translate(x, y, z)
            geometries.push(stepGeometry)
        }
        this.geometry = BufferGeometryUtils.mergeGeometries(geometries)
    }

    update() {

    }
}