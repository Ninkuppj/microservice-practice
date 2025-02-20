import { ConfigData } from "./config.interface";
import { Transport } from "@nestjs/microservices";

export const DEFAULT_CONFIG: ConfigData = {
  port: Number(process.env.PORT || 5000),
  env: "development",
  userService: {
    options: {
      host: "",
      port: 5001,
    },
    transport: Transport.TCP,
  },
  auth: {
    expiresIn: 30000,
    access_token_secret: "",
    refresh_token_secret: "",
  },
  notificationService:{
    name:"",
    options:{
      client:{
        brokers:['0.0.0.0:29092'],
        clientId:""
      },
      consumer:{
        groupId:""
      }
    },
    transport: Transport.KAFKA,
  },
  notificationServiceTCP:{
    options: {
      host: "",
      port: 5002,
    },
    transport: Transport.TCP,
  },
  authService: {
    options: {
      host: "",
      port: 5050,
    },
    transport: Transport.TCP,
  },
  // vesselService: {
  //   options: {
  //     host: "",
  //     port: 3003,
  //   },
  //   transport: Transport.TCP,
  // },
};