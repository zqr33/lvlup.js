const _ = require('.')
const errorHandler = require("../util/errorHandler");

class Service {
    constructor({ http }, id, { status, vmUptimeS}) {
        this.id = id
        this.http = http
        this.status = status
        this.vmUptimeS = vmUptimeS
    }
    async start() {
        if(this.status === 'running') throw new Error('VPS jest już włączony')
        try {
            await this.http({
                url: `/v4/services/vps/${this.id}/start`,
                method: "POST"
            })
            return {
                message: "VPS started"
            }
        } catch (err) {
            console.error(err)
            errorHandler(err)
        }
    }
    async stop() {
        try {
            await this.http({
                url: `/v4/services/vps/${this.id}/stop`,
                method: "POST"
            })
            return {
                message: "VPS stopped"
            }
        } catch (err) {
            console.error(err)
            errorHandler(err)
        }
    }
}

module.exports = Service