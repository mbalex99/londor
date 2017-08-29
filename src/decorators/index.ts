export type HTTPMethod = 'all' | 'get' | 'put' | 'post' | 'delete' | 'head' | 'options' | 'trace' | 'patch'

export interface ServiceRoute {
    path: string
    httpMethod: HTTPMethod
    functionName: string
}

export interface ServeStaticRoute {
    path: string
    staticRoot: string
}

function addPathAndMethod(target: any, httpMethod: HTTPMethod, path: string, method: string) {
    let routes: ServiceRoute[] = target["routes"] || []
    routes.push({
        httpMethod: httpMethod,
        path: path,
        functionName: method
    })
    target["routes"] = routes
}

export function Get(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addPathAndMethod(target, 'get', path, propertyKey)
    }
}

export function Post(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addPathAndMethod(target, 'post', path, propertyKey)
    }
}

export function Put(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addPathAndMethod(target, 'put', path, propertyKey)
    }
}

export function Delete(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addPathAndMethod(target, 'delete', path, propertyKey)
    }
}

export function Options(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addPathAndMethod(target, 'options', path, propertyKey)
    }
}

export function Head(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addPathAndMethod(target, 'head', path, propertyKey)
    }
}

export function All(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        addPathAndMethod(target, 'all', path, propertyKey)
    }
}


export function MiddlewareBefore(...middlewares: any[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        throw new Error('Not yet implemented')
    }
}

export function BaseRoute(path: string) {
    return function (target: any) {
        // save a reference to the original constructor
        let original = target;
        // the new constructor behavior
        let f: any = function (...args) {
            const instance = new original(...args)
            instance["baseRoute"] = path
            return instance
        }
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    }
}

export function Name(name: string) {
    return function (target: any) {
        // save a reference to the original constructor
        let original = target;
        // the new constructor behavior
        let f: any = function (...args) {
            const instance = new original(...args)
            instance["name"] = name
            return instance
        }
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    }
}

export function ServeStatic(route: string, staticRoot: string) {
    return function (target: any) {
        // save a reference to the original constructor
        let original = target;
        // the new constructor behavior
        let f: any = function (...args) {
            const instance = new original(...args)
            let staticRoutes: ServeStaticRoute[] = instance["staticRoutes"] || []
            staticRoutes.push({
                path: route,
                staticRoot: staticRoot
            })
            instance["staticRoutes"] = staticRoutes
            return instance
        }
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    }
}

export function Body(target: any, key: string, index: number) {

}

export function Param(param: string) {
    return function (target: any, key: string, index: number) {

    }
}

@Name("Sample")
@BaseRoute('/sample')
class SampleService {

    something1: string
    something2: string

    constructor(something1: string, something2: string) {
        this.something1 = something1
        this.something2 = something2
    }

    @Get('/')
    getUsers() {
        return new Promise<string>((resolve, reject) => {
            setTimeout(function () {
                resolve('oooh')
            }, 2000);
        })
    }

    @Get('/cars')
    getCarsUsers() {

    }

}

const service = new SampleService("oh", "my")
console.log(service["routes"]);