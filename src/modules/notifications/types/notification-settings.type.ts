export type NotificationSettingsCategoryType = 'payment'|'training'|'chat'|'other';
export type NotificationSettingsChannelType = 'browser'|'email';

export type NotificationSettingsCategoryValuesType = {
    [Options in NotificationSettingsChannelType]: boolean
}
export type NotificationSettingsType = {
        [Option in NotificationSettingsCategoryType]: NotificationSettingsCategoryValuesType
}