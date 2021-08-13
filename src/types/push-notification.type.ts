export type PushNotificationType = {
    notifiable: {
        id: number;
        uuid: string;
        email: string;
    },
    type: string;
    data: {
        type: string;
        message: string;
    }
}