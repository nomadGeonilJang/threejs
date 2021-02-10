import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

new OrbitControls( camera, renderer.domElement );
const mtlLoader = new MTLLoader();
mtlLoader.setPath("/assets/");
mtlLoader.load('r2-d2.mtl',(mt)=>{
  mt.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(mt);
  objLoader.setPath("/assets/");
  objLoader.load("r2-d2.obj",(obj)=>{
    scene.add(obj);
    obj.position.y -= 60;
  });
});

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( 
//   { color: 0xffff00, wireframe:true } 
// );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  renderer.render( scene, camera );
}
animate();