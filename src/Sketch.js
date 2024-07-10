import * as THREE from 'three'
import { TestGraph } from './TestGraph'
import { SketchManager } from './SketchManager'
import { audioMeta, BeatManager } from './audio'
import { LightsManager } from './LightsManager'
import { Clouds } from './Clouds'
import { Frame } from './Frame'

export class Sketch extends SketchManager {
  constructor(canvas, audioElement) {
    super(canvas, audioElement)
    this.clock = new THREE.Clock()
    this.audioSrc = audioMeta.url;
    this.fftSize = 256;
    this.numFrequencyNodes = this.fftSize / 2;
    this.spectrumStart = {
      bass: 0,
      midrange: 7,
      highrange: 30,
    }
    this.testGraph = new TestGraph({
      numNodes: this.numFrequencyNodes,
      midrange: this.spectrumStart.midrange,
      highrange: this.spectrumStart.highrange,
    })
    this.beatManager = new BeatManager(this);
    this.lights = new LightsManager()
    this.clouds = new Clouds(this)
    this.frame = new Frame(this)
  }

  init() {
    this.setClearColor(0x000000)
    this.setCameraPos(0, 0, 10)

    // this.initAudio({
    //   fftSize: this.fftSize,
    //   dataLength: this.numFrequencyNodes,
    // });
    // this.audio.setSmoothingTimeConstant(0.85);
    // this.audio.volume(1)
    // this.scene.add(this.testGraph.group)

    // this.scene.add(this.clouds.group)
    this.scene.add(this.frame.group);
  }

  draw() {
    this.renderer.render(this.scene, this.camera)
    this.controls.update()

    // this.audio.getByteFrequencyData();
    // this.beatManager.update()
    // this.testGraph.update(this.audio.frequencyData, this.beatManager.bassAverages, this.beatManager.midrangeAverages, this.beatManager.highrangeAverages, this.beatManager.midrangeAverages, this.beatManager.highrangeAverages)

    // this.clouds.update()
    this.frame.update()

    requestAnimationFrame(() => this.draw())
  }
}
