import * as math from "mathjs";
const x = math.parse("x");

let newtonCalculator = (f, df, scope, n) => {
  const xn = scope.x - f.evaluate(scope) / df.evaluate(scope);
  if (n === 1) return xn;
  else {
    scope.x = xn;
    return newtonCalculator(f, df, scope, n - 1);
  }
};

export const newtonMethod = () => {
  const f = math.parse("x^2 - 6");
  const df = math.derivative(f, x);
  const scope = {
    x: 1,
  };
  console.log("Result newton Method: " + newtonCalculator(f, df, scope, 2));
};

const secantCalculator = (f, x1, x2, n) => {
  const xn =
    x1.x - (f.evaluate(x1) * (x1.x - x2.x)) / (f.evaluate(x1) - f.evaluate(x2));
  if (n == 1) return xn;
  else {
    x2.x = x1.x;
    x1.x = xn;
    return secantCalculator(f, x1, x2, n - 1);
  }
};

export const secantMethod = () => {
  const f = math.parse("x^2 - 6");
  const x1 = {
    x: 1,
  };
  const x2 = {
    x: 2,
  };
  console.log("Result Secant Method: " + secantCalculator(f, x1, x2, 2));
};
