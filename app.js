const OpenFaasWrapper = require('./index')
    
const faas = new OpenFaasWrapper('http://localhost:8080')

faas.call('openalpr', 'https://cdn.images.express.co.uk/img/dynamic/24/590x/DVLA-number-plates-2017-67-new-car-847566.jpg')
    .then((data) => {
        console.log(data)
    })