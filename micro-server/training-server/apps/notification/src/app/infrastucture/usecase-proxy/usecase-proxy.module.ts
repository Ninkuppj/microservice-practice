import { DynamicModule, Module } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification.repository";
import { AddNotificationUseCases, DeleteNotificationByUserUseCases, DeleteNotificationUseCases, GetNotificationByUserUseCases, UpdateNotificationUseCases } from "../../use-cases";
import { UseCaseProxy } from "./usecase-proxy";
import { CountNotificationUseCases } from "../../use-cases/count-notification-seen.usecase";

@Module({
    imports: [],
  })
  export class UsecasesProxyModule {
    // static GET_NOTIFICATION_USECASES_PROXY = 'getNotificationUsecasesProxy';
    static GET_NOTIFICATIONS_USECASES_PROXY = 'getNotificationsUsecasesProxy';
    static COUNT_NOTIFICATIONS_USECASES_PROXY = 'countNotificationsUsecasesProxy';
    static POST_NOTIFICATION_USECASES_PROXY = 'postNotificationUsecasesProxy';
    static DELETE_NOTIFICATION_USECASES_PROXY = 'deleteNotificationUsecasesProxy';
    static DELETE_NOTIFICATION_BY_USER_USECASES_PROXY = 'deleteNotificationUsecasesProxy';
    static PUT_NOTIFICATION_USECASES_PROXY = 'putTodoUsecasesProxy';
  
    static register(): DynamicModule {
      return {
        module: UsecasesProxyModule,
        providers: [
          {
            inject: [NotificationRepository],
            provide: UsecasesProxyModule.GET_NOTIFICATIONS_USECASES_PROXY,
            useFactory: (todoRepository: NotificationRepository) => new UseCaseProxy(new GetNotificationByUserUseCases(todoRepository)),
          },
          {
            inject: [NotificationRepository],
            provide: UsecasesProxyModule.COUNT_NOTIFICATIONS_USECASES_PROXY,
            useFactory: (todoRepository: NotificationRepository) => 
            new UseCaseProxy(new CountNotificationUseCases(todoRepository)),
          },
          {
            inject: [NotificationRepository],
            provide: UsecasesProxyModule.POST_NOTIFICATION_USECASES_PROXY,
            useFactory: (todoRepository: NotificationRepository) =>
              new UseCaseProxy(new AddNotificationUseCases(todoRepository)),
          },
          {
            inject: [NotificationRepository],
            provide: UsecasesProxyModule.PUT_NOTIFICATION_USECASES_PROXY,
            useFactory: (todoRepository: NotificationRepository) =>
              new UseCaseProxy(new UpdateNotificationUseCases(todoRepository)),
          },
          {
            inject: [NotificationRepository],
            provide: UsecasesProxyModule.DELETE_NOTIFICATION_BY_USER_USECASES_PROXY,
            useFactory: (todoRepository: NotificationRepository) =>
              new UseCaseProxy(new DeleteNotificationByUserUseCases(todoRepository)),
          },
          {
            inject: [NotificationRepository],
            provide: UsecasesProxyModule.DELETE_NOTIFICATION_USECASES_PROXY,
            useFactory: (todoRepository: NotificationRepository) =>
              new UseCaseProxy(new DeleteNotificationUseCases(todoRepository)),
          }
        ],
        exports: [
          UsecasesProxyModule.GET_NOTIFICATIONS_USECASES_PROXY,
          UsecasesProxyModule.COUNT_NOTIFICATIONS_USECASES_PROXY,
          UsecasesProxyModule.POST_NOTIFICATION_USECASES_PROXY,
          UsecasesProxyModule.DELETE_NOTIFICATION_USECASES_PROXY,
          UsecasesProxyModule.DELETE_NOTIFICATION_BY_USER_USECASES_PROXY,
          UsecasesProxyModule.PUT_NOTIFICATION_USECASES_PROXY,
        ],
      };
    }
  }