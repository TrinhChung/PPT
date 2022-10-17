import * as math from "mathjs";
const x = math.parse("x");

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
  //   const result = gaussCalculator(matrix);
  const result = subtractGauss(matrix);
  console.log(result);
};
