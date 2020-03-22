import React from "react"
import * as THREE from "three"
import sceneStyles from "./styles/scene.module.sass"

class Gear {
  constructor(props) {
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
      this.pausedDelay -= 0.1
      console.log("1")
    }
    else if (this.pausedDuration && this.pausedDelay <= 0) {
      this.pausedDelay = this.pausedDuration
      this.isPaused = false
      console.log("2")
    }
    else if (this.movingDuration && this.movingDelay <= 0) {
      this.movingDelay = this.movingDuration
      this.isPaused = true
      console.log("3")
    }
    else if (this.movingDuration) {
      this.movingDelay -= 0.1
      this.geometry.rotation.z += this.zRotation
      console.log("4")
    }
    else {
      this.geometry.rotation.z += this.zRotation
    }
  }
}

class Scene extends React.Component {
  componentDidMount() {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera( 75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000 )
    let renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    renderer.setPixelRatio( window.devicePixelRatio );
    this.mount.appendChild( renderer.domElement )

    scene.background = new THREE.Color(0x111111);
    let gears = new Array(3)

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
      pausedDuration: 2,
      movingDuration: 2,
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

    gears.forEach(gear => scene.add(gear.geometry))
    camera.position.z = 15

    let animate = function () {
      requestAnimationFrame( animate )
      gears.forEach(gear => gear.animate())
      renderer.render(scene, camera)
    }
    animate()
  }

  render() {
    return (
      <div className={sceneStyles.webglContainer} ref={ref => (this.mount = ref)} />
    )
  }

}

export default Scene
