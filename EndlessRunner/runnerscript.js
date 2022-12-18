//#region Three.js boilerplate

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(80,window.innerWidth/window.innerHeight,0.1,1000);
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();
})
var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

//#endregion

//#region Create new objects
//Create a point light
var pointLight = new THREE.PointLight(0xFFFFFF,1,500)
pointLight.position.set(2,2,5);
scene.add(pointLight)

//Create an ambient light
var ambientLight = new THREE.AmbientLight(0xFFFFFF,0.6);
scene.add(ambientLight);

//#endregion

//#region Inputs
class InitializeKeyboardControls{
    constructor(){
        this.WPressed = false;
        this.SPressed = false;
        this.APressed = false;
        this.DPressed = false;
        this.SpacePressed = false;
        document.addEventListener("keydown", (event) => {

            if (event.key === "w") {
                this.WPressed = true;
            }
            if (event.key === "s") {
                this.SPressed = true;
            }
            if (event.key === "a") {
                this.APressed = true;
            }
            if (event.key === "d") {
                this.DPressed = true;
            }
            if (event.code === "Space"){
                this.SpacePressed = true;
            }
        });
        
        document.addEventListener("keyup", (event) => {
            if (event.key === "w") {
                this.WPressed = false;
            }
            if (event.key === "s") {
                this.SPressed = false;
            }
            
            if (event.key === "a") {
                this.APressed = false;
            }
            if (event.key === "d") {
                this.DPressed = false;
            }
            if (event.code === "Space"){
                this.SpacePressed = false;
            }
        });
        addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }
}
let keyboard = new InitializeKeyboardControls;

class InitializeMouseControls{
    constructor(){
        document.addEventListener('mousemove',(event)=>{
            this.mouseX = 2*(event.clientX-window.innerWidth/2)/window.innerWidth;
            this.mouseY = -2*(event.clientY-window.innerHeight/2)/window.innerHeight;
        })
        document.addEventListener('mousedown',(event)=>{
            if(event.target.localName == "canvas"){
                this.mouseDown = true;
            }
        })
        document.addEventListener('mouseup',(event)=>{
            this.mouseDown = false;
        })
    }
}
let mouseControls = new InitializeMouseControls;
//#endregion

//#region Clusters

function randpointincircle(){
    let radius = 3;
    let x_center = 0;
    let y_center = 0;

    let ang = Math.random() * 2 * Math.PI,
    hyp = Math.sqrt(Math.random()) * radius,
    adj = Math.cos(ang) * hyp,
    opp = Math.sin(ang) * hyp
    return [x_center + adj, y_center + opp]
}
//Creates a random positioned cube as a child of given array
function CreateCube(cluster){
    //Set material color as random hex
    let color ='#' + Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')
    let geometry = new THREE.BoxGeometry(Math.random(),Math.random(),Math.random());
    let material = new THREE.MeshLambertMaterial({color:color});
    let cube = new THREE.Mesh(geometry,material);
    let randxy = randpointincircle();
    cube.position.x = randxy[0];
    cube.position.y = randxy[1];
    cluster.add(cube);
    return cube;
}

//Randomize the position of cubes inside the group
function randomizeClusters(clusterindex){
    for(let i = 0; i < 100;i++){
        let randxy = randpointincircle();
        clusters[clusterindex].children[i].position.x=randxy[0];
        clusters[clusterindex].children[i].position.y=randxy[1];
    }
}

let cluster1 = new THREE.Group();
let cluster2 = new THREE.Group();
let cluster3 = new THREE.Group();
let cluster4 = new THREE.Group();

//Nested array containing the groups that contain cubes
let clusters = [cluster1,cluster2,cluster3,cluster4];

let zPos = 0;

//Spawn 100 random positioned cubes for 4 different groups
for (let x = 0; x < clusters.length; x++) {
    for (let i = 0; i < 100; i++) {
        CreateCube(clusters[x]);
    }
    clusters[x].position.z = zPos;
    zPos -=5;
}
scene.add(cluster1)
scene.add(cluster2)
scene.add(cluster3)
scene.add(cluster4)

//#endregion

//#region Speed Effect

//#endregion

//#region Game logic

var hscorediv = document.getElementById("highscore");
var cscorediv = document.getElementById("currentscore");
var panel = document.getElementById("panel");

let currentscore = 0;
let highscore = 0;
let inGame = false;
var velocity = 0.5;
let boost = 1;
function Update(){
    requestAnimationFrame(Update);
    //Position the camera according to mouse position
    camera.position.y = mouseControls.mouseY*3;
    camera.position.x = mouseControls.mouseX*3;

    //If the game has started
    if(inGame){
        //Increase the speed of obstacles
        velocity += 0.01/60
        //Move the chunks of obstacles towards player
        cluster1.position.z += 0.03*velocity*boost;
        if(cluster1.position.z > 5.5){
            currentscore += 1;
            cluster1.position.z = -15;
            randomizeClusters(0);
        }
        cluster2.position.z += 0.03*velocity*boost;
        if(cluster2.position.z > 5.5){
            currentscore += 1;
            cluster2.position.z = -15;
            randomizeClusters(1);
        }
        cluster3.position.z += 0.03*velocity*boost;
        if(cluster3.position.z > 5.5){
            currentscore += 1;
            cluster3.position.z = -15;
            randomizeClusters(2);
        }
        cluster4.position.z += 0.03*velocity*boost;
        if(cluster4.position.z > 5.5){
            currentscore += 1;
            cluster4.position.z = -15;
            randomizeClusters(3);
        }
        if(currentscore > highscore){
            highscore = currentscore;
            hscorediv.textContent = highscore;
        }
        cscorediv.textContent = currentscore;
        
        //Boost
        if(inGame&&(keyboard.SpacePressed || mouseControls.mouseDown)){
            if(boost<2){
                boost += 0.03;
            }
        }
        else{
            if(boost > 1){
                boost -= 0.03;
            }
        }

        //Create raycasting for collision detection
        var raycaster = new THREE.Raycaster();
        var dir = new THREE.Vector3(0,0,-1);
        raycaster.set(camera.position, dir);
        raycaster.far = 0.2;
        //Set raycast so that it detects all obstacles
        var intersects = raycaster.intersectObjects([...cluster1.children,...cluster2.children,...cluster3.children,...cluster4.children]);
        //If raycast hit
        if(intersects.length > 0){
            deathSequence();
        }
        //If the camera is outside the limits
        if(Math.hypot(camera.position.y,camera.position.x)>3 &&inGame){
            deathSequence();
        }
    }

    //Start the game if conditions are met
    if((keyboard.SpacePressed || mouseControls.mouseDown) && !inGame ){
        inGame = true;
    }

}
Update()

function deathSequence(){
    inGame = false;
    velocity = 0;
    panel.style.height = "100%"
    panel.style.top = "auto"

    //Wait 1 second before restarting game
    setTimeout(() => {
        panel.style.top = "0%"
        panel.style.height = "0%"
        zPos = 0;
        //Set original positions of clusters
        for(let i = 0; i<clusters.length;i++){
            clusters[i].position.z = zPos;
            zPos -= 5;
        }
        
        velocity = 0.5;
        currentscore = 0;
        cscorediv.textContent = currentscore;
    }, 1000);
}

camera.position.z = 5;

//#endregion

render();