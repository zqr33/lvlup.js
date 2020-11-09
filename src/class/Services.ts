import Lvlup from "../index";
import {AxiosInstance} from "axios";
import { Service } from '../../declarations'
import serviceTypes from '../constants/service-types'
import ServiceClass from './Service'

class Services {
    private readonly http: AxiosInstance
    constructor({http}: Lvlup) {
        this.http = http
    }

    async list(): Promise<ServiceClass[]|null> {
        try{
            const { data } = await this.http({
                url: '/services'
            })
            const services: ServiceClass[] = data.services.map((s: Service) => new ServiceClass(s, this.http))
            return services
        }catch (e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
            return null
        }
    }
    async get(id: string|number|undefined): Promise<ServiceClass|null> {
        if(!id) throw new Error('id is required')
        try {
            const list = await this.list()
            if(!list || !list.length) throw new Error('no services')
            const service = list.find(s => s.id == id)
            if(!service) throw new Error('service not found')
            return new ServiceClass(service, this.http)
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

export default Services