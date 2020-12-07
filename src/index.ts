import fetch from "node-fetch"
import HttpsProxyAgent from "https-proxy-agent"

/**
 * Inputted settings for a given proxy, passed as extra parameters into any check function.
 */
interface ProxySettings {
    /**
     * Credentials of the proxy, if any.
     * @param username string The username for the proxy
     * @param password string The password for the proxy
     */
    credentials?: {
        username: string,
        password: string
    }
}

interface ProxyResult extends ProxySettings {
    /** The IP address for the proxy */
    address: string,
    /** The port for the proxy */
    port: string

    /** Score for https domains */
    httpsScore: number,
    /** Score for http domains */
    httpScore: number,
    /** Score for google domains */
    googleScore: number,
    /** Domains that have failed checks */
    failed: string[]
}

/**
 * Options for the proxy manager constructor.
 */
interface ProxyManagerOptions {
    /** Which https domains to attempt */
    httpsDomains?: string[]
    /** Which http domains to attempt */
    httpDomains?: string[]
    /** Which google domains to attempt */
    googleDomains?: string[]

    /** Timeout in ms until attempt fail */
    timeout?: number
}

/**
 * The ProxyManager class, where all checks can be utilized.
 */
export class ProxyManager {

    public static s_httpsDomains: string[] = [ "https://wikipedia.org/" ]
    public static s_httpDomains: string[] = [ "http://wikipedia.org/" ]
    public static s_googleDomains: string[] = [ "https://google.com/" ]
    public static timeout = 1000 

    private _httpsDomains: string[]
    private _httpDomains: string[]
    private _googleDomains: string[]
    private _timeout: number

    constructor(options: ProxyManagerOptions) {
        this._httpsDomains = options.httpsDomains ? options.httpsDomains : ProxyManager.s_httpsDomains 
        this._httpDomains = options.httpDomains ? options.httpDomains : ProxyManager.s_httpDomains
        this._googleDomains = options.googleDomains ? options.googleDomains : ProxyManager.s_googleDomains

        this._timeout = options.timeout ? options.timeout : 1000
    }

    get httpsDomains() { return this._httpsDomains }
    get httpDomains() { return this._httpDomains }
    get googleDomains() { return this._googleDomains }
    get timeout() { return this._timeout }

    /**
     * Check against a single proxy with minimal configuration.
     * 
     * @param address The proxy's IP address
     * @param port The proxy's port
     * @param settings The settings for the proxy
     */
    public static async fastCheck(address: string, port: string | number, settings: ProxySettings = {}): Promise<ProxyResult> {
        const agent = new HttpsProxyAgent.HttpsProxyAgent({
            host: address,
            port: port,
            ...(settings.credentials ? { 
                username: settings.credentials.username,
                password: settings.credentials.password
             } : {}
            )
        })

        // Prepare the result of this test
        const res: ProxyResult = {
            address: address,
            port: port.toString(),
            httpsScore: 0,
            httpScore: 0,
            googleScore: 0,
            failed: [] as string[]
        }

        const process = []

        // Validate against the three different domain types
        for (let domain of this.s_httpsDomains) {
            process.push(fetch(domain, {
                agent: agent,
                timeout: 1000
            })
            .then(() => { res.httpsScore += 1 })
            .catch(() => { res.failed.push(domain) }))
        }

        for (let domain of this.s_httpDomains) {
            process.push(fetch(domain, {
                agent: agent,
                timeout: 1000
            })
            .then(() => { res.httpScore += 1 })
            .catch(() => { res.failed.push(domain) }))
        }

        for (let domain of this.s_googleDomains) {
            process.push(fetch(domain, {
                agent: agent,
                timeout: 1000
            })
            .then(() => { res.googleScore += 1 })
            .catch(() => { res.failed.push(domain) }))
        }

        await Promise.all(process)

        return res as ProxyResult
    }

}