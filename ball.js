function Ball(x, y){
    this.x = x;
    this.y = y;
    this.r = 20;
    this.dir = [random([-1, 1]), random([-1, 1])];
    this.vel = 6;

    this.show = function(){
        push();
        fill(255);
        rect(this.x, this.y, this.r, this.r);
        pop();
    }

    this.update = function(){
        this.x += this.dir[0] * this.vel;
        this.y += this.dir[1] * this.vel;

        if(this.y + this.r > height || this.y < 0) this.dir[1] *= -1;
    }

}