let cnv;
let bird;
let slider_birdsize;
let img1, img2, background_img;
let pipes = [];
let foods = [];

function preload() {
    img1 = loadImage('flappy_bird_1.png');
    img2 = loadImage('flappy_bird_2.png');
    background_img = loadImage('moon.jpg');
    // https://unsplash.com/photos/full-moon-in-the-sky-wCq5W6JUOuI
}

function setup() {
    // imageMode(CENTER);
    cnv = createCanvas(800, 600);
    cnv.parent('myCanvas');
    slider_birdsize = createSlider(30, 120, 60); // min, max, start
    slider_birdsize.parent('slider_bird');
    bird = new Bird();
    pipes.push(new Pipe());
    foods.push(new Food());
}

function draw() {
    // image(background_img, 0, 0, 1000, 600);
    background(0);

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }


    cnv.style('border-radius', '20px');
    cnv.style('box-shadow', '0px 0px 7px 2px rgba(87, 92, 85, 0.8)')
    bird.show();
    bird.update();
    bird.size = slider_birdsize.value();

    if (frameCount % 60 == 0) {
        pipes.push(new Pipe());
    }
}

function keyPressed() {
    if (keyCode == 32) {
        bird.up();
    }
    if (keyCode == UP_ARROW) {
        let newSizeValue = slider_birdsize.value() + 10;
        slider_birdsize.elt.value = newSizeValue;
        console.log(bird.size);
    }
    if (keyCode == DOWN_ARROW) {
        let newSizeValue = slider_birdsize.value() - 10;
        slider_birdsize.elt.value = newSizeValue;
        console.log(bird.size);
    }
}

