import * as http from 'http'
import * as https from 'https'
import * as Express from 'express'
import { ServerOptions as SSLServerOptions } from 'https'

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

        if (this.config.sslServerOptions) {
            this.server = https.createServer(this.config.sslServerOptions, this.app)
        } else {
            this.server = http.createServer(this.app)
        }
    }

    addService(service: any) {
        this.services.push(service)
    }

    async start(): Promise<void> {
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
        return new Promise<void>((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}