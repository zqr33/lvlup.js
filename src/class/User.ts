import Lvlup from "../index";
import {AxiosInstance} from "axios";
import {Log, Logs, User as UserInfo} from '../../declarations'
import actionTypes from '../constants/action-type'

class User {
    private readonly http: AxiosInstance
    constructor({http}: Lvlup) {
        this.http = http
    }
    async info(): Promise<UserInfo | null> {
        try {
            const { data } = await this.http({
                url: "/me"
            })
            if(data && data.createdAt) data.createdAt = new Date(data.createdAt)
            return data
        }catch (e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
            return null
        }
    }
    async logs(limit: number|undefined): Promise<Logs | null> {
        try {
            const { data } = await this.http({
                url: '/me/log',
                params: {
                    limit
                }
            })
            const mapped: Logs = data.items.map((l: Log) => ({
                id: l.id,
                ip: l.ip,
                ua: l.ua,
                serviceName: l.serviceName,
                serviceId: l.serviceId,
                action: l.action,
                actionType: actionTypes[l.action],
                value: l.value,
                valuePrev: l.valuePrev,
                ByStaff: l.ByStaff,
                createdAt: new Date(l.createdAt)
            }))
            return mapped
        }catch (e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
            return null
        }
    }
}

export default User