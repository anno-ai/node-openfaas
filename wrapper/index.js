const fetch = require('node-fetch')
const path = require('path')

class OpenFaasWrapper {

    constructor (provider) {
        this.provider = provider
    }

    call = (functionName, url, config = { method: 'POST' }) => { // isJson: true, isBinaryResponse: false
        const funcPath = path.join('/function', functionName)
        config.body = url
        config.encoding = (config.isBinaryResponse ? null : 'utf8')
        console.log(config)
        fetch(this.provider + funcPath, config)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                console.log(json)
            })
            .catch((e) => {
                console.log('something went wrong: ', e)
            })
    }
}

module.exports = OpenFaasWrapper