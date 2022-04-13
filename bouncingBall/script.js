let ball = document.getElementById('football');

let _ball = {
    animObject: document.getElementById('football'),
    draw: function(progress){
        this.animObject.style.top = `${40 * progress}vh`;
    },
    timingFunction: timingFunctions.pseudoBounce(.5, 4, 2),
    duration: 3000
};

ball.onclick = () => animate(_ball);
