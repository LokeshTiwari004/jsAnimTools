function animate({duration, timingFunction, draw}) {
    let startingInstant = performance.now();
    let progress = 0;

    function animate() {
        let timeFraction = (performance.now() - startingInstant) / duration;
        if (timeFraction > 1) timeFraction = 1;
        progress = timingFunction.func(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        } 
        // else {

        // }
    }

    requestAnimationFrame(animate);

    return true;
}

let timingFunctions = {
    linear: function () {
        return {
           name: 'linear',
           func: function (timeFraction) {
               return timeFraction;
           }
       }
    },
    quad: function () {
        return {
            name: 'quad',
            func: function (timeFraction) {
                return Math.pow(timeFraction, 2);
            }
        }
    },
    getNthPol: function (n) {
        return {
            name: 'getNthPol',
            func: function (timeFraction) {
                return Math.pow(timeFraction, n);
            }
        }
    },
    pseudoBounce: function (elasticity = .25, numOfBounces = 2, curveOrder = 2) {
        if (elasticity < 1){
            let factor = (1 - elasticity)/(elasticity + 1 - 2 * Math.pow(elasticity, numOfBounces + 1));
            return {
                name: 'bounce',
                factor: factor,
                bounceState: 1,
                halfOfRange: factor * elasticity,
                lowerLimit: factor,
                middlePoint: factor * ( 1 + elasticity ),
                upperLimit: factor * ( 1 + 2 * elasticity ),
                func: function (timeFraction) {
                    if (timeFraction <= this.factor){
                        return Math.pow(timeFraction/this.factor, curveOrder);
                    } else {
<<<<<<< HEAD
                        let bounceNum = 1;
                        let halfOfRange = factor * Math.pow(elasticity, 1);
                        let lowerLimit = factor;
                        let middlePoint = lowerLimit + halfOfRange;
                        let upperLimit = factor + 2 * halfOfRange;
                        while (true) {
                            if (lowerLimit < timeFraction && timeFraction <= upperLimit) {
                                break;
=======
                        if (this.lowerLimit < timeFraction && timeFraction <= this.upperLimit) {
                            if (timeFraction <= this.middlePoint) {
                                let positionInRange = timeFraction - this.lowerLimit;
                                return 1 - Math.pow(elasticity, this.bounceState) * (1 - (Math.pow(1 - positionInRange/this.halfOfRange, curveOrder)));
>>>>>>> roaster
                            } else {
                                let positionInRange = timeFraction - this.middlePoint;
                                return 1 + Math.pow(elasticity, this.bounceState) * ((Math.pow(positionInRange/this.halfOfRange, curveOrder)) - 1);
                            }
<<<<<<< HEAD
                            halfOfRange = factor * Math.pow(elasticity, bounceNum);
                            lowerLimit = upperLimit;
                            middlePoint = lowerLimit + halfOfRange;
                            upperLimit += 2 * halfOfRange;
                        }
                        if (timeFraction <= middlePoint) {
                            let positionInRange = timeFraction - lowerLimit;
                            return 1 - Math.pow(elasticity, bounceNum) * (1 - (Math.pow(1 - positionInRange/halfOfRange, curveOrder)));
=======
                        } else if (timeFraction >= 1) {
                            this.halfOfRange = factor * elasticity;
                            this.bounceState = 1;
                            this.lowerLimit = factor;
                            this.middlePoint = factor * ( 1 + elasticity );
                            this.upperLimit = factor * ( 1 + 2 * elasticity );
>>>>>>> roaster
                        } else {
                            this.halfOfRange *= elasticity;
                            this.bounceState++;
                            this.lowerLimit = this.upperLimit;
                            this.middlePoint = this.lowerLimit + this.halfOfRange;
                            this.upperLimit += 2 * this.halfOfRange;
                        }
                    }
                }
            }
        } else {
            console.error('elasticity must be less than 1')
        }
    }
}

let alterTF = {
    reverse: function (timing_function) {
        const timingFunction = timing_function.func;
        timing_function.func =  function (timeFraction) {
            return timingFunction(1 - timeFraction);
        };
        return timing_function;
    },
    easeOut: function (timing_function) {
        const timingFunction = timing_function.func;
        timing_function.func = function (timeFraction) {
            return 1 - (timingFunction(1 - timeFraction));
        };
        return timing_function;
    },
    easeInOut: function (timing_function) {
        const timingFunction = timing_function.func;
        timing_function.func =  function (timeFraction) {
            if (timeFraction <= 0.5) {
                return timingFunction(2 * timeFraction) / 2;
            } else {
                return (2 - timingFunction(2 - 2 * timeFraction)) / 2;
            }
        };
        return timing_function;
    }
}