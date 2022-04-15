export default function (n) {
  return {
    name: 'getNthPol',
    func: function (timeFraction) {
      return Math.pow(timeFraction, n);
    }
  }
}