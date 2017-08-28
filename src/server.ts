import * as http from 'http'
import * as https from 'https'
import * as Express from 'express'
import { ServerOptions as SSLServerOptions } from 'https'
import { ServiceRoute, HTTPMethod } from './decorators/http'

export interface ServerConfig {
    hostname?: string
    port?: number
    backlog?: number
    sslServerOptions?: SSLServerOptions
}

export class Server {

    private app: Express.Application
    services: any[]
    server: http.Server | https.Server
    readonly config: ServerConfig

    constructor(config: ServerConfig = {}) {
        this.config = config
        if (!this.config.hostname) {
            this.config.hostname = "127.0.0.1"
        }
        if (!this.config.port) {
            this.config.port = 9080
        }
        this.app = Express()
        this.services = []
    }

    /**
     * Use a middleware
     * @param path 
     * @param requestHandlers a single or several request handler
     */
    use(path: string | RegExp = null, ...requestHandlers: Express.RequestHandler[]) {
        if (path) {
            this.app.use(path, requestHandlers)
        } else {
            this.app.use(requestHandlers)
        }
    }


    addService(service: any) {
        this.services.push(service)
    }

    async start(): Promise<void> {
        if (this.config.sslServerOptions) {
            this.server = https.createServer(this.config.sslServerOptions, this.app)
        } else {
            this.server = http.createServer(this.app)
        }
        for (let service of this.services) {
            let router = Express.Router()
            const baseRoute = Reflect.getMetadata('service:baseroute', service.constructor)
            const serviceRoutes = Reflect.getMetadata('service:routes', service) as ServiceRoute[] || []
            for (let serviceRoute of serviceRoutes) {
                let handler: Express.RequestHandler = async (req, res, next) => {
                    let functionName: string = serviceRoute.functionName
                    try {
                        let result = await Promise.resolve(service[functionName](req))
                    } catch (err) {

                    }
                }
                (router[serviceRoute.httpMethod] as Express.IRouterMatcher<Express.Router>)(serviceRoute.path, handler)
            }
            this.app.use(baseRoute, router)
        }
        return new Promise<void>((resolve, reject) => {
            this.server.listen(this.config.port, this.config.hostname, this.config.backlog, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    async stop(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
        this.server = null
    }

}