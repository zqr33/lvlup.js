import { AxiosInstance } from 'axios'
import {Filtering} from "../../declarations";

class ServiceFiltering {
    readonly #id: number
    readonly #http: AxiosInstance
    constructor(id: number, http: AxiosInstance) {
        this.#id = id
        this.#http = http
    }
    async fetch(): Promise<Filtering> {
        try {
            const { data } = await this.#http({
                url: `/services/vps/${this.#id}/filtering`
            })
            return data
        } catch(e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
        }
    }

    async set(value: boolean|undefined): Promise<Filtering> {
        try{
            const { data } = await this.#http({
                url: `/services/vps/${this.#id}/filtering`,
                method: "PUT",
                data: {
                    filteringEnabled: !!value
                }
            })
            return data
        }catch (e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
        }
    }

}

export default ServiceFiltering