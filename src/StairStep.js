import * as THREE from 'three'

export class StairStep {
    constructor() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
    }
    
    get position () {
        return this.group.position
    }

    update () {

    }
}