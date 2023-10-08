import * as THREE from 'three'
import { Cloud } from './Cloud'
import { utils } from './utils';
import { Assets } from './assets'
import fragmentShader from './shaders/cloud.frag'
import vertexShader from './shaders/cloud.vert'

const NUM_CLOUDS = 50;

const getPointMultiplier = () => {
  return window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
}

export class Clouds {
  constructor(context) {
    this.context = context
    this.clouds = []

    this.geometry = new THREE.BufferGeometry()
    this.createClouds()
    this.material = new THREE.RawShaderMaterial({
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        diffuseTexture: {
          value: new THREE.TextureLoader().load(Assets.cloudTexture),
        },
        pointMultiplier: {
          value: getPointMultiplier()
        }
      },
    })
    this.group = new THREE.Points(this.geometry, this.material)


    this.group.receiveShadow = true
    this.group.castShadow = true
  }
  get position() {
    return this.group.position
  }
  createClouds() {
    const yMin = []
    const yMax = []
    const positions = []
    const alphas = []
    const frequencies = []
    const side = []

    for (let i = 0; i < NUM_CLOUDS; i++) {
      const freqIndex = utils.randomIntBetween(0, this.context.spectrumStart.midrange)
      const cloud = new Cloud(freqIndex)
      this.clouds.push(cloud)

      /**
       * constant attributes
       */
      yMin.push(cloud.yMin)
      yMax.push(cloud.yMax)
      positions.push(cloud.position.x, cloud.position.y, cloud.position.z)
      alphas.push(cloud.alpha)
      frequencies.push(0)
      side.push(cloud.positiveSide ? 1 : 0)
    }
    this.geometry.setAttribute('yMin', new THREE.Float32BufferAttribute(yMin, 1))
    this.geometry.setAttribute('yMax', new THREE.Float32BufferAttribute(yMax, 1))
    this.geometry.setAttribute('isPositiveSide', new THREE.Float32BufferAttribute(side, 1))
  }

  update() {
    const positions = []
    const size = []
    const alphas = []
    const frequencies = []

    this.clouds.forEach((cloud) => {
      const freq = this.context.audio.frequencyData[cloud.freqIndex]
      frequencies.push(freq)

      cloud.update(freq)

      positions.push(
        cloud.position.x,
        cloud.position.y,
        cloud.position.z,
      )
      size.push(cloud.size)
      alphas.push(cloud.alpha)
    })

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1))
    this.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1))
    this.geometry.setAttribute('freq', new THREE.Float32BufferAttribute(frequencies, 1))
  }

}
