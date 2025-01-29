function Bird(){
    this.size = 50;
    this.y = height / 2;
    this.x = 100;

    this.gravity = 0.50; // 降落
    this.lift = -12; // 跳躍
    this.acc = 0; // 加速度
    this.jump_or_not = 0; // 有跳為1
    // this.img_num; //顯示哪張照片，2是翅膀向下，1是向上

    this.show = function(){
        // fill(122,160,122);
        if(this.acc<0){
            image(img1, this.x, this.y, this.size, this.size*0.85);
        }else{
            image(img2, this.x, this.y, this.size, this.size*0.85);
        }
    }

    this.up = function(){
        this.acc = this.lift;
    }

    this.update = function(){
        this.acc += this.gravity;
        this.y += this.acc;
        if(this.y < 0){
            this.y = 0;
            this.acc = 0;
        }
        if(this.y > height){
            this.y = height;
            this.acc = 0;
        }
        // console.log(this.acc, this.y);
    }
}