function Bar(x, y){
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = height / 4;
    this.vel = 10;
    this.dir = 0;

    this.show = function(){
        push();
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    this.update = function(){
        if((this.y + this.h < height && this.dir > 0)
        || (this.y > 0 && this.dir < 0)){
            this.y += this.dir * this.vel;
        }
    }

    this.move = function(yDir){
        this.dir = yDir;
    }
}