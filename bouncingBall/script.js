import * as animTools from '../tools.js';

let ball = document.getElementById('football');

let _ball = {
    draw: function(progress){
        ball.style.top = `${40 * progress}vh`;
    },
    timingFunction: animTools.timingFunctions.pseudoBounce(.5, 4, 2),
    duration: 3000
};

ball.onclick = () => animTools.animate(_ball);