const OpenFaas = require('./index.js')
const faas = new OpenFaas('http://localhost:8080')
faas.call('functionName', { param: 1})
  .then((res) => {
    console.log(res)
  })
