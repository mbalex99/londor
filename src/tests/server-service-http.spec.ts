import * as mocha from 'mocha'
import { expect } from 'chai'
import * as superagent from 'superagent'

import { Server, BaseRoute, Get } from '../'

describe('test sample service against http', function() {

    @BaseRoute('/sample')
    class SampleService {

        @Get('/things')
        getThings() {
            return {
                things: [
                    { name: 'yo', age: 12 },
                    { name: 'howdy', age: 45 }
                ]
            }
        }

        @Get('/middleware')
        getViaMiddleware(req, res) {
            res.json({
                fromMiddleware: true
            })
        }
    }

    let server: Server

    before(async () => {
        server = new Server()
        server.addService(new SampleService())
        await server.start()
    })

    after(async () => {
        if (server) {
            await server.stop()
        }
    })


    it('should be able to get things', async () => {
        const url = `http://localhost:9080/sample/things`
        const response = await superagent.get(url)
        expect(response.body).to.deep.equal({
            things: [
                { name: 'yo', age: 12 },
                { name: 'howdy', age: 45 }
            ]
        })
    })

    it('should be able to handle middleware responses', async () => {
        const url = `http://localhost:9080/sample/middleware`
        const response = await superagent.get(url)
        expect(response.body).to.deep.equal({
            fromMiddleware: true
        })
    })

})