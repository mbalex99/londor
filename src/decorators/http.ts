import { Router } from 'express'

function setupRouter(target: any): Router {
    if (!target["__router"]) {
        target["__router"] = Router()
    }
    return target["__router"]
}

export function Get(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const router = setupRouter(target)
        router.get(path, (req, res) => {

        })
    }
}

export function Post(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const router = setupRouter(target)
    }
}

export function Put(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const router = setupRouter(target)
    }
}

export function Delete(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const router = setupRouter(target)
    }
}

export function Options(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const router = setupRouter(target)
    }
}

export function Head(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const router = setupRouter(target)
    }
}

export function All(path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}


export function Middleware() {

}

function BaseRoute(str: string) {
    return function (target): void {
        
    }
}


@BaseRoute('/sample')
class SampleService {

    @Get('/')
    getUsers() {

    }

}

const service = new SampleService()

console.log(service.constructor["d_value"])
