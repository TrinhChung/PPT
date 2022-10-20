import * as math from "mathjs";
import { copyArray } from "./matrix.js";
const checkMainDiagonal = (a) => {
  let n = a.length;
  for (let i = 0; i < n; i++) {
    let t = 0;
    for (let j = 0; j < n; j++) {
      t += math.abs(a[i][j]);
    }
    if (math.abs(a[i][i]) < t - math.abs(a[i][i])) {
      return false;
    }
  }
  return true;
};

const getMatrixD = (a) => {
  const d = math.zeros([a.length, 1]);
  for (let i = 0; i < a.length; i++) {
    d[i][0] = a[i][i];
  }
  return d;
};

const getMatrixT = (a) => {
  const d = copyArray(a);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
      d[i][j] = -1 * d[i][j];
    }
    d[i][i] = 0;
  }
  return d;
};

const devMatrix = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      a[i][j] = a[i][j] / b[i][0];
    }
  }
};

const matrixMaxRow = (a) => {
  let B = math.zeros([a.length, 1]);
  for (let i = 0; i < a.length; i++) {
    let t = 0;
    for (let j = 0; j < a[i].length; j++) {
      t += math.abs(a[i][j]);
    }
    B[i][0] = t;
  }
  return B;
};

const dissociateMatrix = (a, u, d) => {
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      if (j > i) {
        u[i][j] = -a[i][j];
        d[i][j] = 0;
      } else {
        u[i][j] = 0;
        d[i][j] = a[i][j];
      }
    }
  }
};

const jacobiCalculate = (B, x, b, n) => {
  if (n === 0) return x;
  let result = math.add(math.multiply(B, x), b);
  return jacobiCalculate(B, result, b, n - 1);
};

export const jacobiMethod = () => {
  const matrix = [
    [10, -1, 2, 0],
    [-1, 11, -1, 3],
    [2, -1, 10, -1],
    [0, 3, -1, 8],
  ];
  if (!checkMainDiagonal(matrix)) {
    console.log("Matrix invalid");
    return;
  }

  let b = [[6], [25], [-11], [15]];
  let d = getMatrixD(matrix);
  let t = getMatrixT(matrix);
  devMatrix(b, d);
  devMatrix(t, d);
  let x = copyArray(b);

  console.log(jacobiCalculate(t, x, b, 3000));
};

const seidelCalculate = (t, x, bg, n) => {
  if (n === 1) return x;
  x = math.add(math.multiply(t, x), bg);
  return seidelCalculate(t, x, bg, n - 1);
};

export const seidelMethod = () => {
  const matrix = [
    [10, -1, 2, 0],
    [-1, 11, -1, 3],
    [2, -1, 10, -1],
    [0, 3, -1, 8],
  ];
  const b = [[6], [25], [-11], [15]];
  const u = copyArray(matrix);
  const d = copyArray(matrix);
  dissociateMatrix(matrix, u, d);
  const t = math.multiply(math.pinv(d), u);
  const bg = math.multiply(math.pinv(d), b);
  const x = math.zeros([matrix.length, 1]);
  console.log(seidelCalculate(t, x, bg, 1000));
};
