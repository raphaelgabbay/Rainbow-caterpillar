const nbCircles = 500;
const interval = 20;
var circles;
let currentHue = 0;
let clicked;
let black;
let transparent;
let speed;
let hueSpeed;

function setup() {
    createCanvas(windowWidth, windowHeight);    // createCanvas must be the first statement
    background(0);                              // Set the background to black
    frameRate(100);
    colorMode(HSB,360,100,100);
    noStroke();
    clicked = false;
    black = false;
    transparent = false;
    speed = 1;
    hueSpeed = 4;

    circles = new Circles();
}

function draw() {
    currentHue += hueSpeed;
    currentHue %= 360;
    let transparency = 1;
    if(transparent) transparency = 0.1;

    if(!black) {
        var c = new Circle(mouseX, mouseY, currentHue, transparency);
    } else {
        var c = new Circle(mouseX, mouseY, -1, transparency);
    }
    if(clicked) {
        this.circles.addCircle(c);
    }
    if (this.circles.circleArray.length > nbCircles) {
        this.circles.delCircle();
    }
    this.circles.update();
    this.circles.display();
}

class Circles {
    constructor() {
        this.circleArray = [];
    }

    addCircle(c) {
        this.circleArray.push(c);
    }

    delCircle() {
        this.circleArray.shift();
    }

    update() {
        for(let i = 0; i < this.circleArray.length; i++) {
            this.circleArray[i].grow();
        }
    }

    display() {
        for(let i = 0; i < this.circleArray.length; i++) {
            this.circleArray[i].display();
        }
    }
}

class Circle {
    constructor(x, y, hue, transparency) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.transparency = transparency;
        this.size = 0;
    }

    grow() {
        this.size += speed;
    }

    display() {
        if(this.hue !== -1) {
            fill(this.hue, 100, 100, this.transparency);
        } else {
            fill (0,0,0,this.transparency);
        }
        ellipse(this.x, this.y, this.size, this.size);
    }
}

function mousePressed() {
    clicked = !clicked;
}

function keyPressed() {
    if(key === 'r') {
        background(0);
        this.circleArray = [];
        setup();
    }
    if(key === 'b') {
        black = !black;
    }
    if(key === 't') {
        transparent = !transparent;
    }
}

// window.onload = function() {
//     var text = new RainbowCat();
//     var gui = new dat.GUI();
//     gui.add(text, 'hueSpeed', 0, 10);
//     gui.add(text, 'speed', 0, 10);
//     gui.add(text, 'cleared');
// };
//
// var RainbowCat = function() {
//     this.speed = 1;
//     this.black = false;
//     this.cleared = false;
//     this.transparent = false;
//     this.hueSpeed = 1;
//     setup();
//     draw();
// };