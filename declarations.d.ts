export interface dataObject {
    sandbox: boolean
}

export interface Payment {
    id: number
    methodId: number
    method: string
    serviceId: number
    serviceType: string
    amount: number
    description: string
    createdAt: Date
}

export interface PaymentsList {
    count: number,
    items: Payment[]
}

export interface paymentCreated {
    id: string
    url: string
}

export interface WalletTopUp {
    payed: boolean,
    amountStr: string,
    amountInt: number,
    amountWithFeeStr: string,
    amountWithFeeInt: number
}

export interface Wallet {
    balancePlnFormatted: string,
    balancePlnInt: number
}

export interface User {
    "createdAt": Date,
    "email": string,
    "fullName": string,
    "uid": number,
    "username": string
}

export interface Log {
    id: number,
    ip: string,
    ua: string,
    serviceName: string,
    serviceId: number,
    action: number,
    actionType: string,
    value: string,
    valuePrev: string,
    ByStaff: boolean,
    createdAt: Date
}

export interface Logs {
    count: number
    items: Log[]
}