let players, ball;
scores = [0, 0];
let popu;
let count = 1;
let gen = 1;
let playing = false;

function setup(){
    createCanvas(500, 500);
    players = [new Bar(10, height / 3),
        new Bar(width - 30, height / 3)];
    ball = new Ball(width / 2, height / 2);

    popu = new Pop(30);

}

function draw(){
    for(let g=0; g < count; g++){
        background(0);
        // showing elements
        players.map(p => {
            p.show();
            p.update();
        });
        ball.show();
        ball.update();

        // good AI
        let s = popu.pool[popu.index].guess([ball.x, ball.y, players[1].y])
        if(s == 1) players[1].move(1)
        if(s == 2) players[1].move(-1)
    
        // crap AI
        if(!playing){
            if(ball.y > players[0].y) players[0].move(1)
            if(ball.y < players[0].y) players[0].move(-1)
        }

        // defining scores
        if(ball.x + ball.r > width){
            ball.x = width/2;
            ball.dir[0] = random([-1, 1]);
            scores[0]++;
            if(scores[0] > 5){
                popu.pass(scores[1] - scores[0]);
                scores = [0, 0];
            }
        } else if(ball.x < 0){
            ball.x = width/2;
            ball.dir[0] = random([-1, 1]);
            scores[1]++;
        }

        // showing scores
        push();
        fill(200);
        textSize(15);
        text(`Score: ${scores[0]}`, 50, 30);
        text(`Score: ${scores[1]}\nChild: ${popu.index}\nGen: ${gen}`, width - 100, 30);
        pop();
    
        // detecting collisions
        players.map(p => {
            if(ball.y + ball.r > p.y &&
                ball.x + ball.r > p.x + 3 && ball.y <  p.y + p.h
                && ball.x < p.x + p.w && ball.dir[0] > 0
                && ball.x > 2*width / 3){
                    scores[1]++;
                }
    
            if(ball.y + ball.r > p.y &&
            ball.x + ball.r > p.x + 3 && ball.y <  p.y + p.h
            && ball.x < p.x + p.w) ball.dir[0] *= -1;
        })
    }
    
    
}

function keyPressed({ key }){
    if(playing){
        const moves = [{w: -1, s: 1},
            {'ArrowUp': -1, 'ArrowDown': 1}]
    
        players.map((p, i) => {
            if(moves[i][key]) p.move(moves[i][key])
        })
    }
}

function keyReleased({ key }){
    if(playing){
        const moves = [['w', 's'], ['ArrowUp', 'ArrowDown']]
    
        players.map((p, i) => {
            if(moves[i].includes(key)) p.move(moves[i][key])
        })
    }

    if(key == ' '){
        popu.pass(scores[1] - scores[0]);
        scores = [0, 0];
    }

    if(key == 'f'){
        noLoop();
    }

    if(key == 'p') playing = !playing;
}
