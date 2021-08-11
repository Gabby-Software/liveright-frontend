export type PushNotificationType = {
    user: {
        id: number;
        email: string;
    },
    type: string;
    data: {
        type: string;
        message: string;
    }
}