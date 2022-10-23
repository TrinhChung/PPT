import org.mariuszgromada.math.mxparser.*;

public class Main {
    public static double bisectionMethodCalculate(Function f, double a, double b, int n, double minD) {
        double valueA = f.calculate(a);
        double valueB = f.calculate(b);
        if (valueA == 0) return a;
        if (valueB == 0) return b;
        if (valueA * valueB > 0) return -10000000;
        if (n == 1) return (a+b)/2;
        double av = (a+b)/2;
        double valueAv = f.calculate(av);
        if (Math.abs(av) <= minD) return av;
        if (valueA * valueAv < 0) return bisectionMethodCalculate(f, a, av, n - 1, minD);
        return bisectionMethodCalculate(f, av, b, n-1,minD);
    }

    public static void bisectionMethod(Function f) {
        int n = 3;
        double d = 0;
        double a = -2;
        double b = 1.5;
        System.out.println("Result bisection method: " + bisectionMethodCalculate(f, a, b, n, d));
    }

    public static double fixedPointIterationCalculate(Function f, double p0, double total,int n) {
        if (n == 0) return p0;
        double p = f.calculate(p0);

        if (Math.abs(p - p0) <= total) return p;
        return fixedPointIterationCalculate(f, p, total, n-1);
    }

    public static int fixedPointIterationByMinD(Function f, double p0, double total, int n) {
        double p = f.calculate(p0);
        System.out.println("p: "+p);
        if (Math.abs(p - p0) <= total) return n;
        return fixedPointIterationByMinD(f, p, total, n + 1);
    }

    public static void fixedPointIteration(Function f) {
        double p0 = 1;
        double total = Math.pow(10, -2);
        int n = 100;
        System.out.println("Fixed point Iteration method: " + fixedPointIterationCalculate(f, p0, total, n));
        System.out.println("It takes " +fixedPointIterationByMinD(f, p0, total,0) +  " times to total <= " + total);
    }
}
