const {default: axios} = require('axios')
const Services = require('./Services')
const errorHandler = require('../util/errorHandler')
const Account = require('./Accuount')

class Lvlup {
    constructor(object) {
        this.token = object.token
        if(object.sandbox) {
            this.url = 'https://api.sandbox.lvlup.pro'
        } else {
            this.url = 'https://api.lvlup.pro'
        }
        this.http = axios.create({
            baseURL: this.url,
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
        this.services = new Services(this)
        this.account = new Account(this)
    }
    async getAccountData() {
        try {
            const res = await this.http({
                method: 'GET',
                url: "/v4/me"
            })
            return res.data
        } catch (err) {
            return errorHandler(err)
        }
    }

    async getAccountLogs() {
        try {
            const res = await this.http({
                method: 'GET',
                url: "/v4/me/log"
            })
            return res.data
        } catch (err) {
            errorHandler(err)
        }
    }
}

module.exports = Lvlup