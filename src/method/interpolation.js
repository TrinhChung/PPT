import * as math from "mathjs";
import { luCalculator } from "./matrix.js";
const x = math.parse("x");

const lkMethod = (x, arr, n) => {
  let result = 1;
  for (let i = 0; i < arr.length; i++) {
    if (n !== i) {
      result = result * 1.0 * (x - arr[i][0]);
    }
  }
  return result;
};

const interpolationLagrangeMethod = (arr, x) => {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result =
      result + (lkMethod(x, arr, i) * arr[i][1]) / lkMethod(arr[i][0], arr, i);
  }
  return result;
};

//Phuong phap Lagrange
export const interpolationLagrangeCalculate = () => {
  const f = math.parse("log(x)");
  const arr = [
    [9, 2.19722458],
    [9.5, 2.2512918],
    [11, 2.39789527],
    [12, 2.48490665],
  ];
  const x = { x: 9.2 };
  const p = interpolationLagrangeMethod(arr, x.x);
  console.log("p(x)= " + p);
  console.log("Sai số tuyệt đối là " + math.abs(f.evaluate(x) - p));
};

const anCalculate = (arr, n) => {
  if (n === 0) return arr[0][1];
  let m = 1.0;
  for (let i = 0; i < n; i++) {
    m = m * (arr[n][0] - arr[i][0]);
  }
  return (arr[n][1] - interpolationNewtonCalculate(arr, arr[n][0], n - 1)) / m;
};

const interpolationNewtonCalculate = (arr, x, n) => {
  if (n === 0) return anCalculate(arr, 0);
  let t = 1;
  for (let i = 0; i < n; i++) {
    t *= x - arr[i][0];
  }
  return interpolationNewtonCalculate(arr, x, n - 1) + anCalculate(arr, n) * t;
};

export const interpolationNewtonMethod = () => {
  const f = math.parse("log(x)");
  const arr = [
    [9, 2.19722458],
    [9.5, 2.2512918],
    [11, 2.39789527],
    [12, 2.48490665],
    [13, 2.564949357],
    [14, 2.63905733],
    [15, 2.708050201],
  ];
  const x = { x: 12 };
  const pn = interpolationNewtonCalculate(arr, x.x, arr.length - 1);

  console.log("Pn(x)= " + pn);
  console.log("Sai số tuyệt đối là: " + math.abs(f.evaluate(x) - pn));
};

//Spline bậc 3

const findCj = (i, xj) => {
  if (xj[i + 1] === xj[i]) return 1000000000000000;
  else return 1 / (xj[i + 1] - xj[i]);
};

const findKj = (k1, kn, fj, h) => {
  const a = [];
  const b = [];
  const aj = new Array(fj.length).fill(0);
  aj[0] = 1;
  a.push(aj);
  b.push(k1);
  for (let i = 1; i < fj.length - 1; i++) {
    const m = new Array(fj.length).fill(0);
    m[i] = 4;
    m[i - 1] = 1;
    m[i + 1] = 1;
    a.push(m);
    b.push((3 * (fj[i + 1] - fj[i - 1])) / h);
  }
  const an = new Array(fj.length).fill(0);
  an[fj.length - 1] = 1;
  a.push(an);
  b.push(kn);
  return luCalculator(a, b);
};

const qj = (i, kj, fj, xj) => {
  const cj = findCj(i, xj);
  const ai = new Array(4).fill(0);
  ai[0] = fj[i];
  ai[1] = kj[i];
  ai[2] =
    -3 * fj[i] * Math.pow(cj, 2) +
    3 * fj[i + 1] * Math.pow(cj, 2) -
    2 * kj[i] * cj -
    kj[i + 1] * cj;
  ai[3] =
    2 * (fj[i] * Math.pow(cj, 3)) -
    2 * (fj[i + 1] * Math.pow(cj, 3)) +
    kj[i] * Math.pow(cj, 2) +
    kj[i + 1] * Math.pow(cj, 2);

  let m = "";
  console.log(ai);
  for (let j = 0; j < 4; j++) {
    m = m + ai[j] + "*((x-" + xj[i] + ")^" + j + ")";
    if (j >= 0 && j < 3) {
      m = m + "+";
    }
  }
  return m;
};

export const splineS = () => {
  const f = math.parse("x^4");
  const df = math.derivative(f, x);
  const xj = [-1, 0, 1];
  const fj = [];
  const k0 = df.evaluate({ x: xj[0] });
  const kn = df.evaluate({ x: xj[xj.length - 1] });
  if (xj.length > 0) {
    for (let i = 0; i < xj.length; i++) {
      fj.push(f.evaluate({ x: xj[i] }));
    }
  }

  const kj = findKj(k0, kn, fj, 1);
  const funArr = new Array(fj.length - 1);
  for (let i = 0; i < fj.length - 1; i++) {
    funArr[i] = math.parse(qj(i, kj, fj, xj));
  }

  const value = -0.5;
  for (let i = 0; i < xj.length - 1; i++) {
    if (value >= xj[i] && value <= xj[i + 1]) {
      console.log(funArr[i].evaluate({ x: value }));
    }
  }
};
