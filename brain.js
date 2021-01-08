function Brain(w){
    this.weights = [];
    this.score = 0;
    for(let i=0; i < w; i++){
        this.weights.push(Math.random() * 3);
    }

    this.guess = function(inputs){
        let sum = 0;
        inputs.map((v, i) => {
            sum += v * this.weights[i];
        })
        sum /= this.weights.length;
        return Math.floor(sum) % this.weights.length;
    }
}
