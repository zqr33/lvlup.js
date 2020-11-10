import { AxiosInstance } from 'axios'
import {Filtering as FilteringData} from "../../../declarations";
import Whitelist from "./Whitelist";

class Filtering {
    readonly #id: number
    readonly #http: AxiosInstance
    public whitelist: Whitelist
    constructor(id: number, http: AxiosInstance) {
        this.#id = id
        this.#http = http
        this.whitelist = new Whitelist(this.#id, this.#http)
    }
    async list(): Promise<FilteringData> {
        try {
            const { data } = await this.#http({
                url: `/services/vps/${this.#id}/filtering`
            })
            return data
        } catch(e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }

    async set(value: boolean|undefined): Promise<FilteringData> {
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
            if(e.response && e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }

}

export default Filtering