import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fov = 60; //fielder view
const aspect = 1920 / 1080;
const near = 1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(75,20,0);

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(20,100,10);
light.target.position.set(0,0,0);
light.castShadow = true;
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneGeometry(100,100,10,10);
const material = new THREE.MeshStandardMaterial({color:0xffffff});

const plane = new THREE.Mesh(geometry, material);
plane.castShadow = true;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshStandardMaterial({
    color:0xffffff
  })
);

box.position.set(0,5,0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

const animate = function(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
};
animate();