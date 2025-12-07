
let bird;
let birds = [];
let numBirds = 1050;//number of birds
let birdAlpha = 650;//birds transparency


let lines = [];
let numLines = 200; // number of radiating lines

function preload() {
 
  bird = loadImage("bird.png");
}

function setup() {
  createCanvas(1400, 670, WEBGL);

  // create birds with position, size, velocity, and random rotation speeds
  for (let i = 0; i < numBirds; i++) {
    birds.push({
      x: random(-600, 600),
      y: random(-600, 600),
      z: random(-600, 600),
      size: random(20, 80),
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
      vz: random(-0.5, 0.5),
      rotXSpeed: random(-0.02, 0.02),
      rotYSpeed: random(-0.02, 0.02),
      rotX: random(TWO_PI),
      rotY: random(TWO_PI)
    });
  }

  // radiating lines from origin
  for (let i = 0; i < numLines; i++) {
    // random direction vector
    let dir = p5.Vector.random3D();
    // random length
    let len = random(500, 2000);
    lines.push({
      dir: dir,
      len: len,
      c: color(random(150, 255), random(150, 255), random(150, 255), 150)
    });
  }

  // overlay for text
  overlay = createGraphics(width, height);
  overlay.pixelDensity(1);
}

function createBird(b) {
  push();
  translate(b.x, b.y, b.z);

  // rotate bird individually
  rotateX(b.rotX);
  rotateY(b.rotY);

  drawTwoSided(() => {
    noStroke();
    tint(255, birdAlpha);
    texture(bird);
    plane(b.size);
  });

  pop();
}

function moveBird(b) {
  b.x += b.vx;
  b.y += b.vy;
  b.z += b.vz;

  // bounce off boundaries
  if (b.x < -500 || b.x > 500) b.vx *= -1;
  if (b.y < -300 || b.y > 300) b.vy *= -1;
  if (b.z < -300 || b.z > 300) b.vz *= -1;

  // update rotation
  b.rotX += b.rotXSpeed;
  b.rotY += b.rotYSpeed;
}

function draw() {
  background("black")

 //moving scene with mouse axis
  rotateX(map(mouseY, 0, height, -PI, PI));
  rotateY(map(mouseX, 0, width, -PI, PI));

  // draw radiating lines from origin
  for (let l of lines) {
    stroke(l.c);
    strokeWeight(1.5);
    let x2 = l.dir.x * l.len;
    let y2 = l.dir.y * l.len;
    let z2 = l.dir.z * l.len;
    line(0, 0, 0, x2, y2, z2);
  }

  push()
  translate(0,0,0);
  drawTwoSided(()=>{
    noStroke();
    fill("white");
    sphere(10)
  })
  pop();

  // draw and move birds
  for (let b of birds) {
    createBird(b);
    moveBird(b);
  }

  
}
