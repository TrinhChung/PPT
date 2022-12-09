import * as math from "mathjs";
const x = math.parse("x");

const eulerCalculator = (yi, h, fun, xi, n) => {
  if (n === 0) return yi;
  const y1 = yi + h * fun.evaluate({ x: xi, y: yi });
  return eulerCalculator(y1, h, fun, xi + h, n - 1);
};

const eulerImproveCalculator = (yi, h, fun, xi, n) => {
  if (n === 0) return yi;
  const y12 = yi + (h * fun.evaluate({ x: xi, y: yi })) / 2;
  const y1 = yi + fun.evaluate({ x: xi + h / 2, y: y12 }) * h;
  return eulerCalculator(y1, h, fun, xi + h, n - 1);
};

const eulerImproveV2Calculator = (yi, h, fun, xi, n) => {
  if (n === 0) return yi;
  const y12 = yi + h * fun.evaluate({ x: xi, y: yi });
  const y1 =
    yi +
    (h *
      (fun.evaluate({ x: xi, y: yi }) + fun.evaluate({ x: xi + h, y: y12 }))) /
      2;
  return eulerCalculator(y1, h, fun, xi + h, n - 1);
};

export const eulerMethod = () => {
  const df = math.parse("0.5*x*y");
  const f = math.parse("(2*x+1)/(x^2+1)");
  const df1 = math.derivative(f, x);
  const df2 = math.derivative(df1, x);
  const x1 = 0;
  const x2 = 1;
  const y0 = 1;
  const h = 0.1;
  const n = (x2 - x1) / h;
  const result = eulerCalculator(y0, h, df, x1, n);
  console.log("Result Euler Method: " + result);
  console.log(
    "Sai so: " + Math.abs(h * h * df2.evaluate({ x: x2 - h / 2 })) / 2
  );
  console.log("---------------------------------------------------");
  const resultImprove = eulerImproveCalculator(y0, h, df, x1, n);
  console.log("Result Euler Improve Method: " + resultImprove);
  console.log("---------------------------------------------------");
  const resultImproveV2 = eulerImproveV2Calculator(y0, h, df, x1, n);
  console.log("Result Euler Improve Method: " + resultImproveV2);
};
