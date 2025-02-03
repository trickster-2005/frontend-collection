let waveform_button = []

function draw_element(){
    //播放
    button = createButton('PLAY')
    button.position(1300,500)
    button.size(450,450)
    button.mousePressed(play)

    button.style("font-size", "128px")
    button.style("font-family", "Comic Sans MS");
    button.style('border-radius','50%')
    button.style('background-color','#edb1d5')
    button.style('border','none')
    


    //掃描速度
    textSize(32)
    fill(10)
    text('Speed', 550, 500)

    slider = createSlider(0.3, 2.3, 1, 0.05)
    slider.position(550,550) //550,600
    slider.size(300)
    slider.style('width', '300px');
    slider.style('height', '30px')
    slider.style('webkitAppearance', 'none')


    //Brush size
    textSize(32)
    fill(10)
    text('Brush Size', 550, 600)


    slider2 = createSlider(0, 20, 6)
    slider2.position(550,650) //550,600
    slider2.size(300)
    slider2.style('width', '300px');
    slider2.style('height', '30px')
    slider2.style('webkitAppearance', 'none') 


    //清空畫布
    button2 = createButton('Clear')
    button2.position(550,750)
    button2.size(700,200)
    button2.mousePressed(draw_rect)
    button2.style("font-family", "Comic Sans MS");
    button2.style("font-size", "48px")
    button2.style("border", "none")
    button2.style("background-color", "#f7c0c0")

    //頻率範圍 (最高、最低)
    textSize(32)
    fill(10)
    text('Lowest Frequency', 900, 500)   
    inp = createInput(30)
    inp.position(900,550)
    inp.size(350)
    inp.style('border', 'none')
    inp.style('height','30px')
    inp.style('font-size', '26px')

    textSize(32)
    fill(10)
    text('Highest Frequency', 900, 600)   
    inp2 = createInput(1300)
    inp2.position(900,650)
    inp2.size(350)
    inp2.style('border', 'none')
    inp2.style('height','30px')
    inp2.style('font-size', '26px')
}






function draw_rect(){
    noStroke()
    fill(220,220,250)
    rect(50,50,width-100,400)
}





function draw_waveform(){
    let pos = [
        [50,500],
        [300,500],
        [50,750],
        [300,750]
    ];

    //畫出四個基本波型的button
    for(var i=0;i<4;i++){
        var tmp = createButton(waveform[i])
        waveform_button.push(tmp)


        waveform_button[i].position(pos[i][0],pos[i][1])
        waveform_button[i].size(200,200)
        waveform_button[i].style("font-size", "0px")
        waveform_button[i].style('background-image', "url(./img/" +  i + ".png)")
        waveform_button[i].mousePressed((function(i) {
            return function() {
              set_waveform(i);
            };
        })(i));
    }
}

function draw_word(){
    //底下說明文字
}