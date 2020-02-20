const fetch = require('node-fetch')
const urljoin = require('url-join');
const merge = require('lodash/merge')

class OpenFaas{

    constructor (provider) {
        if (!provider) {
          throw new Error('provider is required when initializing the module')
        }
        this.provider = provider
    }

    /**
     * function to execute an openfaas function held at the provider location
     * @param {string} functionName - the name of the function
     * @param {string} params - the query string or url to pass as request body
     * @param {object} config - http request configuration 
     */
    call (functionName, params, config = {}) {
      config = merge({}, {
        body: params,
        encoding: config.isBinaryResponse ? null : 'utf8',
        headers: { 'Content-Type': (config.type ? config.type : 'text/plain') },
        method: 'POST'
      }, config)

      const url = urljoin(this.provider, 'function', functionName )

      return fetch(url, config)
    }
}

module.exports = OpenFaas
