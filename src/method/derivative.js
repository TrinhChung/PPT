import * as math from "mathjs";
const x = math.parse("x");

export const ThreeEndPoint = () => {
  const f = math.parse("sin(x)");
  const df = math.derivative(f, x);
  const df2 = math.derivative(df, x);
  const df3 = math.derivative(df2, x);
  const x0 = 0.5;
  const h = 0.1;
  const n = 3;
  const xj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    xj[i] = x0 + h * i;
  }

  const dfj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    dfj[i] =
      (-3 * f.evaluate({ x: xj[i] }) +
        4 * f.evaluate({ x: xj[i] + h }) -
        f.evaluate({ x: xj[i] + 2 * h })) /
        (2 * h) +
      (h * h * df3.evaluate({ x: xj[0] + h })) / 3;
  }
  console.log(dfj);
};

export const ThreeMidPoint = () => {
  const f = math.parse("sin(x)");
  const df = math.derivative(f, x);
  const df2 = math.derivative(df, x);
  const df3 = math.derivative(df2, x);
  const x0 = 0.5;
  const h = 0.1;
  const n = 3;
  const xj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    xj[i] = x0 + h * i;
  }
  const dfj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    dfj[i] =
      (f.evaluate({ x: xj[i] + h }) - f.evaluate({ x: xj[i] - h })) / (2 * h) -
      (h * h * df3.evaluate({ x: xj[i] })) / 6;
  }
  console.log(dfj);
};

export const FiveMidPoint = () => {
  const f = math.parse("x^4");
  const df = math.derivative(f, x);
  const df2 = math.derivative(df, x);
  const df3 = math.derivative(df2, x);
  const df4 = math.derivative(df3, x);
  const df5 = math.derivative(df4, x);

  const x0 = -1;
  const h = 0.1;
  const n = 5;
  const xj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    xj[i] = x0 + h * i;
  }
  const dfj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    dfj[i] =
      (f.evaluate({ x: xj[i] - 2 * h }) -
        8 * f.evaluate({ x: xj[i] - h }) +
        8 * f.evaluate({ x: xj[i] + h }) -
        -f.evaluate({ x: xj[i] + 2 * h })) /
        (12 * h) +
      (h * h * h * h * df5.evaluate({ x: xj[i] })) / 30;
  }
  console.log(dfj);
};

export const SecondMidPoint = () => {
  const f = math.parse("x^4");
  const df = math.derivative(f, x);
  const df2 = math.derivative(df, x);
  const df3 = math.derivative(df2, x);
  const df4 = math.derivative(df3, x);
  const x0 = -1;
  const h = 0.1;
  const n = 5;
  const xj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    xj[i] = x0 + h * i;
  }
  const fj = new Array(xj.length).fill(0);
  if (f !== null) {
    for (let i = 0; i < xj.length; i++) {
      fj[i] = f.evaluate({ x: xj[i] });
    }
  }
  const dfj = new Array(fj.length).fill(0);
  for (let i = 0; i < fj.length; i++) {
    dfj[i] =
      (f.evaluate({ x: xj[i] - h }) -
        2 * f.evaluate({ x: xj[i] }) +
        f.evaluate({ x: xj[i] + h })) /
        (h * h) -
      (h * h * df4.evaluate({ x: xj[i] })) / 12;
  }
  console.log(dfj);
};

export const ThreeEndPointVersion1 = () => {
  const f = math.parse("sin(x)");
  const df = math.derivative(f, x);
  const df2 = math.derivative(df, x);
  const df3 = math.derivative(df2, x);
  const x0 = 0.5;
  const h = 0.1;
  const n = 3;
  const xj = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    xj[i] = x0 + h * i;
  }
  const fj = [0.4794, 0.5646, 0.6442];
  const dfj = new Array(n).fill(0);
  dfj[0] = (-3 * fj[0] + 4 * fj[1] - fj[2]) / (2 * h);
  dfj[1] = (-fj[0] + fj[2]) / (2 * h);
  dfj[2] = (fj[0] - 4 * fj[1] + 3 * fj[2]) / (2 * h);
  console.log(dfj);
  console.log(
    "Sai so: " + Math.abs(h * h * df3.evaluate({ x: xj[0] + h })) / 3
  );
};
