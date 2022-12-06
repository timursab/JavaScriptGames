var lever = document.getElementById('lever');
var depositbtn = document.getElementById('deposit');
var balancediv = document.getElementById('balance');
var currentbetdiv = document.getElementById('currentbet');
var rewardindicator =document.getElementById('rewardindicator');


var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var num3 = document.getElementById('num3');


var coinwin = new Audio('files/coinwin.wav')

var pingsf = new Audio('files/ping.mp3')
var losingsf = new Audio('files/losing.wav')
pingsf.volume = 0.3;
var wheelsf = new Audio('files/wheel2.mp3')
var balance = 1000;
wheelsf.volume = 0.05;
var currentBet= 0;

lever.style.cursor = 'pointer';

var slotrep = 20;

var working = false;

var slowdown = 50;

lever.onclick = function(){
    if(!working && currentBet > 0){

        rewardindicator.textContent='';
        num1.style.backgroundColor = "gray";
        num2.style.backgroundColor = "gray";
        num3.style.backgroundColor = "gray";
        pingsf.pause();
        pingsf.currentTime = 0;
        pingsf.play();
        wheelsf.play();
        wheelsf.playbackRate=1;
        lever.style.transform = 'rotate('+90+'deg)';
        working = true;
        slotrep = Math.floor(Math.random() * 10) + 30;
        slowdown = 50;
        StartSlot();
        setTimeout(() => {
            lever.style.transform = 'rotate('+30+'deg)';
        }, 1000);
    }
}
var prenum1 = 10;
var prenum2 = 10;
var prenum3 = 10;
function StartSlot(){
    randnum1 = Math.floor(Math.random() * 10);
    randnum2 = Math.floor(Math.random() * 10);
    randnum3 = Math.floor(Math.random() * 10);
    if(prenum1 == randnum1 ||prenum2==randnum2 ||prenum3==randnum3){
        StartSlot()
        return;
    }
    wheelsf.play();
    prenum1 = randnum1;
    prenum2 = randnum2;
    prenum3 = randnum3;
    num1.textContent = randnum1.toString();
    num2.textContent = randnum2.toString();
    num3.textContent = randnum3.toString();
    slotrep -=1;
    slowdown += 5;
    if(slotrep > 0 ){
        setTimeout(StartSlot,slowdown);
    }
    else{
        Rewarding();
        setTimeout(() => {
        working=false;
        }, 1000);
    }

}

function Rewarding(){

    n1 = parseInt(num1.textContent);
    n2 = parseInt(num2.textContent);
    n3 = parseInt(num3.textContent);
    var won=false;
    //#region 2 same nums
    if(n1 == n2){
        balance = balance+currentBet*2 ;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        num1.style.backgroundColor = "red";
        num2.style.backgroundColor = "red";
        rewardindicator.textContent='You Won 3x +' + (3*currentBet).toString();
        won = true;
        coinwin.play()
    }
    if(n1 == n3){
        balance = balance+currentBet*2 ;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        num1.style.backgroundColor = "red";
        num3.style.backgroundColor = "red";
        rewardindicator.textContent='You Won 3x +' + (3*currentBet).toString();
        won = true;
        coinwin.play()
    }
    if(n2 == n3){
        balance = balance+currentBet*2 ;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        num2.style.backgroundColor = "red";
        num3.style.backgroundColor = "red";
        rewardindicator.textContent='You Won 3x +' + (3*currentBet).toString();
        won = true;
        coinwin.play()
    }
    //#endregion
    
    if(n1-1 == n2 || n1 == n2-1){
        balance = balance+currentBet*2 ;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        num1.style.backgroundColor = "red";
        num2.style.backgroundColor = "red";
        rewardindicator.textContent='You Won 2x +' + (2*currentBet).toString();
        won = true;
        coinwin.play()
    }
    if(n1-1 == n3 || n1 == n3-1){
        balance = balance+currentBet*2 ;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        num1.style.backgroundColor = "red";
        num3.style.backgroundColor = "red";
        rewardindicator.textContent='You Won 2x +' + (2*currentBet).toString();
        won = true;
        coinwin.play()
    }
    if(n2-1 == n3 || n2 == n3-1){
        balance = balance+currentBet*2 ;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        num2.style.backgroundColor = "red";
        num3.style.backgroundColor = "red";
        rewardindicator.textContent='You Won 2x +' + (2*currentBet).toString();
        won = true;
        coinwin.play()
    }

    //Jackpot
    if(num1.style.backgroundColor == "red" && num2.style.backgroundColor == "red" && num3.style.backgroundColor == "red"){
        balance = balance+currentBet*10 ;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        rewardindicator.textContent=rewardindicator.textContent+"Jackpot 10x"+(10*currentBet).toString();
    }

    if(!won){
        losingsf.play();
    }
    
    currentbetdiv.textContent = '0';
    currentBet = 0;
}


depositbtn.onclick = function(){
    if(!working){
        balance -=10;
        balancediv.textContent = 'Your Balance = ' + balance.toString();
        currentBet += 10;
        currentbetdiv.textContent = currentBet;
    }
}


var levercs = window.getComputedStyle(lever,null);


var levercs = window.getComputedStyle(lever,null);



setInterval(Update, 15);

function Update(){
    
    
    
    
    
    /*Get lever rotation
    var leverpv =levercs.getPropertyValue("transform")
    levercs.getprop
    var values = leverpv.split('(')[1],
    values = values.split(')')[0],
    values = values.split(',');
    var a = values[0]; // 0.866025
    var b = values[1]; // 0.5
    var c = values[2]; // -0.5
    var d = values[3]; // 0.866025
    var angle = Math.round(Math.asin(b) * (180/Math.PI));
    console.log();

    if(angle == 90){
        console.log("90")
    }
    */
}