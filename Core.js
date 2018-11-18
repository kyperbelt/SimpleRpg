

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
        this.maxHealth = maxHealth;
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
}

class Enemy{
    name = "no name";
    stats = new Stats();

    getStats(){
        return this.stats;
    }

    getName(){
        return this.name;
    }
}

class Player{
    name = "noname";
    stats = new Stats();
    gold = 0;

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
}

class Core{
    players = 0;


    createPlayer(name,attack,defense,health,gold){
        if(player >= 1)
        return;
        p = new Player();
        p.setGold(gold);
        p.getStats().getStats().set(health,attack,defense);
        p.setName(name);
        player++;
        return p;
    }

}

const calculateAttack = function(attackerStats,defenderStats, useDefense){
    var defense = 0;
    
    if(useDefense){
        defense - defenderStats.getDefense();
    }
    var damageDone = attackerStats.getAttack() - defense;
    defenderStats.changeHealth(attackerStats.getAttack() - defense);
}

const Clamp = function(value,min,max){
    return Math.max(min,Math.min(value,max));
}

const checkStats = function(stats){
    console.log("currentHealth="+stats.currentHealth + " maxHealth="+stats.maxHealth+" attack="+stats.attack+" defense"+stats.defense);
}


const runTests = function(){





}


stats = new Stats();
checkStats(stats);



