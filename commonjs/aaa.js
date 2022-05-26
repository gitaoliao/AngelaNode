const aaa = require('./ccc')
let name = 'aaa'
let age = 12
console.log('aaname', name)

// setTimeout(
//     () => {
//         module.exports = {
//             name,
//             age: 40
//         }
//     }
//     , 1000)


module.exports = {
    name,
    age
}



