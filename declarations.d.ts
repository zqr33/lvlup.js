export interface dataObject {
    sandbox: boolean
}

export interface Payment {
    id: number
    methodId: number
    method: string
    serviceId: number
    serviceType: string|undefined
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
    createdAt: Date,
    email: string,
    fullName: string,
    uid: number,
    username: string
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

export interface Service {
    id: number,
    serviceId: number,
    serviceType: string,
    ip: string,
    name: string,
    nodeId: number,
    createdAt: Date,
    active: boolean,
    payedTo: Date,
    planName: string
}

export interface ServiceStatus {
    status: string
    vmUptimeS: number
}

export interface Proxmox {
    password: string,
    url: string,
    username: string
}

export interface Attacks {
    endedAt: number,
    id: number,
    ip: string,
    startedAt: number
}

export interface AttacksList {
    count: number
    items: Attacks[]
}

export interface Filtering {
    filteringEnabled: boolean,
    state: string
}

export interface SandboxAccount {
    apiKey: string,
    email: string,
    id: number,
    password: string,
    username: string
}

export type Protocol =
    "arkSurvivalEvolved" |
    "arma" |
    "gtaMultiTheftAutoSanAndreas" |
    "gtaSanAndreasMultiplayerMod" |
    "hl2Source" |
    "minecraftPocketEdition" |
    "minecraftQuery" |
    "mumble" |
    "rust" |
    "teamspeak2" |
    "teamspeak3" |
    "trackmaniaShootmania" |
    "other"

export type WhitelistState = "ok" | "createRulePending" | "deleteRulePending"

export interface Whitelist {
    id: number,
    ports: {
        from: number,
        to: number
    },
    protocol: Protocol,
    state: WhitelistState
}

export interface WhitelistAdd {
    ports: {
        from: number,
        to: number
    },
    protocol: Protocol,
}