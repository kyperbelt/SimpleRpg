/*
<svg class="background">
  
  <!--  -->
  <svg id="startscreen">
    <use id="startbutton" href="#push-button" y="50" height="60"
      fill="fb-red" font-family="System-Regular" font-size="40">
      <set href="#text" attributeName="text-buffer" to="Start" />
      <set href="#text" attributeName="fill" to="fb-peach" />
      <set href="#text" attributeName="y" to="12" />
    </use>
   </svg>
  
  
  <!--  -->
  <svg id="messagescreen" display="none">
    <text id="message" x="50%" y="50%+15">this is messagescreen</text>
   <use id="continuebutton" href="#push-button" y="50" height="60"
      fill="fb-red" font-family="System-Regular" font-size="40">
      <set href="#text" attributeName="text-buffer" to="Continue" />
      <set href="#text" attributeName="fill" to="fb-peach" />
      <set href="#text" attributeName="y" to="12" />
    </use>
   </svg>
  
  
  <!--  -->
    <svg id="walkscreen" display="none">
    <text id="message" x="50%" y="50%+15">this is the walkscreen</text>
   
   </svg>
  
  
  <!--  -->
    <svg id="encounterscreen" display="none">
    <text id="message" x="50%" y="50%+15">thisisencounterscreen</text>
   
   </svg>
  
  <!--  -->
    <svg id="statscreen" display="none">
   
   </svg>
  
  
  <!--  -->
    <svg id="fightscreen" display="none">
    <text id="message" x="50%" y="50%+15">thisisfightscreen</text>
   
   </svg>
</svg>

*/
/*
 * Entry point for the watch app
 */
import document from "document";

import {today} from "user-activity";
import { HeartRateSensor } from "heart-rate";

let hrm = new HeartRateSensor();
hrm.onreading = function() {
  console.log("Current heart rate: " + hrm.heartRate);
}
hrm.start();

var steps = today.local.steps || 0;
var num = 0;

let startscreen = document.getElementById("startscreen");
let messagescreen = document.getElementById("messagescreen");
let walkscreen = document.getElementById("walkscreen");
let encounterscreen = document.getElementById("encounterscreen");
let statscreen = document.getElementById("statscreen");
let fightscreen = document.getElementById("fightscreen");

let messagetext = document.getElementById("message");


let startbutton = document.getElementById("startbutton");
startbutton.onclick = function() {
  generateFightIndex();
  setScreen("messagescreen");
  
}

let continuebutton = document.getElementById("continuebutton");
continuebutton.onclick = function() {
  setScreen("walkscreen");
  
}

const checkSteps=function(){
  var cs = today.local.steps || 0;
  console.log("checking steps : amount="+num+" current="+cs+" diff="+(cs - steps));
  if(cs - steps >=num){
    setScreen("encounterscreen");
  }else{
    setTimeout(checkSteps, 100)
  }
}

const setScreen = function(screen){
  console.log("switching to screen:"+screen);
  
  if(screen === "startscreen"){
    startscreen.style.display = "inline";
    
  startscreen.style.display = "none";
  messagescreen.style.display = "none";
  walkscreen.style.display = "none";
  encounterscreen.style.display = "none";
  statscreen.style.display = "none";
  fightscreen.style.display = "none";
  }
  if(screen === "messagescreen"){
    messagescreen.style.display = "inline";
    startscreen.style.display = "none";
  walkscreen.style.display = "none";
  encounterscreen.style.display = "none";
  statscreen.style.display = "none";
  fightscreen.style.display = "none";
    messagetext.text = messages[fightIndex];
  }
  if(screen === "walkscreen"){
    walkscreen.style.display = "inline";
    startscreen.style.display = "none";
  messagescreen.style.display = "none";
  encounterscreen.style.display = "none";
  statscreen.style.display = "none";
  fightscreen.style.display = "none";
    if(!debug){
    num = parseInt(10 + Math.random() * 10);
    }else{
      num = 0;
    }
    checkSteps();
  }
  if(screen === "encounterscreen"){
    encounterscreen.style.display = "inline";
    startscreen.style.display = "none";
  messagescreen.style.display = "none";
  walkscreen.style.display = "none";
  statscreen.style.display = "none";
  fightscreen.style.display = "none";
  }
  if(screen === "statscreen"){
    statscreen.style.display = "inline";
    startscreen.style.display = "none";
  messagescreen.style.display = "none";
  walkscreen.style.display = "none";
  encounterscreen.style.display = "none";
  fightscreen.style.display = "none";
  }
  if(screen === "fightscreen"){
    fightscreen.style.display = "inline";
    startscreen.style.display = "none";
  messagescreen.style.display = "none";
  walkscreen.style.display = "none";
  encounterscreen.style.display = "none";
  statscreen.style.display = "none";
  }
}

//-----------new---
document.onkeypress = function(evt) {
  if (evt.key === "back") {
    if (statscreen.style.display === "inline"){
      setScreen("encounterscreen");
    }
  }
}

let statbutton = document.getElementById("statbutton");
statbutton.onclick = function() {
  setScreen("statscreen");
  
}

let fightbutton = document.getElemenById("fightbutton");
fightbutton.onclick = function(){
  setScreen("fightscreen");
}

const debug = true;

var enemies = ["Dark Image", "Saedim", "Ruined Wanderer"];
var messages = ["You hear a rasping sound in the distance...","A man with gold clothes bearing black teeth.","Filthy bearded Creature"];

var fightIndex = 0;

const generateFightIndex=function(){
  fightIndex = randomIn(0,enemies.length+1);
}


//-----------------------------

class Stats{
    constructor(){
        this.attack = 1.0;
        this.currentHealth = 10;
        this.maxHealth = 10;
        this.defense = 1.0;
    }

    set(health,attack,defense){
        this.setMaxHealth(health);
        this.setCurrentHealth(health);
        this.setAttack(attack);
        this.setDefense(defense);
    }

    setMaxHealth(health){
        this.maxHealth = health;
    }

    getMaxHealth(){
        return this.maxHealth;
    }

    setCurrentHealth(health){
        this.currentHealth = Clamp(health,0,this.maxHealth);
    }

    changeHealth(amount){
        this.setCurrentHealth(this.getCurrentHeath() + amount);
    }

    getCurrentHeath(){
        return this.currentHealth;
    }

    setAttack(attack){
        this.attack = attack;
    }

    getAttack(){
        return this.attack;
    }

    setDefense(defense){
        this.defense = defense;
    }
    
    getDefense(){
        return this.defense;
    }

    isDead(){
        return this.getCurrentHeath() <= 0;
    }
}

class Enemy{

    constructor(){
        this.name = "no name";
        this.stats = new Stats();
    }

    setName(name){
        this.name = name;
    }

    getStats(){
        return this.stats;
    }

    getName(){
        return this.name;
    }

    toString(){
        return "Enemy["+this.name+"] Stats{mh:"+this.stats.getMaxHealth()+",ch:"+this.stats.getCurrentHeath()+",a:"+this.stats.getAttack()+",d:"+this.stats.getDefense()+"}";
    }
}

class Player{
    constructor(){
        this.name = "noname";
        this.stats = new Stats();
        this.gold = 0;
    }

    getGold(){
        return this.gold;
    }

    setGold(gold){
        this.gold = Math.max(0,gold);
    }


    getStats(){
        return this.stats;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    toString(){
        return "Player["+this.name+"] Gold="+this.gold+" Stats{mh:"+this.stats.getMaxHealth()+",ch:"+this.stats.getCurrentHeath()+",a:"+this.stats.getAttack()+",d:"+this.stats.getDefense()+"}";
    }
}

class Core{

    constructor(){
        this.players = 0;
    }

    createEnemy(name,attack,defense,health){
        var e = new Enemy();
        e.setName(name);
        e.getStats().set(health,attack,defense);
        return e;
    }

    createPlayer(name,attack,defense,health,gold){
        if(this.player >= 1)
        return;
        var p = new Player();
        p.setGold(gold);
        p.getStats().set(health,attack,defense);
        p.setName(name);
        this.player++;
        return p;
    }

}

//combat

const calculateAttack = function(attackerStats,defenderStats, useDefense){
    var defense = 0;
    
    if(useDefense){
        defense - defenderStats.getDefense();
    }
    var a = attackerStats.getAttack();
    var d = defenderStats.getDefense();
    var n = 10;

    var damageDone = parseInt((a * a / d) / n + 2);
    defenderStats.changeHealth(-damageDone);
}

//utils

const Clamp = function(value,min,max){
    return Math.max(min,Math.min(value,max));
}

const checkStats = function(stats){
    console.log("currentHealth="+stats.currentHealth + " maxHealth="+stats.maxHealth+" attack="+stats.attack+" defense"+stats.defense);
}

const print = function(message){
    console.log(message);
}

const randomInt = function(min,max){
    return parseInt(min+Math.random()*(max-min));
}

//tests

const runTests = function(){
    var core = new Core();
    var player = core.createPlayer("player",randomInt(20,30),randomInt(10,30),randomInt(40,60),0);

    var enemynames = ["blockchain","smartcar","testname","testenemy","randomlychosen"];
    print(player.toString());

    print("creating enemies:");
    var i;
    var enemies = [];
    for(i = 0;i < 100;i++){
        var ename = enemynames[parseInt(Math.random()*5)];
        var e = core.createEnemy(ename,randomInt(1,20),randomInt(3,16),randomInt(8,25));
        enemies.push(e);
        print(e.toString());
    }

    print(player.toString());
    print("commencing gaunlet!");

    var count = 0;

    for(i = 0; i < enemies.length;i++){
        var enemy = enemies[i];
        while(!player.getStats().isDead() && !enemy.getStats().isDead()){
            print("Attacking enemy:"+enemy.name+"]");
            calculateAttack(player.stats,enemy.stats,false);
            calculateAttack(enemy.stats,player.stats,false);

            print(player.toString());
            print(enemy.toString());
        }

        if(player.getStats().isDead()){
            print("player died at count:"+count);
            break;
        }
        count++;
    }

}

runTests();


var core = new Core();
var p = core.createPlayer("name",11,11,11,11);

let demotext = document.getElementById("demotext");
demotext.text = ""+p.toString();
