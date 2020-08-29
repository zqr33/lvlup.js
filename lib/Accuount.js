const _ = require('.')
const errorHandler = require('../util/errorHandler')

class Account {
    constructor({http}) {
        this.http = http
    }

    async logs() {
        try {
            const res = await this.http({
                url: '/v4/me/logs'
            })
            return res.data
        } catch (err) {
            errorHandler(err)
        }
    }
}

module.exports = Account