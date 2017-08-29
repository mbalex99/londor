import 'reflect-metadata'

export type HTTPMethod = 'all' | 'get' | 'put' | 'post' | 'delete' | 'head' | 'options' | 'trace' | 'patch'

export interface ServiceRoute {
    path: string
    httpMethod: HTTPMethod
    functionName: string
}

export interface ServeStaticRoute {
    path: string
    staticFilePath: string
}

function ensureMetaData(target: any) {
    if (!Reflect.getMetadata('service:routes', target)) {
        Reflect.defineMetadata('service:routes', [], target)
    }
}

function addPathAndMethod(target: any, httpMethod: HTTPMethod, path: string, method: string) {
    let routes = Reflect.getMetadata('service:routes', target) as ServiceRoute[]
    routes.push({
        httpMethod: httpMethod,
        path: path,
        functionName: method
    })
    Reflect.defineMetadata('service:routes', routes, target)
}

export function Get(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
        addPathAndMethod(target, 'get', path, propertyKey)
    }
}

export function Post(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
        addPathAndMethod(target, 'post', path, propertyKey)
    }
}

export function Put(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
        addPathAndMethod(target, 'put', path, propertyKey)
    }
}

export function Delete(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
        addPathAndMethod(target, 'delete', path, propertyKey)
    }
}

export function Options(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
        addPathAndMethod(target, 'options', path, propertyKey)
    }
}

export function Head(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
        addPathAndMethod(target, 'head', path, propertyKey)
    }
}

export function All(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
        addPathAndMethod(target, 'all', path, propertyKey)
    }
}


export function MiddlewareBefore(...middlewares: any[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}

export function BaseRoute(path: string) {
    return function (target: any): void {
        Reflect.defineMetadata('service:baseroute', path, target)
    }
}

export function ServeStatic(path: string, staticFilePath: string) {
    return function (target: any): void {
        Reflect.defineMetadata('service:servicestatic', { path: path, staticFilePath: staticFilePath }, target)
    }
}

export function Body(target: any, key: string, index: number) {

}

/**
 * Populates with route params
 * @param target 
 * @param key 
 * @param index 
 */
export function Param(target: any, key: string, index: number) {

}

@BaseRoute('/sample')
class SampleService {

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

const service = new SampleService()
console.log(Reflect.getMetadata('service:routes', service))
console.log(Reflect.getMetadata('service:baseroute', service.constructor))