export default function (elasticity = .25, numOfBounces = 2, curveOrder = 2) {
  if (elasticity < 1) {
    let factor = (1 - elasticity) / (elasticity + 1 - 2 * Math.pow(elasticity, numOfBounces + 1));
    return {
      name: 'bounce',
      factor: factor,
      bounceState: 1,
      halfOfRange: factor * elasticity,
      lowerLimit: factor,
      middlePoint: factor * (1 + elasticity),
      upperLimit: factor * (1 + 2 * elasticity),
      func: function (timeFraction) {
        let progress;
        if (timeFraction <= this.factor) {
          progress = Math.pow(timeFraction / this.factor, curveOrder);
        } else {
          if (this.lowerLimit < timeFraction && timeFraction <= this.upperLimit) {
            if (timeFraction <= this.middlePoint) {
              let positionInRange = timeFraction - this.lowerLimit;
              progress = 1 - Math.pow(elasticity, this.bounceState) * (1 - (Math.pow(1 - positionInRange / this.halfOfRange, curveOrder)));
            } else {
              let positionInRange = timeFraction - this.middlePoint;
              progress = 1 + Math.pow(elasticity, this.bounceState) * ((Math.pow(positionInRange / this.halfOfRange, curveOrder)) - 1);
            }

            if (timeFraction === 1) {
              this.halfOfRange = factor * elasticity;
              this.bounceState = 1;
              this.lowerLimit = factor;
              this.middlePoint = factor * (1 + elasticity);
              this.upperLimit = factor * (1 + 2 * elasticity);
            }

          } else {
            this.halfOfRange *= elasticity;
            this.bounceState++;
            this.lowerLimit = this.upperLimit;
            this.middlePoint = this.lowerLimit + this.halfOfRange;
            this.upperLimit += 2 * this.halfOfRange;
          }
        }
        return progress
      }
    }
  } else {
    console.error('elasticity must be less than 1')
  }
}