import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from "three/examples/jsm/libs/stats.module";
import {GUI} from "three/examples/jsm/libs/dat.gui.module";

let renderer;
let scene;
let camera;
let stats; 


const init = () =>{
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0,200,335);
  scene = new THREE.Scene();
  const ambient = new THREE.AmbientLight(0x00ff00, 0.1);
  scene.add(ambient);

  const directionalLight = new THREE.DirectionalLight(0xffffff,0.1);
  scene.add(directionalLight);

  const geoFloor = new THREE.BoxBufferGeometry(2000, 0.1, 2000);
  const matStdFloor = new THREE.MeshStandardMaterial({
    color:0x808080,
    roughness:0,
    metalness:0
  });

  const mshStdFloor = new THREE.Mesh(geoFloor,matStdFloor);
  scene.add(mshStdFloor);

  const matStdObjects = new THREE.MeshStandardMaterial({
    color:0xffffff,
    roughness:0,
    metalness:0,
  });

  const geoBox = new THREE.BoxBufferGeometry(Math.PI, Math.sqrt(2), Math.E);
  const mshStdBox = new THREE.Mesh(geoBox, matStdObjects);
  mshStdBox.position.set(0, 5, 0);
  mshStdBox.rotation.set(0, Math.PI / 2.0, 0);
  mshStdBox.castShadow = true;
  mshStdBox.receiveShadow = true;
  scene.add(mshStdBox);

  const geoSphere = new THREE.SphereBufferGeometry(1.5, 32, 32);
  const mshStdSphere = new THREE.Mesh(geoSphere, matStdObjects);
  mshStdSphere.position.set(-5, 5, 0);
  mshStdSphere.castShadow = true;
  mshStdSphere.receiveShadow = true;
  scene.add(mshStdSphere);

  const geoKnot = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 100, 16);
  const mshStdKnot = new THREE.Mesh(geoKnot, matStdObjects);
  mshStdKnot.position.set(5, 5, 0);
  mshStdKnot.castShadow = true;
  mshStdKnot.receiveShadow = true;
  scene.add(mshStdKnot);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(mshStdBox.position);
  controls.update();

  stats = new Stats();
  document.body.appendChild(stats.dom);

  const gui = new GUI({width:300});
  gui.open();

  let param = {
    motion:true,
    light:true
  };

  gui.add(param,'motion');
  gui.add(param,'light');

  const lightFolder = gui.addFolder('light');
  lightFolder
    .add(param,'light')
    .onChange((val)=>{
      ambient.intensity = val;
    });

};



const animate = function(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
  stats.update();
};

init();
animate();
