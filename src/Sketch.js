import * as THREE from 'three'
import { TestGraph } from './TestGraph'
import { SketchManager } from './SketchManager'
import { audioMeta, BeatManager } from './audio'
import { LightsManager } from './LightsManager'
import { Block } from './Block'
import { Crosswalk } from './Crosswalk'
import { Clouds } from './Clouds'

export class Sketch extends SketchManager {
  constructor(canvas, audioElement) {
    super(canvas, audioElement)
    this.audioSrc = audioMeta.url;
    this.fftSize = 256;
    this.numFrequencyNodes = this.fftSize / 2;
    this.spectrumStart = {
      bass: 0,
      midrange: 5,
      highrange: 70,
    }
    this.testGraph = new TestGraph({
      numNodes: this.numFrequencyNodes,
      midrange: this.spectrumStart.midrange,
      highrange: this.spectrumStart.highrange,
    })
    this.beatManager = new BeatManager(this);
    this.lights = new LightsManager()
    this.block = new Block()
    this.crosswalk = new Crosswalk(this)
    this.clouds = new Clouds(this)
  }

  init() {
    this.setClearColor(0x26b3f0)
    this.setCameraPos(0, 3, 12)
    this.lookAt(0, 0, 0)
    this.initAudio({
      fftSize: this.fftSize,
      dataLength: this.numFrequencyNodes,
    });
    this.audio.setSmoothingTimeConstant(0.85);
    this.audio.volume(1)

    this.crosswalk.center()

    // this.scene.add(this.testGraph.group)
    this.scene.add(this.lights.group)
    // this.scene.add(this.block.group)
    this.scene.add(this.crosswalk.group)
    console.debug(this.clouds.group)
    this.scene.add(this.clouds.group)
  }

  draw() {
    this.renderer.render(this.scene, this.camera)
    this.controls.update()

    this.audio.getByteFrequencyData();
    this.beatManager.update()
    this.crosswalk.update()
    this.clouds.update()


    this.testGraph.update(this.audio.frequencyData, this.beatManager.bassAverages, this.beatManager.midrangeAverages, this.beatManager.highrangeAverages, this.beatManager.midrangeAverages, this.beatManager.highrangeAverages)
    
    requestAnimationFrame(() => this.draw())
  }
}
