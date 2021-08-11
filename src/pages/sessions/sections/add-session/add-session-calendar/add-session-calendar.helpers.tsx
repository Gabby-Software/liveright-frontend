import moment, {Moment} from "moment";

import {SessionType} from "../../../../../types/session.type";

export const getStyleHelper = (timeDate: Moment, duration: string) => {
  const durationMoment = moment(duration, 'HH:mm');
  const top = timeDate.minutes() / 60 * 100;
  const height = (durationMoment.hour() * 60 + durationMoment.minutes()) / 60 * 100;

  return ({
    top: `${top}%`,
    height: `${height}%`,
  })
}

interface isBusyOptions {
  sessions: SessionType[];
  currentStartDate: Moment;
  duration: string;
}

export const getIsBusy = (options: isBusyOptions): boolean => {
  const {sessions, currentStartDate, duration} = options;
  const durationMoment = moment(duration, "HH:mm");
  const durationMinutes = durationMoment.hour() * 60 + durationMoment.minutes();
  const currentEndDate = moment(currentStartDate).add(durationMinutes, 'minutes');

  const intersects = sessions.filter((it) => {
    const {starts_at, ends_at} = it;
    const startMoment = moment.utc(starts_at);
    const endMoment = moment.utc(ends_at);

    return (
        currentStartDate.isBetween(startMoment, endMoment) ||
        currentStartDate.isSame(startMoment) ||
        currentEndDate.isBetween(startMoment, endMoment) ||
        currentEndDate.isSame(endMoment)
    );
  });

  return intersects.length > 0;
};
