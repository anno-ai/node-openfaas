const OpenFaasWrapper = require('./wrapper')

module.exports.init = function () {
    console.log('testing openfaas call')
    providerPath = 'http://localhost:8080'
    const faas = new OpenFaasWrapper(providerPath)
    faas.call('openalpr', 'https://cdn.images.express.co.uk/img/dynamic/24/590x/DVLA-number-plates-2017-67-new-car-847566.jpg')
}