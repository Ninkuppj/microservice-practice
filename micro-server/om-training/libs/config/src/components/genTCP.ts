import { ClientsModule, Transport } from "@nestjs/microservices";

export function genClientTCP () {
    return ClientsModule.register([
        { name: 'MATH_SERVICE', transport: Transport.TCP },
    ])
}