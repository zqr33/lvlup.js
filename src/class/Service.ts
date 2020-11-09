import {Service, ServiceStatus} from "../../declarations";
import {AxiosInstance} from "axios";
import serviceTypes from '../constants/service-types'

class ServiceClass {
    private readonly http: AxiosInstance
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
    constructor(service: Service, http: AxiosInstance) {
        this.http = http

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
    }

    async stats(): Promise<ServiceStatus|null> {
        try{
            const { data } = await this.http({
                url: `/services/vps/${this.id}/stats`
            })
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

    async stop(): Promise<void|null> {
        try{
            await this.http({
                url: `/services/vps/${this.id}/stop`
            })
        }catch (e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
            return null
        }
    }

    async start(): Promise<void|null> {
        try{
            await this.http({
                url: `/services/vps/${this.id}/start`
            })
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

export default ServiceClass