const fetch = require('node-fetch')
const path = require('path')

class OpenFaasWrapper {

    constructor (provider) {
        this.provider = provider
    }

    /**
     * function to execute an openfaas function held at the provider location
     * @param {string} functionName - the name of the function
     * @param {string} params - the query string or url to pass as request body
     * @param {object} config - http request configuration 
     */
    call = (functionName, params, config = { method: 'POST' }) => { // isJson: true, isBinaryResponse: false
        const funcPath = path.join('/function', functionName)
        config.body = params
        config.encoding = (config.isBinaryResponse ? null : 'utf8')
        console.log(config)
        fetch(this.provider + funcPath, config)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                console.log(json)
                return json
            })
            .catch((e) => {
                console.log('something went wrong: ', e)
            })
    }
}

module.exports = OpenFaasWrapper