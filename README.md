
# Londor - Tiny TypeScript Service Based Web Framework
Londor is a nice _little_ service based framework on top of express. 

## Getting Started

1. You'll need Node 6.10.x or higher
2. We highly recommmend using TypeScript 2.5.1 or higher
3. Your tsconfig.json file will need:
    - to target `es6`
    - use `commonjs`
    - set `experimentalDecorators` to true
    - set `emitDecoratorMetadata` to true
4. Run `npm install londor -S` 

It should look something like below. 
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  },
  "exclude": [
    "node_modules"
  ]
}
```

# Examples

## A simple server
```typescript
import { Server } from 'londor'

const server = new Server({
  port: 4000
})

server.start()
  .then(() => {
    console.log("The server is started on port 4000!")
  })
  .catch((err) => {
    console.error(err)
  })
```

## Adding a service
A service is just a `class` that you can add to a `Server` instance.
- You can expose methods as http endpoints using `@Get, @Post, @Put, @Delete` etc...
- You can read parameters using the `@Param('carId')` or just `@Param` decorator
- Services don't need http endpoints at all
```typescript
import { Server, Get, Post, Put, Delete, BaseRoute, Body } from 'londor'

@BaseRoute('/cars')
class CarService {

  cars = [{
      carId: 1,
      name: 'toyota',
    }, {
      carId: 2,
      name: 'ford',
    }]

  @Get('/all')
  getAllCars(){
    return this.cars
  }

  @Post('/')
  async addNewCar(@Body body: any) {
    this.cars.push(body.car)
    return body
  }

  @Put('/:carId')
  async updateCar(@Body body: any) {
    this.cars.push(body.car)
    return body
  }

  @Delete('/:carId')
  async deleteCar(@Param carId: string) {
    for(let car of this.cars) {
      if (car.carId === carId) {
        this.cars.splice(this.cars.indexOf(car), 1)
      }
    }
  }

}
const server = new Server({
  port: 4000
})

server.addService(new CarService())

server.start()
  .then(() => {
    console.log("The server is started on port 4000!")
  })
  .catch((err) => {
    console.error(err)
  })
```

## Using Express Middlewares
The server can easily attach express middlewares. Simply use the familiar `use` functionality
```typescript
import * as cors from 'cors'
server.use(cors())
```

### Express Middlewares in Services
You can add additional middlewares before 

```typescript
import { Get, UseMiddleware } from 'londor'
```

## Serving Static Files

Serving Static Files is super easy with `@ServeStatic`

```typescript
import { ServeStatic, BaseRoute } from 'londor'
@BaseRoute('/dashboard')
@ServeStatic('/', 'path/to/index.html') 
@ServeStatic('/admin', 'path/to/admin.html') 
class DashboardService {
  // .. more implementation goes here
}
server.addService(new DashboardService())
server.start()
  .then(() => {
    console.log("The server is started on port 4000!")
    console.log("The dashboard is at http://localhost:4000/dashboard")
    console.log("The admin panel is at http://localhost:4000/dashboard/admin")
  })
  .catch((err) => {
    console.error(err)
  })
```

# Contributing

After `npm install`

1. To Build `npm run build`
2. To Clean Artifacts `npm run clean`
3. To Test `npm run test`
4. To Lint `npm run lint`
5. To Buld and Watch when you make changes `npm run watch`

# Debugging with Visual Studio Code

1. Set a breakpoint in your code ending in `.ts` or your test ending in `.spec.ts`
2. Run Either `Launch Program` or `Launch Tests` in the debug pane. 
3. Run Either `Launch Program` or `Launch Tests` in the debug pane. 
