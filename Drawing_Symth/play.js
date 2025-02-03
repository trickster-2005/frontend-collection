//要匯入element.js
let waveform = ['sine','square', 'triangle', 'sawtooth']; //波型 
let waveform_index = 0;

let scl = 0.8; // 掃描範圍
let r = 6; //筆刷大小

let button, button2, slider, slider2, inp, inp2; // play, clear_canvas, speed, brush size 
let wave; 
let img;
let highest_freq = 1300, lowest_freq = 50;



function setup() { 
    createCanvas(1800, 1000); //z畫布長寬，可用
    background(220);

    textAlign(textAlign(LEFT,TOP))
    textFont("Comic Sans MS")

    draw_rect()
    draw_element()
    draw_waveform()
    
    wave = new p5.Oscillator(waveform[waveform_index]);
    wave.amp(0)
}

function draw() {
    scl = slider.value()
    r = slider2.value()
    lowest_freq = Number(inp.value())
    highest_freq = Number(inp2.value())
    // print(typeof(lowest_freq),lowest_freq)

    if(mouseIsPressed){
        if((mouseX>50+r && mouseX<width-50-r) && (mouseY>50+r && mouseY<450-r)){
            if(keyIsPressed==true && keyCode ==90){ //按下Z
                fill(220,220,250)
                ellipse(mouseX,mouseY,r*2)           
            }else{
                fill(20)
                ellipse(mouseX,mouseY,r*2)
            }
        }
    }
}



function play(){
    wave.start();
    wave.setType(waveform[waveform_index])
    wave.amp(0.24,0.1)

    for(var i=50;i<=width-50;i+=scl){
        for(var j=50;j<=350;j+=scl){
            let clr = get(i,j)
            if(clr[0]==20){
                let value = map(j,51,450,highest_freq, lowest_freq) //30~1300Hz
                print('sound')      
                wave.freq(value)             
            }
        }
    }
    wave.amp(0,1)
}


function set_waveform(num){
    waveform_index = num;
    print(num)
}

