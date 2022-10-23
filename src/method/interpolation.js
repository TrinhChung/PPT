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

const interpolationNewtonMethod = (arr, x) => {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result =
      result + (lkMethod(x, arr, i) * arr[i][1]) / lkMethod(arr[i][0], arr, i);
  }
  return result;
};

export const interpolationNewtonCalculate = () => {
  const f = math.parse("log(x)");
  const arr = [
    [9, 2.19722458],
    [9.5, 2.2512918],
    [11, 2.39789527],
    [12, 2.48490665],
  ];
  const x = { x: 9.2 };
  const p = interpolationNewtonMethod(arr, x.x);
  console.log("p(x)= " + p);
  console.log("Sai số tuyệt đối là " + math.abs(f.evaluate(x) - p));
};
