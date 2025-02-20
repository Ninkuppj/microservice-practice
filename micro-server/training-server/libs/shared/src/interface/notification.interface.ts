import { User } from "../database/entities";

export interface INotification{
    id: number;
    desc: string;
    isSeen:boolean;
    title: string;
    userId: number;
    user: User;
}

export interface IServiceGetNotificationByUser {
    status: number;
    message: string;
    notifications: INotification[];
    notifiIsSeenCount:number;
    errors?: { [key: string]: any };
}
export interface IServiceUpdateNotificationByUser {
    status: number;
    message: string;
    notifications: INotification[] | null;
}