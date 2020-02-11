# node-openfaas
`A helper method used to call openfaas functions.`

# usage
```
const OpenFaasWrapper = require('./wrapper')

const faas = new OpenFaasWrapper(http://localhost:8080)
faas.call('functionName', 'https://webpage/image.jpg')}
```
