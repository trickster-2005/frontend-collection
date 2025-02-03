// reference: https://www.youtube.com/watch?v=R1tfyVyU0hg&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm&index=6&t=126s

var scl = 50;
var inc = 0.28;
var img;
var imgs =[];
var obj;

function preload(){
    img =  loadImage('ocean.jpg')
}

function setup(){
    createCanvas(img.width,img.height,WEBGL)
    angleMode(DEGREES)
    textureMode(NORMAL);
    noiseDetail(1);
    divide(); //分割一張照片給多個
}

function draw(){
    background(0)    
    translate(0,10,-80)
    rotateX(55)
    fill(255,100)

    let num_x = 0;
    let num_y;
    let xoff = frameCount/100;
    let index = 0;
    for(let x= -width/2; x < width/2; x+=scl){
        let yoff = 0;
        num_y=0;
        for(let y= -height/2; y < height/2; y+=scl){
            let h = map(noise(xoff,yoff + frameCount/60),0,1,-90,90)
            push()
            let index = num_x*floor(height/scl) + num_y
            texture(imgs[index])
            num_y++
            translate(x,y)
            box(scl,scl,-h)
            pop()
            yoff += inc;
            
        }
        num_x ++;
        xoff += 0.1;
    }

}



function divide(){
    for(let x=0;x<img.width;x+=scl){
        for(let y=0;y<img.height;y+=scl){
            var tmp = createImage(scl,scl)
            tmp.copy(img,x,y,scl,scl,0,0,scl,scl)
            imgs.push(tmp)
        }
    }
}

function keyPressed(){
    if(keyCode==90){
        save('picc.png')
    }
}