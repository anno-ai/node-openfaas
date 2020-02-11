const OpenFaasWrapper = require('./index')
    
const faas = new OpenFaasWrapper('http://localhost:8080')

const res = faas.call('functionName', 'https://website.com/image.png')
console.log(res)