import * as math from "mathjs";
const x = math.parse("x");

export const rectangleFormula = () => {
  const f = math.parse("sin(x)");
  const a = 1;
  const b = 2;
  const n = 10;
  const h = (b - a) / n;
  let t = 0;
  for (let i = 0; i < n; i++) {
    t += f.evaluate({ x: a + i * h + h / 2 });
  }
  const result = t * h;
  console.log("Integral: " + result);
};

export const trapezoidalFormula = () => {
  const f = math.parse("sin(x)");
  const df = math.derivative(f, x);
  const df2 = math.derivative(df, x);

  const a = 1;
  const b = 2;
  const n = 10;
  const h = (b - a) / n;
  let t = 0;
  for (let i = 1; i < n; i++) {
    t += f.evaluate({ x: a + i * h });
  }
  t += f.evaluate({ x: a }) / 2;
  t += f.evaluate({ x: b }) / 2;
  const result = t * h;
  const errorNumber = ((a - b) * h * h * df2.evaluate({ x: a + h })) / 12;
  console.log("Integral: " + result);
  console.log("Precision: " + errorNumber);
};

export const simpsonFormula = () => {
  const f = math.parse("sin(x)");
  const df = math.derivative(f, x);
  const df2 = math.derivative(df, x);
  const df3 = math.derivative(df2, x);
  const df4 = math.derivative(df3, x);

  const a = 1;
  const b = 2;
  const n = 10;
  const m = 2 * n;
  const h = (b - a) / m;
  let t = 0;
  for (let i = 1; i < m; i++) {
    if (i % 2 === 1) {
      t += 4 * f.evaluate({ x: a + i * h });
    } else {
      t += 2 * f.evaluate({ x: a + i * h });
    }
  }
  t += f.evaluate({ x: a });
  t += f.evaluate({ x: b });
  const result = (t * h) / 3;
  const errorNumber =
    -((b - a) * h * h * h * h * df4.evaluate({ x: a + h })) / 180;
  console.log("Integral: " + result);
  console.log("Precision: " + errorNumber);
};
