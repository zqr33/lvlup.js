import axios, { AxiosInstance } from 'axios'
import {dataObject} from '../declarations'
import Payments from './class/Payments'
import User from "./class/User";

class Lvlup {
    public http: AxiosInstance
    public baseUrl: string
    public payments: Payments
    public user: User
    constructor(key: string|undefined, { sandbox }: dataObject = { sandbox: false }) {
        if(!key) throw new Error("Bad Lvlup API key")
        if(sandbox) this.baseUrl = "https://api.sandbox.lvlup.pro/v4"
        else this.baseUrl = "https://api.lvlup.pro/v4"

        const instance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: `Bearer ${key}`
            }
        })
        this.http = instance
        this.payments = new Payments(this)
        this.user = new User(this)
    }
}

export default Lvlup