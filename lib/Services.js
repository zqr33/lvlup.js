const _ = require('.')
const errorHander = require('../util/errorHandler')

const Service = require('./Service')

class Services {
    constructor({http}) {
        this.http = http
    }

    async getAll() {
        try {
            const res = await this.http({
                url: '/v4/services'
            })
            return res.data
        } catch (err) {
            errorHander(err)
        }
    }

    async get(id) {
        try {
            const {data} = await this.http({
                url: `/v4/services/vps/${id}/stats`
            })
            return new Service(this, id, data)
        } catch (err) {
            errorHander(err)
        }
    }
}

module.exports = Services