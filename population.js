function Pop(n){
    this.pool = [];
    this.index = 0;
    this.mutationRate = 0.1;
    for(let i=0; i < n; i++){
        this.pool.push(new Brain(3));
    }

    this.pass = (score) => {
        this.pool[this.index].score = score;
        if(this.index < this.pool.length - 1) this.index++;
        else{
            gen++;
            this.breed();
            this.index = 0;
        }
    }

    this.breed = function(){
        let bests = this.pool.sort((a, b) => b.score - a.score);
        for(let i in this.pool){
            if(Math.random() < this.mutationRate){
                this.pool[i] = new Brain(3);
            } else{
                this.pool[i] = this.merge(bests[0], bests[1]);
            }
        }
    }

    this.merge = function(p1, p2){
        let p3 = new Brain(3);
        for(let i in p3.weights){
            p3.weights[i] = random(1) < 0.5 ?
            p1.weights[i] : p2.weights[i];
        }
        return p3;
    }
}