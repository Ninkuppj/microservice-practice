import { ClientsModule, Transport } from '@nestjs/microservices';

export function genClientKafka (groupId: string) {
    return ClientsModule.register([
        {
            name: 'NOTIFICATIONS_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    // clientId: clientId,
                    brokers: ['0.0.0.0:29092'],
                },
                consumer: {
                    groupId:groupId
                }
            }
        },
    ]);
}