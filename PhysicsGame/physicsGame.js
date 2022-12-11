//#region Three.js Boilerplate

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    
    camera.updateProjectionMatrix()
})
var render = function() {
    requestAnimationFrame(render)
    renderer.render(scene,camera)
}
addEventListener('contextmenu', (event) => {
    event.preventDefault();
    return false;
});
//#endregion

//#region KeyPresses
WPressed = false;
SPressed = false;
APressed = false;
DPressed = false;

document.addEventListener("keydown", (event) => {
    if (event.key === "w") {
        WPressed = true;
    }
    if (event.key === "s") {
        SPressed = true;
    }
    if (event.key === "a") {
        APressed = true;
    }
    if (event.key === "d") {
        DPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w") {
        WPressed = false;
    }
    if (event.key === "s") {
        SPressed = false;
    }
    
    if (event.key === "a") {
        APressed = false;
    }
    if (event.key === "d") {
        DPressed = false;
    }
});
//#endregion

//Cube
var geometry = new THREE.BoxGeometry(1,1,1)
var cubematerial = new THREE.MeshLambertMaterial({color: 0xFFCC00})
var cube = new THREE.Mesh(geometry,cubematerial)
scene.add(cube);

//Ground Plane
var planeGeometry = new THREE.PlaneGeometry(10, 100);
var planematerial = new THREE.MeshLambertMaterial({color: 0x1854b5})
var plane = new THREE.Mesh(planeGeometry, planematerial);
scene.add(plane);
plane.rotation.set(-THREE.Math.degToRad(90), 0, 0);

//AmbientLight
var ambientLight = new THREE.AmbientLight(0xFFFFFF,0.2);
scene.add(ambientLight);

//PointLight
var PointLight = new THREE.PointLight(0xFFFFFF,1,500)
PointLight.position.set(2,2,2);
scene.add(PointLight)

//Parent Cube
cube.add(camera)

setInterval(Update,1000/144)
function Update(){
    /*
    cube.rotation.y += 0.003;
    cube.rotation.x += 0.003;
    */
    if(WPressed){
        cube.position.y += 0.03;
    }
    if(SPressed){
        cube.position.y -= 0.03;


    }
    if(APressed){
        cube.position.x -= 0.03;


    }
    if(DPressed){
        cube.position.x += 0.03;


    }
    cube.translateZ(-0.02)
    camera.lookAt(cube.position)
}

camera.position.z = 5;
camera.position.y = 1;
render()