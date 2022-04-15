export default function (timing_function) {
  const timingFunction = timing_function.func;
  timing_function.func = function (timeFraction) {
    return timingFunction(1 - timeFraction);
  };
  return timing_function;
}