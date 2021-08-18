import React, {DependencyList, useEffect} from 'react';
import notificationManager from "../notifications.manager";
import logger from "../../../managers/logger.manager";

export const usePusher = function<G>(channelName:string, event:string,callback: (data: G) => void, deps:DependencyList = []) {
    useEffect(() => {
        const channel = notificationManager.pusher?.subscribe(channelName);
        channel?.bind('pusher:subscription_succeeded', () => logger.success(`subscribed to ${channelName}`))
        channel?.bind('pusher:subscription_error', (e:string) => logger.error(`unable to subscribe to ${channelName}`, e))
        channel?.bind(event, callback);
        return () => notificationManager.pusher?.unsubscribe(channelName);
    }, [...deps]);
}