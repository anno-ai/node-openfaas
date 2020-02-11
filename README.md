# node-openfaas
A wrapper function to access the openfaas api from node

# usage
```
const OpenFaasWrapper = require('./wrapper')

const faas = new OpenFaasWrapper(http://localhost:8080)
faas.call('functionName', 'https://webpage/image.jpg')}
```
