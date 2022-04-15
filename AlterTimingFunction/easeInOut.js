export default function (timing_function) {
  const timingFunction = timing_function.func;
  timing_function.func = function (timeFraction) {
    if (timeFraction <= 0.5) {
      return timingFunction(2 * timeFraction) / 2;
    } else {
      return (2 - timingFunction(2 - 2 * timeFraction)) / 2;
    }
  };
  return timing_function;
}