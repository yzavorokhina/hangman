// function summ(a, b){
//     return a + b;
// }

// let summ  = function(a, b){
//     return a + b;
// }

// let summ = (a, b) => {
//     return a + b;
// }

// let summ = (a, b) => a + b;

// let summ = a => a + b;

// let r = summ(1,2);

// Generator-function return object
// generator definition:
function* generate() {
    for (let i = 0; i < 10; i++) {
        yield i;
    }
}

// creating a generator
let gen = generate();

// iteration of objects
for (let m of gen) {
    console.log(m);
}

// console.log(generate());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

function* show() {
    console.log('Step 1');
    yield;

    console.log('Step 2');
    yield;

    console.log('Step 3');
    yield;
}

let s = show();

s.next();
s.next();
s.next();
s.next();