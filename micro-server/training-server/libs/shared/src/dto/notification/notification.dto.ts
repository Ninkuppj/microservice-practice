import { User } from "../../database";

export class NotificationDTO {
    desc: string;
    isSeen:boolean;
    title: string;
    email: string;
    updateBy: string;
    updateDate: Date;
    user: User;
}