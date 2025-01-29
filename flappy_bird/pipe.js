function Pipe() {
    // 一個物件代表兩個
    this.speed = 3;
    this.top  = 0;
    this.change1  = random(-50,50); // 變化數1，調整管子上方
    this.change2 = random(-50, 50);
    this.x = width;
    this.size = 30; // 管子的寬度不變
    this.show = function() {
        stroke(255, 255, 255)
        
        noFill()
        rect(this.x, 0, this.size, height/3 + this.change1);
        rect(this.x, height/3 *2  - this.change2, this.size, height/3 + this.change2);
    }

    // this.hit = function() {
    //     if(bird.x >= this.x && bird.x <=this.x+this.size && bird.y<= height/3 + this.change1){
    //         return true;
    //     }else{
    //         return false;
    //     }
    //}

    this.offscreen = function() {
        if(this.x < 0){
            return true;
        }else{
            return false;
        }
    }

    this.update = function(){
        this.x -= this.speed;
    }
}