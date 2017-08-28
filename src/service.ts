

type Method = 'all' | 'get' | 'put' | 'post' | 'delete' | 'head' | 'options' | 'trace' | 'patch'

function Route(options: {
    path: string,
    method: Method
}) {
    
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.httpEndpoints) {
            target.httpEndpoints = []
        }
        target.httpEndpoints.push(options.path)
        return descriptor
    }
}

export interface Service {

    start?(): Promise<void> | void
    stop?(): Promise<void> | void

}

class Blah {

    static schema: string = "original"

    name: string = "blah"

    
    detail: string = "blah"

    @Route({
        path: '/',
        method: 'get'
    })
    getUsers() {

    }
}

const blah = new Blah()
console.log(blah)
console.log(Blah.schema)