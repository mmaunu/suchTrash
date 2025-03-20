let canvas = document.getElementById("can");
let context = canvas.getContext("2d");



class Dog {
  constructor() {
    this.x = 400;
    this.y = 400;
    this.deltaX = 0;
    this.deltaY = 0;
    this.width = 112;
    this.height = 112;
    this.front = [];
    this.back = [];
    this.left = [];
    this.right = [];
    this.spinImages = [];
    let root = "./images/Dog/";
    for(let i = 1; i <=4; i++ ) {
      let img = new Image();
      img.src = root + "front" + i + ".png";
      this.front.push(img);
      if(i == 1) {
        this.spinImages.push(img);
      }
      img = new Image();
      img.src = root + "back" + i + ".png";
      this.back.push(img);
      if(i == 1) {
        this.spinImages.push(img);
      }
      img = new Image();
      img.src = root + "left" + i + ".png";
      this.left.push(img);
      if(i == 1) {
        this.spinImages.push(img);
      }
      img = new Image();
      img.src = root + "right" + i + ".png";
      this.right.push(img);
      if(i == 1) {
        this.spinImages.push(img);
      }
    }
    this.current = this.left;
    this.currentSpritePos = 0;
    this.numberOfImages = 4;

    this.IDLING = 123;
    this.WALKING = 987;
    this.SPINNING = 5;
    this.currentState = this.IDLING;
  }

  update() {
    if(frameCount % 4 == 0) {
      this.currentSpritePos++;
      this.currentSpritePos %= this.numberOfImages;
    }
    if(this.currentState == this.IDLING) {
      //do nothing on purpose...cause we are idling
      if(  Math.random() < 0.01 ) {
        if( Math.random() < 0.5 ) {
          this.currentState = this.WALKING;
          this.deltaX = Math.random()*4 - 2;
          this.deltaY = Math.random()*4 - 2;
          if(Math.abs(this.deltaX) >  Math.abs(this.deltaY)) {
            if(this.deltaX > 0) {
              this.current = this.right;
            }
            else {
              this.current = this.left;
            }
          }
          else {
            if(this.deltaY > 0) {
              this.current = this.front;
            }
            else {
              this.current = this.back;
            }
          }
        }
        else {
          this.currentState = this.SPINNING;
          this.current = this.spinImages;
          this.deltaX = 0;
          this.deltaY = 0;
        }
      }
    }
    else if(this.currentState == this.WALKING) {
      this.x += this.deltaX;
      this.y += this.deltaY;
      //Stay onscreen logic
      if(this.x < 0) {
        this.x = 0;
        this.deltaX = - this.deltaX;
      }
      else if(this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
        this.deltaX = - this.deltaX;
      }
      if(this.y < 0) {
        this.y = 0;
        this.deltaY = - this.deltaY;
      }
      else if(this.y + this.height > canvas.height) {
        this.y = canvas.height - this.height;
        this.deltaY = - this.deltaY;
      }
    }
    else if(this.currentState == this.SPINNING) {
      //kind of empty on purpose
    }
    else {
      console.log("Ruh roh...illegal state in Dog");
    }
  }

  draw() {
    context.drawImage( this.current[this.currentSpritePos],
                      this.x, this.y, this.width, this.height);
  }
}

let pupper = new Dog();

let gameObjects = [];
gameObjects.push(pupper);


requestAnimationFrame(animate);
let frameCount = 0;
function animate() {
  clearBackground();
  update();
  draw();
  frameCount++;
  requestAnimationFrame(animate);
}

function clearBackground() {
  context.fillStyle = "cyan";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function update() {
  for(let go of gameObjects) {
    go.update();
  }
 }

 function draw() {
   for(let go of gameObjects) {
     go.draw();
   }
 }
