export type NotificationSettingsCategoryType = 'payment'|'training'|'chat'|'other';
export type NotificationSettingsChannelType = 'browser'|'email';

export type NotificationSettingsType = {
        [Property in keyof NotificationSettingsCategoryType]: {
            [Property in keyof NotificationSettingsChannelType]: boolean
        }
}