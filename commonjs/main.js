const aaa = require('./aaa')
const bbb = require('./bbb')
console.log('aa',aaa)
console.log('bb',bbb)
// aaa.name = 'changeaa' 
console.log('firsta',aaa.age)

setTimeout(()=>{
    aaa.age = 40
    console.log('seconda', aaa.age)
    // console.log('seconda22', aaa.age)
  },2000)

console.log('firstb',bbb.name)
setTimeout(()=>{
  console.log('secondb', bbb.name)
},2000)
