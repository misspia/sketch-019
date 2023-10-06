import * as THREE from 'three'
import { utils } from './utils'

// https://www.google.com/search?q=cute+3d+cloud&tbm=isch&ved=2ahUKEwiU7OSn092BAxWrF2IAHbmcA2IQ2-cCegQIABAA&oq=cute+3d+cloud&gs_lcp=CgNpbWcQAzIFCAAQgAQ6BAgjECc6BwgAEIoFEEM6BggAEAgQHjoICAAQgAQQsQM6CggAEIoFELEDEENQ4wdYnhtgohxoAHAAeACAAVaIAfQHkgECMTSYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=PgMeZZTVAauviLMPubmOkAY&bih=1166&biw=2327&rlz=1C1CHBF_enNL926NL926#imgrc=gKUqg_V0_q2g_M
export class Cloud {
  constructor() {
    this.geometry = this.generateGeometry()
    this.material = new THREE.MeshToonMaterial({
      color: 0xffffff,
    })
    this.group = new THREE.Mesh(this.geometry, this.material)
  }
  get position() {
    return this.group.position
  }
  generateGeometry() {
    return new THREE.IcosahedronGeometry(1, 5);
  }

  update() {

  }
}
