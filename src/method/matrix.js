import * as math from "mathjs";
const x = math.parse("x");

//Copy ma tran
export const copyArray = (matrix) => {
  const a = [];
  for (let i = 0; i < matrix.length; i++) {
    a[i] = [...matrix[i]];
  }
  return a;
};

//Ma tran duong cheo
const eye = (n) => {
  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      a[i][j] = 0;
      if (i === j) {
        a[i][j] = 1;
      }
    }
  }
  return a;
};

// Khử Gauss đưa ma trận về dạng tam giác trên
const subtractGauss = (a) => {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (math.abs(a[i][i]) < math.abs(a[j][i])) {
        const s = a[i];
        a[i] = a[j];
        a[j] = s;
      }
      if (a[j][i] === 0) {
        console.log("Error");
        return;
      }
    }
    for (let j = i + 1; j < n; j++) {
      for (let p = i + 1; p < n + 1; p++) {
        a[j][p] = a[j][p] - (a[j][i] * a[i][p]) / a[i][i];
      }
    }
  }
  return a;
};

// Tính toán ma trận tam giác
const matrixCalculator = (a) => {
  let result = [];
  const n = a.length;
  result[n - 1] = a[n - 1][n] / a[n - 1][n - 1];
  for (let i = n - 2; i >= 0; i--) {
    let t = 0;
    for (let j = i + 1; j < n; j++) {
      t += a[i][j] * result[j];
    }
    result[i] = (1 / a[i][i]) * (a[i][n] - t);
  }
  return result;
};

const gaussCalculator = (a) => {
  a = subtractGauss(a);
  if (!a) return;
  return matrixCalculator(a);
};

export const gaussMethod = () => {
  const matrix = [
    [1, 2, 3, 4, 5],
    [4, 4, 8, 9, 11],
    [1, 4, 3, 5, 9],
    [6, 4, 12, 5, 9],
  ];
  const result = gaussCalculator(matrix);
  console.log(result);
};

const convertTriangular = (matrix, L) => {
  const a = copyArray(matrix);
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      let m = (a[j][i] * 1.0) / a[i][i];
      L[j][i] = m;
      for (let p = 0; p < n; p++) {
        a[j][p] = a[j][p] - a[i][p] * m * 1.0;
      }
    }
  }
  return a;
};

const backSubs = (a, b) => {
  const n = a.length;
  const result = [];
  result[n - 1] = (b[n - 1] * 1.0) / a[n - 1][n - 1];
  for (let i = n - 2; i >= 0; i--) {
    let s = 0;
    for (let j = i + 1; j < n; j++) {
      s = s + a[i][j] * result[j];
    }
    result[i] = ((b[i] - s) * 1.0) / a[i][i];
  }
  for (let i = 0; i < result.length; i++) {
    result[i] = Math.round(result[i] * 10000000) / 10000000;
  }
  return result;
  d;
};

const triDownResult = (a, b) => {
  const n = a.length;
  const result = a.map(() => 0);
  result[0] = (b[0] * 1.0) / a[0][0];
  for (let i = 1; i < n; i++) {
    let s = 0;
    for (let j = 0; j < i; j++) {
      s = s + a[i][j] * result[j];
    }
    result[i] = ((b[i] - s) * 1.0) / a[i][i];
  }
  return result;
};

export const luCalculator = (A0, b) => {
  const L = copyArray(eye(A0.length));
  const U = convertTriangular(A0, L);
  const result1 = triDownResult(L, b);
  return backSubs(U, result1);
};

export const luMethod = () => {
  const A0 = [
    [2, 1, 1, 0],
    [4, 3, 3, 1],
    [8, 7, 9, 5],
    [6, 7, 9, 8],
  ];
  const b = [6, 15, 41, 40];
  console.log(luCalculator(A0, b));
};
