var container;
var camera, scene;
var canvasRenderer, webglRenderer;
var mesh, zmesh, geometry;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var meshes = [];

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  scene = new THREE.Scene();

  // Setting the lights within the room
  var ambient = new THREE.AmbientLight(0x666666);
  scene.add(ambient);
  var directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 70, 100).normalize();
  scene.add(directionalLight);

  // Using webGL to Render
//  webglRenderer = new THREE.WebGLRenderer();
  //webglRenderer.setSize(window.innerWidth, window.innerHeight);
  //webglRenderer.domElement.style.position = "relative";

//  container.appendChild(webglRenderer.domElement);

  //window.addEventListener('resize', onWindowResize, false);

  webglRenderer = new THREE.WebGLRenderer();
  //creating variable to enable the WebGL renderer
  webglRenderer.setSize(window.innerWidth, window.innerHeight);
  webglRenderer.domElement.style.position = "relative";
  container.appendChild(webglRenderer.domElement);
  //setting the render to the size of the screen

  var loader = new THREE.JSONLoader(),
  //Creating a variable with use of the THREE library
  callbackKey = function(geometry) {
  //creating function with a global variable
    createScene(geometry,  0, 0, 0, 15, "hello.jpg")};
    //Creating scene with variable name, x,y,z and file name
  loader.load("outfile.js", callbackKey);
  //Loading the file from the directory

  window.addEventListener('resize', onWindowResize, false);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 100000);
  camera.position.x = 1000;
  camera.position.y = 1500;
  camera.position.z = 500;
  document.addEventListener("keydown", Keyboard, false);
  //Waiting for keyboard press
}
function Keyboard(){  //Takes keyboard input and moves camera position accordingly
  var speed = 10 * ( Math.PI / 180); //Speed that camera will move at

  if(event.keyCode == 38){ //Up Arrow
    //camera.lookAt(scene.position.x += speed);
    camera.rotation.x += speed; //position change
  }
  else if(event.keyCode == 40){ //Down Arrow
    //camera.lookAt(scene.position.x -= speed);
    camera.rotation.x -= speed; //position change
  }
  else if(event.keyCode == 37){ //Left Arrow
    camera.rotation.y += speed; //position change
  }
  else if(event.keyCode == 39){ //Right Arrow
    camera.rotation.y -= speed; //position change
  }
}

function createScene(geometry, x, y, z, scale, tmap) {
  zmesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({map: THREE.TextureLoader(tmap)}));
  zmesh.position.set(x, y, z);
  zmesh.scale.set(scale/2, scale/2, scale/2);
  //meshes.push(zmesh);
  scene.add(zmesh);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  webglRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  //for(var i = 0; i < meshes.length; i++){
  //  meshes[i].rotation.y += .01;
  //}
  requestAnimationFrame(animate);
  //controls.update();
  render();
}

function render() {
  //camera.lookAt(scene.position);
  webglRenderer.render(scene, camera);
}
