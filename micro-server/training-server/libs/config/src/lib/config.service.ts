import { Injectable } from "@nestjs/common";
import { DEFAULT_CONFIG } from "./config.default";
import { ConfigData } from "./config.interface";
import { Transport } from "@nestjs/microservices";
@Injectable()
export class ConfigService {
  private config: ConfigData;
  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: parseInt(env.PORT!, 10),
      userService: {
        options: {
          host: env.USER_SERVICE_HOST!,
          port: Number(env.USER_SERVICE_PORT),
        },
        transport: Transport.TCP,
      },
      notificationService:{
        name: env.KAFKA_SERVICE_NAME!,
        options:{
          client:{
            brokers: [env.KAFKA_SERVICE_BROKERS]!,
            clientId: env.KAFKA_CLIENT_ID_SERVICE!,
          },
          consumer:{
            groupId: env.KAFKA_GROUP_ID_SERVICE!,
          }
        },
        transport: Transport.KAFKA,
      },
      notificationServiceTCP: {
        options: {
          host: env.NOTIFICATION_SERVICE_HOST!,
          port: Number(env.NOTIFICATION_SERVICE_PORT!),
        },
        transport: Transport.TCP,
      },
      auth: {
        expiresIn: Number(env.TOKEN_EXPIRY),
        access_token_secret: env.JWT_ACCESS_TOKEN_SECRET!,
        refresh_token_secret: env.JWT_REFRESH_TOKEN_SECRET!,
      },
      tokenService: {
        options: {
          host: env.TOKEN_SERVICE_HOST!,
          port: Number(env.TOKEN_SERVICE_PORT!),
        },
        transport: Transport.TCP,
      },
      authService: {
        options: {
          host: env.AUTH_SERVICE_HOST!,
          port: Number(env.AUTH_SERVICE_PORT!),
        },
        transport: Transport.TCP,
      },
      vesselService: {
        options: {
          host: env.VESSEL_SERVICE_HOST!,
          port: Number(env.VESSEL_SERVICE_PORT!),
        },
        transport: Transport.TCP,
      },
    }
  }

  public get(): Readonly<ConfigData> {
    return this.config;
  }
}