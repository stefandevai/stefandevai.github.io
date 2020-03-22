import React from "react"
import * as THREE from "three"
import sceneStyles from "./styles/scene.module.sass"

class Scene extends React.Component {

  createDashedCircle(props) {
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
      scale: 1,
      dashSize: 3,
      gapSize: 1,
    })
    let circle = new THREE.Line( geometry, material )
    circle.position.x = props.position.x || 0
    circle.position.y = props.position.y || 0
    circle.position.z = props.position.z || 0

    return circle
  }

  componentDidMount() {
    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera( 75, this.mount.offsetWidth/this.mount.offsetHeight, 0.1, 1000 )
    let renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
    renderer.setPixelRatio( window.devicePixelRatio );
    this.mount.appendChild( renderer.domElement )

    scene.background = new THREE.Color(0x111111);

    let circle = this.createDashedCircle({
      radius: 10,
      position: {x: -4, y: 0},
      rotationCenter: {x: 0, y: 0},
      points: 10,
    })
    let circle2 = this.createDashedCircle({
      radius: 5,
      position: {x: -6, y: 3},
      rotationCenter: {x: 0, y: 0},
      points: 10,
    })
    let circle3 = this.createDashedCircle({
      radius: 0.5,
      position: {x: -4, y: 0, z: 0},
      rotationCenter: {x: 10, y: 0},
      points: 4,
      color: 0xe32110,
      lineWidth: 2,
    })
    scene.add( circle )
    scene.add( circle2 )
    scene.add( circle3 )
    camera.position.z = 15
    //camera.position.x = -3
    //camera.position.y = -12
    //camera.rotation.x = 0.5

    let animate = function () {
      requestAnimationFrame( animate )
      circle.rotation.z += 0.002
      circle2.rotation.z -= 0.01
      circle3.rotation.z -= 0.005
      renderer.render( scene, camera )
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
