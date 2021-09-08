# Notifications

In app, as well as push notifications in this app using [Pusher](https://dashboard.pusher.com)  
You can find creds in the Readme.md

Notification related functionality combined in files under `/src/modules/notifications`

Available notification types updated as we go and can be checked in the [BE Documentation](https://github.com/ColorElephantHQ/allright-backend/blob/dev/docs/push-notification-types.md)

### Live events

Apart from the notifications, there can be other cases to use live events (like already used for get notice when invoice PDF is ready)  

Given channel-name and event-name BE used to push the event, you can subscribe to this event using `usePusher` hook, which can be found at `modules/notifications/hooks/pusher.hook.ts`

Ex. usage:  `usePusher(channelName, eventName, callback)`
The hook is generic. The generic type is the type you expect to receive in event payload, which is also the type you handle in the callback.
