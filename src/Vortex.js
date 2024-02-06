import * as THREE from 'three'
import { VortexLine } from './VortexLine';
import { VortexEye } from './VortexEye'
import { utils } from './utils';

const VORTEX_LINES_META = [
    {
        position: new THREE.Vector3(-6, -2.5, 16),
        rotation: new THREE.Euler(
            utils.toRadians(100), 
            utils.toRadians(0), 
            utils.toRadians(-80),
        ),
        points: [
            new THREE.Vector3( -8, -5, 0 ),
            new THREE.Vector3( 8, 18, 0 ),
            new THREE.Vector3( 18, 7, 0 ),
            new THREE.Vector3( 18, 5, 0 ),
        ]
    },
    {
        position: new THREE.Vector3(2.5, 0, 17),
        rotation: new THREE.Euler(
            utils.toRadians(96), 
            utils.toRadians(180), 
            utils.toRadians(-80),
        ),
        points: [
            new THREE.Vector3( -18, 0, 0 ),
            new THREE.Vector3( 0, 8, 0 ),
            new THREE.Vector3( 15, 5, 0 ),
            new THREE.Vector3( 23, 0, 0 )
        ]
    },
    {
        position: new THREE.Vector3(-8, 5, -51),
        rotation: new THREE.Euler(
            utils.toRadians(96), 
            utils.toRadians(180), 
            utils.toRadians(-80),
        ),
        points: [
            new THREE.Vector3( 40, 55, 0 ),
            new THREE.Vector3( -10, 10, 0 ),
            new THREE.Vector3( -30, 30, 0 ),
            new THREE.Vector3( -52, 5, 0 ),
            new THREE.Vector3( -53, 3, 0 ),
        ]
    },
    {
        position: new THREE.Vector3(3.5, -4.5, 0),
        rotation: new THREE.Euler(
            utils.toRadians(0), 
            utils.toRadians(40), 
            utils.toRadians(0),
        ),
        points: [
            new THREE.Vector3( 30, -28, 0 ),
            new THREE.Vector3( 12, -8, 0 ),
            new THREE.Vector3( 20, 3, 0 ),
            new THREE.Vector3( -3, 3, 0 ),
        ]
    },
    {
        position: new THREE.Vector3(1.5, 1, 0),
        rotation: new THREE.Euler(
            utils.toRadians(0), 
            utils.toRadians(0), 
            utils.toRadians(0),
        ),
        points: [
            new THREE.Vector3( 10, 16, 0 ),
            new THREE.Vector3( 15, 8, 0 ),
            new THREE.Vector3( 0, 0, 0 ),
        ]
    },
]
export class Vortex {
    constructor(context) {
        this.context = context;

        this.group = new THREE.Group();
        this.eye = new VortexEye(this.context)
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