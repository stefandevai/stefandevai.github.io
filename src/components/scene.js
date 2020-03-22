import React from "react"
import * as THREE from "three"
import sceneStyles from "./styles/scene.module.sass"

class Scene extends React.Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( this.mount.offsetWidth, this.mount.offsetHeight );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.CircleGeometry( 1, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var circle = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }

  render() {
    return (
      <div className={sceneStyles.webglContainer} ref={ref => (this.mount = ref)} />
    )
  }

}

export default Scene
