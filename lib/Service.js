const _ = require('.')
const errorHandler = require("../util/errorHandler");

class Service {
    constructor({ http }, id, { status, vmUptimeS}) {
        this.id = id
        this.http = http
        this.status = status
        this.vmUptimeS = vmUptimeS
    }
    async stats() {
        try {
            const res = await this.http({
                url: `/v4/services/vps/${this.id}/stats`
            })
            return res.data
        } catch (err) {
            console.error(err)
            errorHandler(err)
        }
    }
}

module.exports = Service