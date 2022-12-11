//Phương pháp Newton
import { newtonMethod } from "./method/iterativeMethod.js";

//Phương pháp dây cung
import { secantMethod } from "./method/iterativeMethod.js";

//Phương pháp điểm sai
import { falsePositionMethod } from "./method/iterativeMethod.js";

//Giải ma trận bằng phương pháp Gauss
import { gaussMethod } from "./method/matrix.js";

//Giải ma trận bằng phương pháp phân tích LU
import { luMethod } from "./method/matrix.js";

//Giải ma trận bằng phương pháp lặp Jacobi
import { jacobiMethod } from "./method/iterativeMatrix.js";

//Giải ma trận bằng phương pháp lặp Gauss-seidel
import { seidelMethod } from "./method/iterativeMatrix.js";

//Phương pháp nội suy Lagrange
import { interpolationLagrangeCalculate } from "./method/interpolation.js";

//Phương pháp nội suy Newton
import { interpolationNewtonMethod } from "./method/interpolation.js";

// 2 method java (bisectionMethod,fixedPointIteration)

//Noi suy splineS
import { splineS } from "./method/interpolation.js";

//Xap xi dao ham
import {
  ThreeEndPoint,
  ThreeMidPoint,
  SecondMidPoint,
  ThreeEndPointVersion1,
} from "./method/derivative.js";

//Xap xi tich phan
import {
  rectangleFormula,
  trapezoidalFormula,
  simpsonFormula,
} from "./method/integral.js";

//Bình phương tối thiểu
import {
  leastSquaresMethod,
  leastSquaresContinuousMethod,
} from "./method/leastSquares.js";

//Xap xi vi phan
import { eulerMethod, rungeKutta } from "./method/differentialEquation.js";

import { dftMethod, inverseDftMethod, fftMethod } from "./method/fourier.js";
dftMethod();
fftMethod();
