# bryntumquiz

You are given an input array of the intervals on the number axis. For each interval a start point, end point and some “value” is known. Write a function in pure JavaScript, that will transform the input array to another array of the objects with the same structure. Function should sum the “values” of all intersecting intervals and include in the result all intervals with different sum of “values”. See the examples of input and expected output. Note, that start and end point coordinates may have fractional part.

var input = [{
    start       : 1,
    end         : 2,
    value       : 1
}, {
    start       : 2,
    end         : 3,
    value       : 1
}]

var output = [{
    start       : 1,
    end         : 3,
    value       : 1
}]

var input = [{
    start       : 1,
    end         : 3,
    value       : 1
}, {
    start       : 2,
    end         : 4,
    value       : 1
}]

var output = [{
    start       : 1,
    end         : 2,
    value       : 1
}, {
    start       : 2,
    end         : 3,
    value       : 2
}, {
    start       : 3,
    end         : 4,
    value       : 1
}]

var input = [{
    start       : 1,
    end         : 3,
    value       : 1
}, {
    start       : 2,
    end         : 4,
    value       : 1
}, {
    start       : 2,
    end         : 5,
    value       : 2
}, {
    start       : 4,
    end         : 5,
    value       : 1
}]

var output = [{
    start       : 1,
    end         : 2,
    value       : 1
}, {
    start       : 2,
    end         : 3,
    value       : 4
}, {
    start       : 3,
    end         : 5,
    value       : 3
}]
