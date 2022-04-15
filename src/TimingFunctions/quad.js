export default function () {
  return {
    name: 'quad',
    func: function (timeFraction) {
        return Math.pow(timeFraction, 2);
    }
  }
}