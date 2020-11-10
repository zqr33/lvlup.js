import Lvlup from "../index";
import {AxiosInstance} from "axios";
import {SandboxAccount} from "../../declarations";

class Sandbox {
    readonly #http: AxiosInstance
    constructor({http}: Lvlup) {
        this.#http = http
    }
    async createAccount(): Promise<SandboxAccount> {
        try {
            const { data } = await this.#http({
                url: "/sandbox/account/new",
                method: "post"
            })
            return data
        }catch (e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
        }
    }

    async acceptPayment(id: string|undefined): Promise<void> {
        if(!id) throw new Error("bad payment id")
        try {
            await this.#http({
                url: `/sandbox/wallet/up/${id}/ok`,
                method: "POST"
            })
        }catch (e) {
            if(e.response && e.response.data) {
                throw new Error(e.response.data)
            } else {
                throw new Error(e)
            }
        }
    }
}

export default Sandbox