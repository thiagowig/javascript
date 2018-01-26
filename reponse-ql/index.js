

var objectql = require('objectql')

var source = {
    name: 'Thiago Fonseca',
    role: 'Developer',
    salary: 1.50
}

var query = {
    name: true
}

console.log(objectql(source, query))