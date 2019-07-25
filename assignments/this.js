/* The for principles of "this";
 * in your own words. explain the four principle for the "this" keyword below.
 *
 * 1. Window Binding is the default binding for this in the global scope. "This" will always default to the window
 * 2. Implicit Binding is the "whatever is left of the dot" principle, where "This" is associated with the object that called it
 * 3. Explicit Binding is when you use .call(), .apply(), or .bind() and explicity define what "this" refers to
 * 4. New Binding is when you declare a new binding and the object that was created from the NEW statement is bound to "this"
 *
 * write out a code example of each explanation above
 */

// Principle 1
// code example for Window Binding
console.log(this.innerWidth);

// Principle 2
// code example for Implicit Binding

let ameliaEarhart = {
    searchlocation: [
        1,
        2,
        3,
        4,
        5,
        6,
        9,
        8,
        7,
        6,
        5,
        4,
        'Amelia Earhart',
        5,
        6,
        7,
        5,
        3,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
    ],
    findAmelia: function() {
        console.log(this.searchlocation.findIndex(e => e === 'Amelia Earhart'));
    },
};

ameliaEarhart.findAmelia();

// Principle 3
// code example for New Binding

function HollywoodMovie(attrs) {
    (this.director = attrs.director),
        (this.mainActor = attrs.mainActor),
        (this.budget = attrs.budget),
        (this.mainActorPay = function() {
            return `${this.director} will pay ${this.actor} ${this.budget /
                10} for this movie`;
        });
}

let JackieChanReturnsForMoreButtKicking = new HollywoodMovie({
    director: 'Jackie Chan',
    mainActor: 'Jackie Chan',
    budget: 50000000,
});

console.log(JackieChanReturnsForMoreButtKicking.mainActorPay());

// Principle 4
// code example for Explicit Binding

const myObj = {
    destiny: 'A.I. Apocolypse',
};

function randomDestroyEarth() {
    return `I will destroy the earth by ${this.destiny}`;
}

console.log(randomDestroyEarth.call(myObj));
