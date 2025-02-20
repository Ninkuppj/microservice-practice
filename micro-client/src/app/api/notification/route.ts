import callAPI from "@/app/lib/api-helper";
export default class NotificationService {
  private static controller = 'notification';
  static async getMessageByUser(userId: number) {
    return callAPI(`${NotificationService.controller}/user/${userId}`);
  }
  static async udpateMessageIsSeen(notifiIds: number[]) {
    return await callAPI(`${NotificationService.controller}`,{method:"PUT", body:notifiIds});
  }
  static async deleteMessage(notificationId: number) {
    return callAPI(`${NotificationService.controller}/${notificationId}`,{method:"DELETE"});
  }
}