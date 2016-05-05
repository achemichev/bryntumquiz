/**
 * Created by achemichev on 15.01.2016.
 */


/**
 *
 * 14.    You are given an input array of the intervals on the number axis. For each interval a start point,
 * end point and some “value” is known. Write a function in pure JavaScript, that will transform the input
 * array to another array of the objects with the same structure. Function should sum the “values” of all
 * intersecting intervals and include in the result all intervals with different sum of “values”.
 *
 * See the examples of input and expected output.
 * Note, that start and end point coordinates may have fractional part.
 *
 */

var _ = require("underscore");

var cases = [];

var input = [{
    start: 1, end: 2,
    value: 1
}, {
    start: 2, end: 3,
    value: 1
}];

var output = [{
    start: 1, end: 3,
    value: 1
}];

cases[0] = {inp: input, out: output};

////////////////////////////////////////////////

input = [{
    start: 1, end: 3,
    value: 1
}, {
    start: 2, end: 4,
    value: 1
}];

output = [{
    start: 1, end: 2,
    value: 1
}, {
    start: 2, end: 3,
    value: 2
}, {
    start: 3, end: 4,
    value: 1
}];

cases[1] = {inp: input, out: output};

////////////////////////////////////////////////

input = [{
    start: 1, end: 3,
    value: 1
}, {
    start: 2, end: 4,
    value: 1
}, {
    start: 2, end: 5,
    value: 2
}, {
    start: 4, end: 5,
    value: 1
}];


output = [{
    start: 1, end: 2,
    value: 1
}, {
    start: 2, end: 3,
    value: 4
}, {
    start: 3, end: 5,
    value: 3
}]

cases[2] = {inp: input, out: output};

////////////////////////////////////////////////

input = [{
    start: 1, end: 3,
    value: 0
}, {
    start: 2, end: 4,
    value: 0
}];

output = [{
    start: 1, end: 4,
    value: 0
}];

cases[3] = {inp: input, out: output};

////////////////////////////////////////////////


input = [{
    start: 1, end: 3,
    value: 1
}, {
    start: 2, end: 5,
    value: 2
}, {
    start: 2, end: 4,
    value: 1
}, {
    start: 4, end: 5,
    value: 1
}];


output = [{
    start: 1, end: 2,
    value: 1
}, {
    start: 2, end: 3,
    value: 4
}, {
    start: 3, end: 5,
    value: 3
}];

cases[4] = {inp: input, out: output};

////////////////////////////////////////////////

input = [{
    start: 1, end: 2,
    value: 1
}, {
    start: 2, end: 3,
    value: 2
}];

output = [{
    start: 1, end: 2,
    value: 1
}, {
    start: 2, end: 3,
    value: 2
}];

cases[5] = {inp: input, out: output};

////////////////////////////////////////////////

input = [{
    start: 1, end: 6,
    value: 1
}, {
    start: 2, end: 5,
    value: 1
}, {
    start: 3, end: 4,
    value: 1
}];

output = [{
    start: 1, end: 2,
    value: 1
}, {
    start: 2, end: 3,
    value: 2
}, {
    start: 3, end: 4,
    value: 3
}, {
    start: 4, end: 5,
    value: 2
}, {
    start: 5, end: 6,
    value: 1
}];

cases[6] = {inp: input, out: output};

////////////////////////////////////////////////

input = [{
    start: 1, end: 6,
    value: 1
}, {
    start: 1, end: 2,
    value: 1
}, {
    start: 1, end: 3,
    value: 1
}, {
    start: 1, end: 1,
    value: 1
}];

output = [{
    start: 1, end: 2,
    value: 3
}, {
    start: 2, end: 3,
    value: 2
}, {
    start: 3, end: 6,
    value: 1
}];

cases[7] = {inp: input, out: output};

////////////////////////////////////////////////

input = [{
    start: 1, end: 6,
    value: 1
}, {
    start: 5, end: 6,
    value: 1
}, {
    start: 4, end: 6,
    value: 1
}, {
    start: 3, end: 6,
    value: 1
}];

output = [{
    start: 1, end: 3,
    value: 1
}, {
    start: 3, end: 4,
    value: 2
}, {
    start: 4, end: 5,
    value: 3
}, {
    start: 5, end: 6,
    value: 4
}];

cases[8] = {inp: input, out: output};

////////////////////////////////////////////////

function transform(input) {

    if (input === undefined) return [];
    if (input[0] === undefined) return [];
    if (input.length === 1) return input;

    const EPS = 1e-8;

    function floatgt(p, q) {
        return (parseFloat(p) - parseFloat(q) > EPS);
    }

    function floatlt(p, q) {
        return (parseFloat(p) - parseFloat(q) < -EPS);
    }

    function floateq(p, q) {
        return (Math.abs(parseFloat(p) - parseFloat(q)) < EPS);
    }

    //function floateq0(p) { return (Math.abs(parseFloat(p)) < EPS); }
    function floatmax(p, q) {
        return floatgt(p, q) ? p : q;
    }

    function floatmin(p, q) {
        return floatlt(p, q) ? p : q;
    }

    var a = JSON.parse(JSON.stringify(input));
    a.sort(function (p, q) {
        return floateq(p.start, q.start) ?
            floatgt(p.end, q.end) :
            floatgt(p.start, q.start);
    });

    //console.log("Input of transform:\n", input);
    //console.log("Sorted input:\n", a);

    var i, k;
    var t;

    for (i = 0; i < a.length - 1; i++)
        if (floateq(a[i].start, a[i].end)) {
            a.splice(i, 1);
            i--;
            if (i >= 0) i--;
        }
        else if (floateq(a[i + 1].start, a[i + 1].end)) {
            a.splice(i + 1, 1);
            i--;
        }
        else if (floateq(a[i].end, a[i + 1].start) &&
            (floateq(a[i].value, a[i + 1].value))) {
            a[i].end = a[i + 1].end;
            a.splice(i + 1, 1);
            i--;
        }
        else if (floatgt(a[i].end, a[i + 1].start)) {
            t = {
                start: floatmin(a[i].end, a[i + 1].end),
                end: floatmax(a[i].end, a[i + 1].end),
                value: floatgt(a[i].end, a[i + 1].end) ?
                    a[i].value :
                    a[i + 1].value
            };
            a[i].end = a[i + 1].start;
            a[i + 1].end = t.start;
            a[i + 1].value += a[i].value;
            k = i + 2;
            for (; k < a.length; k++)
                if (floateq(a[k].start, t.start) &&
                    floatgt(a[k].end, t.end))
                    break;
                else if (floatgt(a[k].start, t.start)) break;
            a.splice(k, 0, t);
            i--;
        }

    //console.log("Output of transform:\n", a);
    return a; // output

}// transform()

cases.forEach(function (c, index) {

        if (index === 2)
            var iii = 0;
        var output = transform(c.inp);
        console.log("Expected output:\n", c.out);

        var caseresult = _.isEqual(output, c.out)
        console.log("Case ", index, " result = ", caseresult);
        if (!caseresult) throw "Case failed..."
    }
);