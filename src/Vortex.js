import * as THREE from 'three'
import { VortexLine } from './VortexLine';
import { VortexEye } from './VortexEye'
import { utils } from './utils';

const VORTEX_LINES_META = [
    {
        position: new THREE.Vector3(-2, -2, 0),
        rotation: new THREE.Euler(
            utils.toRadians(100), 
            utils.toRadians(0), 
            utils.toRadians(-80),
        ),
        points: [
            new THREE.Vector3( -50, 0, 0 ),
            new THREE.Vector3( 0, 8, 0 ),
            new THREE.Vector3( 15, 5, 0 ),
            new THREE.Vector3( 20, 0, 0 )
        ]
    },
    {
        position: new THREE.Vector3(8, 4, -10),
        rotation: new THREE.Euler(
            utils.toRadians(96), 
            utils.toRadians(180), 
            utils.toRadians(-80),
        ),
        points: [
            new THREE.Vector3( -50, 0, 0 ),
            new THREE.Vector3( 0, 8, 0 ),
            new THREE.Vector3( 15, 5, 0 ),
            new THREE.Vector3( 20, 0, 0 )
        ]
    },
    
]
export class Vortex {
    constructor(context) {
        this.context = context;

        this.group = new THREE.Group();
        this.eye = new VortexEye(this.context)
        console.debug(this.eye)
        this.group.add(this.eye.group)
        
        this.lines = []
        this.createVortexLines()
    }

    get position () {
        return this.group.position
    }

    createVortexLines() {
        VORTEX_LINES_META.forEach(meta => {
            const vortexLine = new VortexLine(this.context, meta.points)
            vortexLine.position.copy(meta.position)
            vortexLine.rotation.copy(meta.rotation)

            this.lines.push(vortexLine)
            this.group.add(vortexLine.group)
        })
    }

    update() {
        this.eye.update()
        this.lines.forEach(line => line.update())
    }
}