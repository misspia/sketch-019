import * as THREE from 'three'
import { utils } from './utils'

export class LightsManager {
  constructor() {
    this.group = new THREE.Group()

    this.ambient = new THREE.AmbientLight(0x000000, 0.5);
    this.group.add(this.ambient)

    const directional1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directional1.position.set( 0, 200, 0 );
    this.group.add(directional1);

    const directional2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directional2.position.set( 100, 200, 100 );
    this.group.add( directional2 );

    const directional3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directional3.position.set( - 100, - 200, - 100 );
    this.group.add( directional3 );

    // this.spot = new THREE.SpotLight(0xffaaff, 1, 0, utils.toRadians(45))
    // this.group.add(this.spot)
    // this.spot.position.set(5, 3, 1)

    // const spotHelper = new THREE.SpotLightHelper(this.spot, 0xfff0000)
    // this.group.add(spotHelper)
  }

  update() {

  }
}