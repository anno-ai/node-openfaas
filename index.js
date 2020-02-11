const fetch = require('node-fetch')
const path = require('path')

class OpenFaas{

    constructor (provider) {
        this.provider = provider
    }

    /**
     * function to execute an openfaas function held at the provider location
     * @param {string} functionName - the name of the function
     * @param {string} params - the query string or url to pass as request body
     * @param {object} config - http request configuration 
     */
    call = async (functionName, params, config = { method: 'POST' }) => { // isJson: true, isBinaryResponse: false
        try {
            const funcPath = path.join('/function', functionName)
            config.body = params
            config.encoding = (config.isBinaryResponse ? null : 'utf8')
            const response = await fetch(this.provider + funcPath, config)
            const json = await response.json()
            return json
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = OpenFaas