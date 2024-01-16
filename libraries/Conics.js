/*
*   P A R A B O L A S  A N D  H Y P E R B O L A S
*            I N  F I N I T E  F I E L D S
*
*    Bachelor´s Thesis
*    Filename: ConicSections.js
*    Author: Lukas Patrnciak
*    Contact: xpatrnciak@stuba.sk
*
*    This file require BasicFunctions.js
*/


/*
* Parabola in Finite Field
*/
function parabola(axis, interval, xArray, yArray, p, k, m, n) {
    var c = 0;
    k = mod(k, p);

    if(isPrime(p) == false || p == 2) {
        return -1;
    }

    if(axis == 0) {
        if(k == 0) { 
            if(interval == 0) {
                n = negativeInterval(mod(n, p), p);
            } 

            xArray[0] = 0;
            yArray[0] = n;

            c = 1;
        }

        if(k != 0) {
            for(var z = 0; z < p; z++) {
                var y = mod(z + n, p);
                var x = mod(modInverse(k, p) * z * z + m, p);
            
                if(interval == 0) {
                    y = negativeInterval(y, p);
                    x = negativeInterval(x, p);

                }

                xArray[z] = x;
                yArray[z] = y;

                c = c + 1;
            }
        }
    }

    if(axis == 1) {
        if(k == 0) { 
            if(interval == 0) {
                m = negativeInterval(mod(m, p), p);
            
            } 

            xArray[0] = m;
            yArray[0] = 0;
        
            c = 1;
        }

        if(k != 0) {
            for(var z = 0; z < p; z++) {
                var x = mod(z + m, p);
                var y = mod(modInverse(k, p) * z * z + n, p);

                if(interval == 0) {
                    y = negativeInterval(y, p);
                    x = negativeInterval(x, p);
                }
                        
                xArray[z] = x; 
                yArray[z] = y;

                c = c + 1;
            }
        }
    }

    return c;
}


/*
* Hyperbola in Finite Field
*/
function hyperbola(axis, interval, xArray, yArray, p, u, a, b, m, n) {
    var c = 0;
    u = mod(u, p);
    a = mod(a, p);
    b = mod(b, p);

    if(isPrime(p) == false || p == 2) {
        return -1;
    }

    if(a == 0 || b == 0) {
        return -2;
    }

    if(axis == 0) {
        if(u != 0) {
            for(var t = 1; t < p; t++) {
                var x = mod(modInverse(2 * a, p) * (t - u * (a * a) * (b * b) * modInverse(t, p)) + m, p);
                var y = mod(modInverse(2 * b, p) * (t + u * (a * a) * (b * b) * modInverse(t, p)) + n, p);

                if(interval == 0) {
                    x = negativeInterval(x, p);
                    y = negativeInterval(y, p);
                }

                xArray[c] = x;
                yArray[c] = y;

                c = c + 1;
            }
        }

        if(u == 0) {
            for(var t = 1; t < 2*p; t++) {    
                // Ends at (p, p) -> (0 mod p, 0 mod p)
                if(interval == 0) {
                    xArray[c] = negativeInterval(mod(modInverse(a, p) * t + m, p), p);  
                    yArray[c] = negativeInterval(mod(modInverse(b, p) * t + n, p), p);
                
                } else {
                    xArray[c] = mod(modInverse(a, p) * t + m, p);  
                    yArray[c] = mod(modInverse(b, p) * t + n, p);
                }

                if(t > p) { // Starts at p + 1
                    if(interval == 0) {
                        xArray[c] = negativeInterval(mod(modInverse(a, p) * t + m, p), p);
                        yArray[c] = negativeInterval(mod((p - modInverse(b, p) * t) + n, p), p);
                    } else {
                        xArray[c] = mod(modInverse(a, p) * t + m, p);
                        yArray[c] = mod((p - modInverse(b, p) * t) + n, p);                    
                    }
                }

                c = c + 1;
            }
        }
    }

    if(axis == 1) {
        if(u != 0) {
            for(var t = 1; t < p; t++) {
                var x = mod(modInverse(2 * b, p) * (t + u * (a * a) * (b * b) * modInverse(t, p)) + m, p);
                var y = mod(modInverse(2 * a, p) * (t - u * (a * a) * (b * b) * modInverse(t, p)) + n, p);

                if(interval == 0) {
                    x = negativeInterval(x, p);
                    y = negativeInterval(y, p);
                }

                xArray[c] = x;
                yArray[c] = y;
            
                c = c + 1;
            }
        } 
        
        if(u == 0) {
            for(var t = 1; t < 2*p; t++) {    
                // Ends at (p, p) -> (0 mod p, 0 mod p)
                if(interval == 0) {
                    xArray[c] = negativeInterval(mod(modInverse(b, p) * t + m, p), p);  
                    yArray[c] = negativeInterval(mod(modInverse(a, p) * t + n, p), p);

                } else {    
                    xArray[c] = mod(modInverse(b, p) * t + m, p);  
                    yArray[c] = mod(modInverse(a, p) * t + n, p);
                }

                if(t > p) { // Starts at p + 1
                    if(interval == 0) {
                        xArray[c] = negativeInterval(mod((p - modInverse(b, p) * t) + m, p), p);
                        yArray[c] = negativeInterval(mod(modInverse(a, p) * t + n, p), p);

                    } else {
                        xArray[c] = mod((p - modInverse(b, p) * t) + m, p);
                        yArray[c] = mod(modInverse(a, p) * t + n, p);
                    }
                }

                c = c + 1;
            }
        }
    }

    return c;
}


/*
* General Forms of Conic Sections in Finite Fields
*/
function conics(params, interval, xArray, yArray, p, a, b, c, d, e) {
    var conicSection = 0;
    var plotsCount = 0;

    if(isPrime(p) == false || p == 2) {
        return [-1, 0];
    }

    // Circle and Hyperbola Equation
    var circleCondition = mod(c*c + d*d - 4*e, p);
    var elipsaCondition = mod(b*(c*c) + a*(d*d) - 4*a*b*e, p);
    
    if((mod(a, p) != 0 && mod(b, p) == 0 && mod(d, p) != 0) || (mod(a, p) == 0 && mod(b, p) != 0 && mod(c, p) != 0)) {
        a = mod(a, p);
        b = mod(b, p);
        c = mod(c, p);
        d = mod(d, p);
        e = mod(e, p);
        
        if(mod(a, p) != 0) {
            conicSection = 11;
            
            var m = mod((-1) * c * modInverse(2 * a, p), p);
            var n = mod(modInverse(4 * a * d, p) * (c * c - 4 * a * e), p);
            var k = mod((-1) * d * modInverse(a, p), p);
            var parabolaCount = parabola(1, interval, xArray, yArray, p, 1, 0, 0);

            for(var i = 0; i < parabolaCount; i++) {
                xArray[i] = mod(xArray[i] + m, p);
                yArray[i] = mod(yArray[i] * modInverse(k, p) + n, p);

                if(interval == 0) {
                    xArray[i] = negativeInterval(xArray[i], p);
                    yArray[i] = negativeInterval(yArray[i], p);
                }
            } 
        }

        if(mod(b, p) != 0) {
            conicSection = 12;

            var n = mod((-1) * d * modInverse(2 * b, p), p);
            var m = mod(modInverse(4 * c * b, p) * (d * d - 4 * b * e) , p);
            var k = mod((-1) * c * modInverse(b, p), p);
            var parabolaCount = parabola(0, interval, xArray, yArray, p, 1, 0, 0);

            for(var i = 0; i < parabolaCount; i++) {
                xArray[i] = mod(xArray[i] * modInverse(k, p) + m, p);
                yArray[i] = mod(yArray[i] + n, p);

                if(interval == 0) {
                    xArray[i] = negativeInterval(xArray[i], p);
                    yArray[i] = negativeInterval(yArray[i], p);
                }
            }
        }

        plotsCount = parabolaCount;

        params[0] = k;
        params[1] = m;
        params[2] = n;
    
    } else if(a*b < 0 && b < 0 && mod(a, p) != 0 && mod(b, p) != 0) {  
        conicSection = 21;
        a = mod(a, p);
        b = mod(-1 * b, p);
        c = mod(c, p);
        d = mod(d, p);
        e = mod(e, p);

        var mHyp = mod(-c * modInverse(2 * a, p), p);
        var nHyp = mod(d * modInverse(2 * b, p), p); 
        var a2 = mod(modInverse(a, p), p); 
        var b2 = mod(modInverse(b, p), p);
	var uHyp = mod(((b * (c * c)) - (a * (d * d)) - (4 * a * b * e)) * modInverse(4 * a * b, p), p); 
    
        if(legendreSymbol(a2, p) != 1 || legendreSymbol(b2, p) != 1) {
            return [-2, -1];
        }
    
        var aHyp = squareRoot(a2, p);
        var bHyp = squareRoot(b2, p);
        var hyperbolaCount = hyperbola(1, interval, xArray, yArray, p, uHyp, 1, 1, 0, 0);
    
        for(var i = 0; i < hyperbolaCount; i++) {
            xArray[i] = mod(aHyp * xArray[i] + mHyp, p);
            yArray[i] = mod(bHyp * yArray[i] + nHyp, p);
            
            if(interval == 0) {
                xArray[i] = negativeInterval(xArray[i], p);
                yArray[i] = negativeInterval(yArray[i], p);
            }
        }

        params[0] = aHyp;
        params[1] = bHyp;
        params[2] = mHyp;
        params[3] = nHyp;
	params[4] = uHyp;
    
        plotsCount = hyperbolaCount;
    
    } else if(a*b < 0 && a < 0 && mod(a, p) != 0 && mod(b, p) != 0) {  
        conicSection = 22;
        a = mod(-1 * a, p);
        b = mod(b, p);
        c = mod(c, p);
        d = mod(d, p);
        e = mod(e, p);

        var mHyp = mod(c * modInverse(2 * a, p), p);
        var nHyp = mod(-d * modInverse(2 * b, p), p); 
        var b2 = mod(modInverse(a, p), p); 
        var a2 = mod(modInverse(b, p), p);
	var uHyp = mod(((a * (d * d)) - (b * (c * c)) - (4 * a * b * e)) * modInverse(4 * a * b, p), p);
    
        if(legendreSymbol(a2, p) != 1 || legendreSymbol(b2, p) != 1) {
            return [-2, -2];
        }
    
        var aHyp = squareRoot(a2, p);
        var bHyp = squareRoot(b2, p);
        var hyperbolaCount = hyperbola(0, interval, xArray, yArray, p, uHyp, 1, 1, 0, 0);
    
        for(var i = 0; i < hyperbolaCount; i++) {
            xArray[i] = mod(bHyp * xArray[i] + mHyp, p);
            yArray[i] = mod(aHyp * yArray[i] + nHyp, p);
                
            if(interval == 0) {
                xArray[i] = negativeInterval(xArray[i], p);
                yArray[i] = negativeInterval(yArray[i], p);
            }
        }
    
        params[0] = aHyp;
        params[1] = bHyp;
        params[2] = mHyp;
        params[3] = nHyp;
   	params[4] = uHyp;

        plotsCount = hyperbolaCount;

    } else if(mod(a, p) == mod(b, p) && mod(a, p) != 0 && mod(b, p) != 0 && circleCondition != 0) {
        conicSection = 3;
        plotsCount = 0; 

    } else if(a*b > 0 && mod(a, p) != 0 && mod(b, p) != 0 && elipsaCondition != 0) { 
        conicSection = 4;
        plotsCount = 0;

    
    } else {
        return [-3, 0];
    }
    
    return [conicSection, plotsCount];
}