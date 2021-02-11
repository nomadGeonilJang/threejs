import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from "three/examples/jsm/libs/stats.module";
import {GUI} from "three/examples/jsm/libs/dat.gui.module";

const scene = new THREE.Scene(); // 만들 화면 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // scene에서 바라 볼 위치(눈) near clipping plane  https://www.google.com/search?q=near+clipping+plane&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi-wZmNzOHuAhXVAYgKHdS2DtUQ_AUoAXoECBoQAw&biw=1031&bih=549#imgrc=bfu2GdxhRNNCUM

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//create the shape
const geometry = new THREE.BoxGeometry(1,1,1);
//create a material color image texture
const material = new THREE.MeshBasicMaterial({color:0xffffff, wireframe:false}); //wireframe boolean
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

// game logic
const update = () =>{
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
};
const render = () => { renderer.render(scene, camera);};

const GameLoop = () => {
  requestAnimationFrame( GameLoop );
  update();
  render();
};

GameLoop();
