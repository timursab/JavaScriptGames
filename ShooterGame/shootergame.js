
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);


var pointdiv = document.getElementById("points");
var points = 0;
var points = 0;
var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.aspect = window.innerWidth/window.innerHeight
    
    camera.updateProjectionMatrix()
})
//PLAYER
var geometry = new THREE.BoxGeometry(1,1,1)
var cubematerial = new THREE.MeshLambertMaterial({color: 0xFFCC00})
var cube = new THREE.Mesh(geometry,cubematerial)
scene.add(cube);
cube.translateY(0.5);
var targetarray = []



var planeGeometry = new THREE.PlaneGeometry(10, 10);
var planematerial = new THREE.MeshLambertMaterial({color: 0x1854b5})
var plane = new THREE.Mesh(planeGeometry, planematerial);
scene.add(plane);
plane.rotation.set(-THREE.Math.degToRad(90), 0, 0);



var light = new THREE.PointLight(0xFFFFFF,1,500);
light.position.set(1,4,1);
scene.add(light);
var isAutomatic = false;

var autoInterval;
addEventListener('contextmenu', (event) => {
    event.preventDefault();
    isAutomatic = !isAutomatic;
    if(isAutomatic){
        autoInterval = setInterval(shootOnce,80);
    }
    else{
        clearInterval(autoInterval)
    }
    return false;
});

addEventListener('click', (event) => {
    shootOnce();
});

function shootOnce(){

    var bulletmesh = new THREE.SphereGeometry(0.1,16,16)
    var bulletmaterial = new THREE.MeshBasicMaterial( { color: 0x1 } );
    var bullet = new THREE.Mesh( bulletmesh, bulletmaterial );
    scene.add(bullet);

    bullet.position.set(cube.position.x,cube.position.y+0.1,cube.position.z)
    bullet.rotation.y = cube.rotation.y;
    bullet.translateZ(-0.4);
    var destroy = 100;
    //console.log(bullet.rotation.y)


    var shooting = function(){
        var raycaster = new THREE.Raycaster();
        var dir = new THREE.Vector3(0,0,1).applyQuaternion(bullet.quaternion);

        raycaster.set(bullet.position, dir);
        raycaster.far = 1;
        var intersects = raycaster.intersectObjects(targetarray);
        bullet.translateZ(-0.2);
        destroy --;
        if(intersects.length > 0){
            respawnEnemy();
            scene.remove(bullet);
            bullet.geometry.dispose();
            bullet.material.dispose();
            return;
        }
        if(destroy <= 0){
            scene.remove(bullet);
            return;
        }
        setTimeout(shooting,10);

    }
    shooting()
}

var targetgeometry = new THREE.BoxGeometry(1,1,1);
var targetmaterial = new THREE.MeshLambertMaterial({color: 0xFFCC00})
var target = new THREE.Mesh(targetgeometry,targetmaterial);
target.translateY(0.5);


function respawnEnemy(){
    points++;
    pointdiv.textContent = "Points: "+points;
    targetarray= [target];
    target.position.z = (Math.random() * (4.5 - -4.5) + -4.5);
    target.position.x = (Math.random() * (4.5 - -4.5) + -4.5);
    scene.add(target);

}
respawnEnemy();

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


var render = function() {
    requestAnimationFrame(render)
    renderer.render(scene,camera)
}
var mouseX;
var mouseY;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX - window.innerWidth/2;
    mouseY = -(event.clientY - window.innerHeight/2);
});




setInterval(Update,1000/100)
function Update(){
    cube.rotation.y = -Math.atan2(mouseX,mouseY)
    if(WPressed){
        cube.position.z -= 0.03;
    }
    if(SPressed){
        cube.position.z += 0.03;

    }
    
    if(APressed){
        cube.position.x -= 0.03;

    }
    if(DPressed){
        cube.position.x += 0.03;
        
        
    }
    camera.position.x = cube.position.x
    camera.position.z = cube.position.z+2
    camera.rotation.x = -THREE.Math.degToRad(70)

}
camera.position.y = 7


//camera.rotation.x = -THREE.Math.degToRad(45)
render();