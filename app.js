const OpenFaas = require('./index.js')

const faas = new OpenFaas('http://127.0.0.1:8080/')

const data = JSON.stringify({ data: '' })

faas.call('functionName', data, { type: 'application/json' })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })


faas.testRetry('functionName', 5)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })