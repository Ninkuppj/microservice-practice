export interface UserServiceConfig {
    options: UserServiceConfigOptions;
    transport?: any;
  }
  export interface AuthConfig {
    expiresIn: number;
    access_token_secret: string;
    refresh_token_secret: string;
  }
  
  export interface UserServiceConfigOptions {
    host: string;
    port: number;
  }

  export interface KafkaConfig{
    options:KafaConfigOptions,
    transport: any;
    name: string
  }
  export interface KafaConfigOptions{
    client: {
      clientId?: string,
      brokers: any,
    },
    consumer: {
      groupId: string,
    },
  }
  export interface ConfigData {
    env: string;
  
    port: number;
  
    // db: ConfigDatabase;
  
    // swagger: ConfigSwagger;
  
    // logLevel: string;
    notificationService: KafkaConfig;
    notificationServiceTCP: UserServiceConfig;
    auth: AuthConfig;
    userService?: UserServiceConfig;
    authService?: UserServiceConfig;
    vesselService?: UserServiceConfig;
    tokenService?: UserServiceConfig;
  }