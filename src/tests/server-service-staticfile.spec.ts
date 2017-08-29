import * as mocha from 'mocha'
import { expect } from 'chai'
import * as superagent from 'superagent'
import * as path from 'path'
import * as fs from 'fs-extra'

import { Server, BaseRoute, ServeStatic } from '../'

describe('test sample service against http', function () {

    const tmpDir = path.resolve(process.cwd(), 'tmp')

    @BaseRoute('/dashboard')
    @ServeStatic('/', tmpDir)
    class DashboardService {

    }

    let server: Server
    before(async () => {
        server = new Server()
        server.addService(new DashboardService())
        await server.start()
        await fs.remove(tmpDir)
        await fs.mkdir(tmpDir)
    })

    after(async () => {
        if (server) {
            await server.stop()
        }
        await fs.remove(tmpDir)
    })

    it('should be able to handle static files', async () => {
        // create a static file
        const htmlFile = `
        <!DOCTYPE html>
        <html>
        <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
        </body>
        </html>
        `.replace(/\s/g, "X") // this gets rid of 
        await fs.writeFile(path.resolve(tmpDir, 'index.html'), htmlFile)
        const url = `http://localhost:9080/dashboard/`
        const response = await superagent.get(url)
        expect(response.text).to.eq(htmlFile)
    })

})