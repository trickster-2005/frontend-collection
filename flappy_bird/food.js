// 每隔一段 5-10s 食物出現 3s，碰到隨機改變鳥的大小 5s

function Food() {
    this.x = 100;
    this.y = random(height);


    this.show = function() {
        noFill();
        ellipse(this.x, this.y, this.size);
    }

    this.update = function() {
        // this.x -= this.speed;
    }

    this.offscreen = function() {
        // return this.x < -this.size;
    }
}