import {AxiosInstance} from "axios";
import {Whitelist as WhitelistData, WhitelistAdd} from '../../../declarations'

class Whitelist {
    readonly #id: number
    readonly #http: AxiosInstance
    constructor(id: number, http: AxiosInstance) {
        this.#id = id
        this.#http = http
    }

    async list(): Promise<WhitelistData[]> {
        try{
            const { data } = await this.#http({
                url: `/services/vps/${this.#id}/filtering/whitelist`
            })
            return data
        }catch (e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }

    async add(data: WhitelistAdd): Promise<void> {
        if(typeof data.ports.to !== 'number' || typeof data.ports.from !== 'number') throw new Error("bad numbers type")
        if(data.ports.to > 65535 || data.ports.to < 1) throw new Error("invalid number")
        if(data.ports.from > 65535 || data.ports.from < 1) throw new Error("invalid number")
        if(!data.protocol) throw new Error("protocol type is required")
        try {
            await this.#http({
                url: `/services/vps/${this.#id}/filtering/whitelist`,
                method: "POST",
                data
            })
        }catch (e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }
    async remove(id: number): Promise<void> {
        if(!id) throw new Error('whitelist id is required')
        try{
            await this.#http({
                url: `/services/vps/${this.#id}/filtering/whitelist/${id}`,
                method: 'delete'
            })
        }catch (e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }
}

export default Whitelist