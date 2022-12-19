import * as math from "mathjs";
const x = math.parse("x");

let newtonCalculator = (f, df, scope, n) => {
  const xn = scope.x - f.evaluate(scope) / df.evaluate(scope);
  console.log(xn);
  if (n === 1) {
    console.log("sai số:" + math.abs(xn - scope.x));
    console.log("sai số tương đối:" + math.abs(xn - scope.x) / xn);
    return xn;
  } else {
    scope.x = xn;
    return newtonCalculator(f, df, scope, n - 1);
  }
};

export const newtonMethod = () => {
  const f = math.parse("(5/x) - 38");
  const df = math.derivative(f, x);
  const scope = {
    x: 0.2,
  };
  const result = newtonCalculator(f, df, scope, 3);
  console.log("Result newton Method: " + result);
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

const falsePositionCalculator = (f, x1, x2, n) => {
  const q0 = f.evaluate(x1);
  const q1 = f.evaluate(x2);
  const p = x1.x - (q0 * (x1.x - x2.x)) / (q0 - q1);
  if (n === 1) return p;
  else {
    const q = f.evaluate({ x: p });
    if (q * q1 < 0) {
      x1.x = p;
      return falsePositionCalculator(f, x1, x2, n - 1);
    }
    if (q0 * q < 0) {
      x2.x = p;
      return falsePositionCalculator(f, x1, x2, n - 1);
    }
  }
};

export const falsePositionMethod = () => {
  const f = math.parse("x^2 - 6");
  const p0 = {
    x: 1,
  };
  const p1 = {
    x: 3,
  };
  console.log(
    "Result False Position Method: " + falsePositionCalculator(f, p0, p1, 2000)
  );
};
