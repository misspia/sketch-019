import * as THREE from 'three'
import { utils } from './utils'

export class LightsManager {
  constructor() {
    this.group = new THREE.Group()

    this.ambient = new THREE.AmbientLight(0xffffff, 1);
    this.group.add(this.ambient)

    const directional1 = new THREE.DirectionalLight( 0xffffff, 0.05 );
    directional1.position.set( 0, 1, 100 );
    this.group.add(directional1);

    const directional2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directional2.position.set( 100, 200, 100 );
    this.group.add( directional2 );

    // this.spot = new THREE.SpotLight(0xffaaff, 1, 0, utils.toRadians(45))
    // this.group.add(this.spot)
    // this.spot.position.set(5, 3, 1)

    // const spotHelper = new THREE.SpotLightHelper(this.spot, 0xfff0000)
    // this.group.add(spotHelper)
  }

  update() {

  }
}
