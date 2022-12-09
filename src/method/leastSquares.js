import * as math from "mathjs";
import { luCalculator } from "./matrix.js";
import { simpsonCalculator } from "./integral.js";
const x = math.parse("x");

const sumSquares = (arr, fun) => {
  let t = 0;
  for (let i = 0; i < arr.length; i++) {
    t += fun.evaluate({ x: arr[i] });
  }
  return t;
};

const sumResult = (xi, yi, fun) => {
  let t = 0;
  for (let i = 0; i < xi.length; i++) {
    t += fun.evaluate({ x: xi[i] }) * yi[i];
  }
  return t;
};

const errorNumber = (fun, yi, xi) => {
  let t = 0;
  for (let i = 0; i < xi.length; i++) {
    t += Math.pow(yi[i] - fun.evaluate({ x: xi[i] }), 2);
  }
  return t;
};

export const leastSquaresMethod = () => {
  const o = ["1", "x", "x*x"];
  const xi = [0, 0.25, 0.5, 0.75, 1];
  const yi = [1, 1.2849, 1.6487, 2.117, 2.7183];
  const a = new Array(o.length);
  const b = new Array(o.length);

  for (let i = 0; i < o.length; i++) {
    a[i] = new Array(o.length).fill(0);
    for (let j = 0; j < o.length; j++) {
      const s = o[i] + "*" + o[j];
      const fi = math.parse(s);
      a[i][j] = sumSquares(xi, fi);
    }
    b[i] = sumResult(xi, yi, math.parse(o[i]));
  }
  const result = luCalculator(a, b);
  let s = "";
  for (let i = 0; i < result.length; i++) {
    s += result[i] + "*" + o[i];
    if (i < result.length - 1) {
      s += "+";
    }
  }
  console.log("Phuong trinh can tim: " + s);
  const fun = math.parse(s);
  console.log("Sai so: " + errorNumber(fun, yi, xi));
};

export const leastSquaresContinuousMethod = () => {
  const o = ["1", "x"];
  const f = "(1/x)";
  const a = new Array(o.length);
  const b = new Array(o.length);
  const a1 = 1;
  const a2 = 3;

  for (let i = 0; i < o.length; i++) {
    a[i] = new Array(o.length).fill(0);
    for (let j = 0; j < o.length; j++) {
      const s = o[i] + "*" + o[j];
      const fi = math.parse(s);
      a[i][j] = simpsonCalculator(a1, a2, fi);
    }
    const s = f + "*" + o[i];
    b[i] = simpsonCalculator(a1, a2, math.parse(s));
  }
  console.log(a);
  console.log(b);
  const result = luCalculator(a, b);
  console.log(result);
  let s = "";
  for (let i = 0; i < result.length; i++) {
    s += result[i] + "*" + o[i];
    if (i < result.length - 1) {
      s += "+";
    }
  }
  console.log("Phuong trinh can tim: " + s);
  const e = "(1/((1-x^2)^0.5))*((" + f + "-" + s + ")^2)";
  console.log(e);
  console.log("Sai so: " + simpsonCalculator(a1, a2, math.parse(e)));
};
