const OpenFaas = require('./index.js')

const faas = new OpenFaas('http://127.0.0.1:8080/')

const data = JSON.stringify({ data: '' })

faas.call('functionName', data)
  .then((res) => {
    return res.data
  })
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })


faas.testRetry('functionName')
  .then((res) => {
    return res.data
  })
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
