import {Service, ServiceStatus, Proxmox,  AttacksList} from "../../declarations";
import {AxiosInstance} from "axios";
import serviceTypes from '../constants/service-types'
import Filtering from "./service/Filtering";

class ServiceClass {
    readonly #http: AxiosInstance
    public id: number
    public serviceId: number
    public serviceType: string
    public ip: string
    public name: string
    public nodeId: number
    public createdAt: Date
    public active: boolean
    public payedTo: Date
    public planName: string
    public filtering: Filtering
    constructor(service: Service, http: AxiosInstance) {
        this.#http = http

        this.id = service.id
        this.serviceId = service.serviceId
        this.serviceType = serviceTypes[service.serviceId]
        this.ip = service.ip
        this.name = service.name
        this.nodeId = service.nodeId
        this.createdAt = new Date(service.createdAt)
        this.active = service.active
        this.payedTo = new Date(service.payedTo)
        this.planName = service.planName
        this.filtering = new Filtering(service.id, this.#http)
    }

    async stats(): Promise<ServiceStatus> {
        try{
            const { data } = await this.#http({
                url: `/services/vps/${this.id}/stats`
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

    async stop(): Promise<void> {
        try{
            await this.#http({
                url: `/services/vps/${this.id}/stop`,
                method: "POST"
            })
        }catch (e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }

    async start(): Promise<void> {
        try{
            await this.#http({
                url: `/services/vps/${this.id}/start`,
                method: "POST"
            })
        }catch (e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }

    async proxmox(): Promise<Proxmox> {
        try {
            const { data } = await this.#http({
                url: `/services/vps/${this.id}/proxmox`,
                method: "POST"
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

    async attacks(limit: number|undefined): Promise<AttacksList> {
        try{
            const { data } = await this.#http({
                url: `/services/vps/${this.id}/attacks`,
                params: {
                    limit
                }
            })
            return data
        }catch(e) {
            if(e.response.data) {
                throw new Error(e.response.data.msg)
            } else {
                throw new Error(e)
            }
        }
    }

}

export default ServiceClass