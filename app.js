const OpenFaas = require('@annoai/node-openfaas')
const faas = new OpenFaas('http://localhost:8080')
const res =  await faas.call('functionName', 'https://website/image.jpg')
console.log(res)