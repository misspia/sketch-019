import * as THREE from 'three'
import { SketchManager } from './SketchManager'
import { audioMeta, BeatManager } from './audio'
import { TestGraph } from './TestGraph'

export class Sketch extends SketchManager {
  constructor(canvas, audioElement) {
    super(canvas, audioElement)
    this.audioSrc = audioMeta.url;
    this.fftSize = 256;
    this.numFrequencyNodes = this.fftSize / 2;
    this.spectrumStart = {
      bass: 0,
      midrange: 10,
      highrange: 20,
    }
    this.testGraph = new TestGraph({
      numNodes: this.numFrequencyNodes,
      midrange: this.spectrumStart.midrange,
      highrange: this.spectrumStart.highrange,
    })
    this.beatManager = new BeatManager(this)
  }

  init() {
    this.setClearColor(0x000000)
    this.setCameraPos(2, 0, 6)
    this.lookAt(2, 0, 0)
    this.initAudio({
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    });
    this.audio.setSmoothingTimeConstant(0.8);
    this.audio.volume(1)

    this.scene.add(this.testGraph.group)
  }

  draw() {
    this.renderer.render(this.scene, this.camera)

    this.audio.getByteFrequencyData();
    this.beatManager.update()
    this.testGraph.update(this.audio.frequencyData, this.beatManager.bassAverages, this.beatManager.midrangeAverages, this.beatManager.highrangeAverages, this.beatManager.midrangeAverages, this.beatManager.highrangeAverages)
    
    requestAnimationFrame(() => this.draw())
  }
}
