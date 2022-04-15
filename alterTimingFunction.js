let alterTimingFunction = {
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

export { alterTimingFunction };