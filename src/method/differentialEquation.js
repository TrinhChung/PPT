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
  return eulerImproveCalculator(y1, h, fun, xi + h, n - 1);
};

const eulerImproveV2Calculator = (yi, h, fun, xi, n) => {
  console.log("xi: " + xi);
  console.log("yi: " + yi);
  console.log("n: " + n);
  if (n === 0) return yi;
  const y12 = yi + h * fun.evaluate({ x: xi, y: yi });
  const y1 =
    yi +
    (h *
      (fun.evaluate({ x: xi, y: yi }) + fun.evaluate({ x: xi + h, y: y12 }))) /
      2;
  return eulerImproveV2Calculator(y1, h, fun, xi + h, n - 1);
};

export const eulerMethod = () => {
  const df = math.parse("(2 -2*x*y)/(x^2+1)");
  const f = math.parse("(2*x+1)/(x^2+1)");
  const df1 = math.derivative(f, x);
  const df2 = math.derivative(df1, x);
  const x1 = 0;
  const x2 = 1;
  const y0 = 1;
  const h = 0.1;
  const n = (x2 - x1) / h;
  const result = eulerCalculator(y0, h, df, x1, n);
  const resultExact = f.evaluate({ x: x2 });
  console.log("Result Euler Method: " + result);
  console.log(
    "Sai so: " + Math.abs(h * h * df2.evaluate({ x: x2 - h / 2 })) / 2
  );
  console.log("Sai so tuyet doi: " + Math.abs(result - resultExact));
  console.log("---------------------------------------------------");
  const resultImprove = eulerImproveCalculator(y0, h, df, x1, n);
  console.log("Result Euler Improve Method: " + resultImprove);
  console.log("Sai so tuyet doi: " + Math.abs(resultImprove - resultExact));

  console.log("---------------------------------------------------");
  const resultImproveV2 = eulerImproveV2Calculator(y0, h, df, x1, n);
  console.log("Result Euler Improve Method: " + resultImproveV2);
  console.log("Sai so tuyet doi: " + Math.abs(resultImproveV2 - resultExact));
  console.log("---------------------------------------------------");
};

const k1Method = (fun, xi, yi, h) => {
  return h * fun.evaluate({ x: xi, y: yi });
};

const k2Method = (fun, xi, yi, h, k1) => {
  return h * fun.evaluate({ x: xi + h * 0.5, y: yi + k1 * 0.5 });
};

const k3Method = (fun, xi, yi, h, k2) => {
  return h * fun.evaluate({ x: xi + h * 0.5, y: yi + k2 * 0.5 });
};
const k4Method = (fun, xi, yi, h, k3) => {
  return h * fun.evaluate({ x: xi + h, y: yi + k3 });
};

const deltaYMethod = (k1, k2, k3, k4) => {
  return (k1 + 2 * k2 + 2 * k3 + k4) / 6.0;
};

const rungeKuttaCalculator = (fun, xi, yi, h, n) => {
  if (n === 0) return yi;
  const k1 = k1Method(fun, xi, yi, h);
  const k2 = k2Method(fun, xi, yi, h, k1);
  const k3 = k3Method(fun, xi, yi, h, k2);
  const k4 = k4Method(fun, xi, yi, h, k3);
  const deltaY = deltaYMethod(k1, k2, k3, k4);
  return rungeKuttaCalculator(fun, xi + h, yi + deltaY, h, n - 1);
};

export const rungeKutta = () => {
  const df = math.parse("(2 -2*x*y)/(x^2+1)");
  const f = math.parse("(2*x+1)/(x^2+1)");
  const df1 = math.derivative(f, x);
  const df2 = math.derivative(df1, x);
  const x1 = 0;
  const x2 = 1;
  const y0 = 1;
  const h = 0.1;
  const n = (x2 - x1) / h;
  const result = rungeKuttaCalculator(df, x1, y0, h, n);
  const resultExact = f.evaluate({ x: x2 });
  console.log("Result runge Kutta Method: " + result);
  console.log("Sai so tuyet doi: " + Math.abs(result - resultExact));
  console.log("---------------------------------------------------");
};
