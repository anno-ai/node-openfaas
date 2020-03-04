const axios = require('axios')
const urljoin = require('url-join');
const get = require('lodash/get')
const merge = require('lodash/merge')
const pRetry = require('p-retry')

class OpenFaasError extends Error {
  constructor (statusCode, message, response) {
    super(message)
    // Set the error name as the class name
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.response = response
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor)
  }
}

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
     * @param {string} params - the object to pass as request body
     * @param {object} config - request override configuration 
     */
    call (functionName, params = {}, config = {}) {
      config = merge({}, {
        data: params,
        headers: { 'Content-Type': (config.type ? config.type : 'application/json') },
        url: urljoin(this.provider, 'function', functionName ),
        method: 'POST',
        timeout: 60000
      }, config)

      return axios(config)
        .then((res) => {
          const statusCode = get(res, 'data.statusCode')
          const message = get(res, 'data.message')
          if (statusCode && message) {
            throw new OpenFaasError(statusCode, message, res)
          }
          return res
        })
    }

    test (functionName, params = {}, config = {}) {
      config = merge({}, {
        data: params,
        headers: { 'Content-Type': (config.type ? config.type : 'application/json') },
        url: urljoin(this.provider, 'function', functionName ),
        method: 'GET',
        timeout: 500, // Request timeout
        validateStatus: function (status) {
          return (status >= 200 && status < 300)
        }
      }, config)

      // Set an axios cancel token
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      // Cancel the request if more than timeout
      setTimeout(() => {
        source.cancel();
      }, config.timeout + 1000);

      return axios({...config, ...{ cancelToken: source.token }})
      .catch(err => {
        // Catch for if the server does not respond (longer than request timeout)
        if(axios.isCancel(err)) {
          throw new Error(`Unable to establish a connection. Are you connected to the right network? Check: ${config.url}`)
        }
        throw err
      })
    }

    testRetry (functionName, params = {}, config = {}, numRetries = 3) {
      return pRetry(() => this.test(functionName, params, config), { retries: numRetries })
    }
}

module.exports = OpenFaas

