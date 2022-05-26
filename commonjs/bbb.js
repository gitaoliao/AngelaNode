const bbb = require('./ccc')
let name = 'bbb'
let age = 40
console.log('bbname', name)
exports.name = name
exports.age = age

setTimeout(() => {
  exports.name = 'bbchangename'
}, 1000)