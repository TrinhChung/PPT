import * as math from "mathjs";
import { pi } from "mathjs";
const x = math.parse("x");

export const dftMethod = () => {
  const x = [1, 2, 3, 4];
  const n = x.length;
  const w = math.complex(
    Math.round(math.cos((2 * pi) / n)),
    Math.round(-math.sin((2 * pi) / n))
  );

  const f = new Array(n);
  f[0] = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    f[i] = new Array(n).fill(1);
    for (let j = 1; j < n; j++) {
      f[i][j] = math.pow(w, i * j);
    }
  }
  const r = math.multiply(f, x);
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = r[i].toString();
  }
  console.log("Kết Quả: ");
  console.log(result);
};

export const inverseDftMethod = () => {
  let y = [1, 2, 3, 4];
  const n = y.length;
  for (let i = 0; i < y.length; i++) {
    y[i] = y[i] / n;
  }

  const w = math.complex(
    Math.round(math.cos((2 * pi) / n)),
    Math.round(-math.sin((2 * pi) / n))
  );

  const f = new Array(n);
  f[0] = new Array(n).fill(1 / n);
  for (let i = 1; i < n; i++) {
    f[i] = new Array(n).fill(1);
    for (let j = 1; j < n; j++) {
      f[i][j] = math.pow(w, -i * j);
    }
  }
  const r = math.multiply(f, y);
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = r[i].toString();
  }
  console.log("Kết Quả: ");
  console.log(result);
};

const fft = (x, y, n, w) => {
  if (n === 1) y[0] = x[0];
  else {
    let even = new Array(n / 2);
    let odd = new Array(n / 2);
    let q = new Array(n / 2);
    let t = new Array(n / 2);
    for (let k = 0; k < n / 2; k++) {
      even[k] = x[2 * k];
      odd[k] = x[2 * k + 1];
    }
    fft(even, q, n / 2, math.pow(w, 2));
    fft(odd, t, n / 2, math.pow(w, 2));
    for (let k = 0; k < n; k++) {
      y[k] = math.add(
        q[k % (n / 2)],
        math.multiply(math.pow(w, k), t[k % (n / 2)])
      );
    }
  }
};

export const fftMethod = () => {
  const x = [1, 2, 3, 4];
  const n = x.length;
  const w = math.complex(
    Math.round(math.cos((2 * pi) / n)),
    Math.round(-math.sin((2 * pi) / n))
  );
  const y = new Array(n);
  fft(x, y, n, w);
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    y[i] = math.round(y[i], 4);
    result[i] = y[i].toString();
  }
  console.log("Fast Fourier Transform Result: ");
  console.log(result);
};
