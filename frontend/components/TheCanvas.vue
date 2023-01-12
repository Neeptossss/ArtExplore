<template>
  <div ref="canvas"></div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const loader = new GLTFLoader()

export default {
  name: 'TheCanvas',
  data: function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    let model = null
    const light = new THREE.DirectionalLight('hsl(0, 100%, 100%)')
    const axes = new THREE.AxesHelper(5)
    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      light: light,
      axes: axes,
      model: model,
      speed: 0.01,
    }
  },
  created: function () {
    this.scene.add(this.camera)
    this.scene.add(this.light)
    //this.scene.add(this.axes)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.light.position.set(0, 0, 10)
    this.camera.position.z = 5
  },
  mounted: function () {
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()
    loader.load('model.gltf', (gltf) => {
      this.model = gltf.scene
      this.model.scale.set(1.5, 1.5, 1.5);
      this.model.lookAt(this.camera.position)
      this.scene.add(this.model)
    })
  },
  methods: {
    animate: function () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
      if (this.model) {
        this.model.rotation.y += this.speed
      }
    },
  },
  computed: {
    rotate: function () {
      if (this.speed === '') {
        return 0
      } else {
        return this.speed
      }
    },
  },
}
</script>

<style>
canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50px;
  left: 0;
}
</style>
