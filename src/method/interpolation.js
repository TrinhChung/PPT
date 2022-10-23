import * as math from "mathjs";
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
  const x = { x: 13 };
  const pn = interpolationNewtonCalculate(arr, x.x, arr.length - 1);

  console.log("Pn(x)= " + pn);
  console.log("Sai số tuyệt đối là: " + math.abs(f.evaluate(x) - pn));
};
