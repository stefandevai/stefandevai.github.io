import React from "react"
import * as THREE from "three"
import sceneStyles from "./styles/scene.module.sass"

class Gear {
  constructor(props) {
    this.clock = new THREE.Clock()
    this.zRotation = props.zRotation

    this.pausedDuration = props.pausedDuration
    this.pausedDelay = props.pausedDuration
    this.movingDuration = props.movingDuration
    this.movingDelay = props.movingDuration
    this.isPaused = false

    this.create(props)
  }

  create(props) {
    const curve = new THREE.EllipseCurve(
      props.rotationCenter.x,  props.rotationCenter.y,
      props.radius, props.radius,
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    )
    const points = curve.getPoints(props.points || 10)
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineBasicMaterial({ 
      color: props.color || 0x555555,
      linewidth: props.lineWidth || 1,
    })
    let circle = new THREE.Line( geometry, material )
    circle.position.x = props.position.x || 0
    circle.position.y = props.position.y || 0
    circle.position.z = props.position.z || 0

    this.geometry = circle
  }

  animate() {
    if (this.isPaused && this.pausedDelay > 0) {
      this.pausedDelay -= this.clock.getDelta()*1000
    }
    else if (this.pausedDuration && this.pausedDelay <= 0) {
      this.pausedDelay = this.pausedDuration
      this.isPaused = false
    }
    else if (this.movingDuration && this.movingDelay <= 0) {
      this.movingDelay = this.movingDuration
      this.isPaused = true
    }
    else if (this.movingDuration) {
      this.movingDelay -= this.clock.getDelta()*1000
      this.geometry.rotation.z += this.zRotation
    }
    else {
      this.geometry.rotation.z += this.zRotation
    }
  }
}

class Scene extends React.Component {
  componentDidMount() {
    let scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000 )
    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.mount.appendChild(this.renderer.domElement)

    scene.background = new THREE.Color(0x111111);

    const numberOfGears = 3
    let gears = new Array(numberOfGears)

    gears[0] = new Gear({
      radius: 10,
      position: {x: -4, y: 0},
      rotationCenter: {x: 0, y: 0},
      points: 10,
      zRotation: 0.002,
    })
    gears[1] = new Gear({
      radius: 5,
      position: {x: -6, y: 3},
      rotationCenter: {x: 0, y: 0},
      points: 10,
      zRotation: -0.01,
      pausedDuration: 500,
      movingDuration: 500,
    })
    gears[2] = new Gear({
      radius: 0.5,
      position: {x: -4, y: 0, z: 0},
      rotationCenter: {x: 10, y: 0},
      points: 4,
      color: 0xe32110,
      lineWidth: 2,
      zRotation: -0.005,
    })
    //gears[3] = new Gear({
      //radius: 1.5,
      //position: {x: -7, y: 4},
      //rotationCenter: {x: 0, y: 0},
      //points: 6,
      //zRotation: 0.03,
      //pausedDuration: 250,
      //movingDuration: 250,
    //})

    gears.forEach(gear => scene.add(gear.geometry))
    this.camera.position.z = 15

    this.animate = function () {
      requestAnimationFrame(this.animate.bind(this))
      gears.forEach(gear => gear.animate())
      this.renderer.render(scene, this.camera)
    }
    //this.animate.bind(this)

    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }

  onWindowResize() {
    if (this.mount) {
      this.camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    }
  }

  render() {
    return (
      <div className={sceneStyles.webglContainer} ref={ref => (this.mount = ref)} />
    )
  }

}

export default Scene
