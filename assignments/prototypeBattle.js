/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(attrs) {
    (this.createdAt = attrs.createdAt),
        (this.name = attrs.name),
        (this.dimensions = attrs.dimensions);
}

GameObject.prototype.destroy = function() {
    return `${this.name} was removed from the game`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(attrs) {
    GameObject.call(this, attrs),
        (this.healthPoints = attrs.healthPoints),
        (this.baseAttack = 10),
        (this.baseHealing = 2);
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
    return `${this.name} took damage.`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(attrs) {
    CharacterStats.call(this, attrs),
        (this.team = attrs.team),
        (this.weapons = attrs.weapons),
        (this.language = attrs.language),
        (this.multiplier = attrs.multiplier);
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
    return `${this.name} offers a greeting in ${this.language}`;
};

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

function Villain(attrs) {
    Humanoid.call(this, attrs);
}

function Hero(attrs) {
    Humanoid.call(this, attrs);
}

Villain.prototype = Object.create(Humanoid.prototype);
Hero.prototype = Object.create(Humanoid.prototype);

Humanoid.prototype.attack = function(enemy) {
    let damage = this.baseAttack * this.multiplier;
    enemy.healthPoints -= damage;
    console.log(
        `${this.name} from ${this.team} attacks ${enemy.name} with a ${
            this.weapons[Math.floor(Math.random() * this.weapons.length)]
        } for ${damage} points. ${enemy.name} now has ${
            enemy.healthPoints
        } points of health.`
    );
    if (enemy.healthPoints <= 0) {
        console.log(enemy.destroy());
    }
};

Humanoid.prototype.heal = function() {
    let healing = this.baseHealing * this.multiplier;
    this.healthPoints += healing;
    console.log(
        `${this.name} healed for ${healing} points. ${this.name} now has ${this.healthPoints}.`
    );
};

const myHero = new Hero({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 2,
        height: 2,
    },
    healthPoints: 150,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: ['Giant Sword', 'Shield'],
    language: 'Common Tongue',
    multiplier: 1.5,
});

const myVillain = new Villain({
    createdAt: new Date(),
    dimensions: {
        length: 1,
        width: 2,
        height: 4,
    },
    healthPoints: 100,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: ['Bow', 'Dagger'],
    language: 'Elvish',
    multiplier: 2,
});

function flipCoin() {
    return (rand = Math.floor(Math.random() * 2));
}

function attackOrHeal(enemy) {
    if (flipCoin() == 0) {
        this.attack(enemy);
    } else {
        this.heal();
    }
}

let villainMove = attackOrHeal.bind(myVillain, myHero);
let heroMove = attackOrHeal.bind(myHero, myVillain);

function startBattle(character1, character2) {
    let turns = 0;
    while (character1.healthPoints > 0 || character2.healthPoints > 0) {
        villainMove();
        heroMove();
        turns++;
    }
    console.log(turns);
}

startBattle(myVillain, myHero);
