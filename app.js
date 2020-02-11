const OpenFaasWrapper = require('./index')
const faas = new OpenFaasWrapper('http://localhost:8080')
const res =  await faas.call('functionName', 'https://website/image.jpg')
console.log(res)