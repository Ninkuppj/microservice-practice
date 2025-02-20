import { Notification } from "../../database";
import { IUser } from "../../interface";

export class createNotificationResponse {
    status: number;
    message: string;
    data?: {
      notification: Notification
    };
    errors?: { [key: string]: any };
  }