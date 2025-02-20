import { INotification } from "../../interface/notification.interface";

export class GetNotificationByUserResponse {
    status: number;
    message: string;
    notifications?: INotification[];
    notifiIsSeenCount?: number;
    errors?: { [key: string]: any }|null;
  }