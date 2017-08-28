import * as mocha from 'mocha'
import { expect } from 'chai'

import { Server } from '../'

describe('Server Tests', function () {

    let server: Server = null

    before(async () => {
        server = new Server()
        await server.start()
    })

    after(async () => {
        if (server) {
            await server.stop()
        }
    })

    it('should be able to start on port 9080', async () => {
        expect(server.config.port).to.eq(9080)
    })

});