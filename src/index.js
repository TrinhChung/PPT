import {
  newtonMethod,
  secantMethod,
  falsePositionMethod,
} from "./method/iterativeMethod.js";
import { gaussMethod, luMethod } from "./method/matrix.js";
import { jacobiMethod, seidelMethod } from "./method/iterativeMatrix.js";
import {
  interpolationLagrangeCalculate,
  interpolationNewtonMethod,
} from "./method/interpolation.js";

interpolationNewtonMethod();
