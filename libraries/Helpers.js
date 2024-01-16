/*
*   P A R A B O L A S  A N D  H Y P E R B O L A S
*            I N  F I N I T E  F I E L D S
*
*    Bachelor´s Thesis
*    Filename: BasicFunctions.js
*    Author: Lukas Patrnciak
*    Contact: xpatrnciak@stuba.sk
*/


/*
* Web Page
*/
function responsiveMenu(x) {
    var navigation = document.getElementById("navigationId");
    x.classList.toggle("change");

    if (navigation.className == "navigation") {
        navigation.className += " responsive";

    } else {
        navigation.className = "navigation";
    }
}


/*
* Chart.js
*/
function updateChart(chart, xArray, yArray, interval, p, c) {
    var xyValuesUpdate = [];

    for (var i = 0; i < c; i++) {
        xyValuesUpdate[i] = {x: xArray[i], y: yArray[i]};
    }

    chart.data.datasets[0].data = xyValuesUpdate;

    if(interval == 0) {
        chart.options.scales.yAxes[0].ticks.min = -((p - 1) / 2);
        chart.options.scales.xAxes[0].ticks.min = -((p - 1) / 2);

        chart.options.scales.yAxes[0].ticks.max = (p - 1) / 2;
        chart.options.scales.xAxes[0].ticks.max = (p - 1) / 2;
    
    } else {
        chart.options.scales.yAxes[0].ticks.min = 0;
        chart.options.scales.xAxes[0].ticks.min = 0;

        chart.options.scales.yAxes[0].ticks.max = p - 1;
        chart.options.scales.xAxes[0].ticks.max = p - 1;        
    }

    chart.update();
}


/*
* Basic Functions
*/
function mod(a, p) {
  return (a % p + p) % p;
}

function isPrime(p) {
    var isDivisible = true;

    if(p < 2) {
        return false;
    }

    for(var i = 2; i <= p / 2; i++) {
        if(mod(p, i) == 0) {
            isDivisible = false;

            break;
        }
    }

    return isDivisible;
} 

function modPower(a, n, p) {
    var w;
    
    if(a == 0) {
        return 0;
    } 
    
    if(n == 0) {
        return 1;
    }
    
    if(mod(n, 2) == 0) {
        w = modPower(a, n/2, p);
        w = mod(w * w, p);
        
    } else {
        w = mod(a, p);
        w = mod(w * modPower(a, n-1, p), p);
    }
     
    return mod(w + p, p);
}

function modInverse(a, p) {
    if(isPrime(p) == false) {
    	return -1;
    }

    return modPower(a, p - 2, p);
}

function negativeInterval(a, p) {
	if (a > (p - 1) / 2) {
		a = a - p;
	}

	return a;
}

function legendreSymbol(a, p) {
    if(isPrime(p) == false) {
        return -2;
    }

    var ls = modPower(a, (p - 1) / 2, p);

    if(ls == p - 1) {
        return ls - p;
    } else {
        return ls;
    }
}

function squareRoot(a, p) {
    if(legendreSymbol(a, p) != 1) {
        return 0;

    } else if(a == 0) {
        return 0;

    } else if(p == 2) {
        return -1;

    } else if(mod(p, 4) == 3) {
        return modPower(a, (p + 1) / 4, p);
    }

    var w = p - 1;
    var s = 0;

    while(mod(w, 2) == 0) {
        w = w / 2;
        s += 1;
    }

    var n = 2;

    while(legendreSymbol(n, p) != -1) {
        n += 1;
    }

    var x = modPower(a, (w + 1) / 2, p);
    var b = modPower(a, w, p);
    var g = modPower(n, w, p);
    var r = s;

    while(true) {
        var t = b;
        var m = 0;

        for(m = 0; m < r; m++) {
            if(t == 1) {
                break;
            }

            t = modPower(t, 2, p);
        }

        if(m == 0) {
            return x;
        }

        var gs = modPower(g, 2 ** (r - m - 1), p);
        g = mod((gs * gs), p);
        x = mod((x * gs), p);
        b = mod((b * g), p);
        r = m;
    }
}