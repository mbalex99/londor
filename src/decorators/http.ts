import 'reflect-metadata'

export type HTTPMethod = 'all' | 'get' | 'put' | 'post' | 'delete' | 'head' | 'options' | 'trace' | 'patch'

export interface ServiceRoute {
    path: string
    httpMethod: HTTPMethod
    functionName: string
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
    }
}

export function Put(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
    }
}

export function Delete(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
    }
}

export function Options(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
    }
}

export function Head(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
    }
}

export function All(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        ensureMetaData(target)
    }
}


export function Middleware() {

}

export function BaseRoute(path: string) {
    return function (target: any): void {
        Reflect.defineMetadata('service:baseroute', path, target)
    }
}

export function ServiceStatic(path: string, staticFilePath: string) {
    return function (target: any): void {
        Reflect.defineMetadata('service:servicestatic', { path: path, staticFilePath: staticFilePath }, target)
    }
}


@BaseRoute('/sample')
class SampleService {

    @Get('/')
    getUsers() {
        return new Promise<string>((resolve, reject) => {
            setTimeout(function() {
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