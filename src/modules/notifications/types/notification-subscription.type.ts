export type NotificationSubscriptionType = {
    id: number;
    callback: () => void;
}