import Lvlup from "../index";
import {AxiosInstance} from "axios";
import {Payment, paymentCreated, PaymentsList, Wallet, WalletTopUp} from "../../declarations";
import paymentsType from '../constants/payments-type'
import serviceTypes from '../constants/service-types'
import validUrl from 'valid-url'

class Payments {
    private readonly http: AxiosInstance
    constructor({ http }: Lvlup) {
        this.http = http
    }
    async list(limit: number|undefined): Promise<PaymentsList|undefined> {
        try {
            const { data } = await this.http({
                url: '/payments',
                params: {
                    limit
                }
            })
            const mapped: PaymentsList = data.items.map((i: Payment) => ({
                id: i.id,
                methodId: i.methodId,
                method: paymentsType[i.methodId],
                serviceId: i.serviceId,
                serviceType: serviceTypes[i.serviceId],
                amount: Number(i.amount),
                description: i.description,
                createdAt: new Date(i.createdAt)
            }))
            return mapped
        }catch (e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
        }
    }

    async get(id: string): Promise<WalletTopUp|null> {
        try{
            const { data } = await this.http({
                url: `/wallet/up/${id}`
            })
            return data
        }catch(e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
            return null
        }
    }

    async create(amount: number, redirectUrl: string, webhookUrl: string): Promise<paymentCreated|null> {
        if(typeof amount !== "number") throw new Error("amount must be a number")
        if(!validUrl.isWebUri(redirectUrl)) throw new Error("bad redirect url")
        if(!validUrl.isWebUri(webhookUrl)) throw new Error("bad webhook url")
        try {
            const res = await this.http({
                url: '/wallet/up',
                method: "post",
                data: {
                    amount: amount.toFixed(2),
                    redirectUrl,
                    webhookUrl
                }
            })
            const data: paymentCreated = res.data
            return data
        } catch(e) {
            if(e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
            return null
        }
    }

    async wallet(): Promise<Wallet|null> {
        try {
            const { data } = await this.http({
                url: "/wallet",
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
}

export default Payments