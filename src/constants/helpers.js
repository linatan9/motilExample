import moment from 'moment';
import {ONBOARDING_SLUGS} from './data';

export const intervalsToWorkingHours = (
  intervals,
  dayOfWeek,
  certainDateEdit,
) => {
  const workingHours = {
    from: '',
    to: '',
    unavailability: [],
  };
  workingHours.from = moment(intervals[0].timeFrom).format('HH:mm');
  workingHours.to = moment(intervals[intervals.length - 1].timeTo).format(
    'HH:mm',
  );
  if (intervals.length === 1) {
    delete workingHours.unavailability;
  } else {
    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i + 1]) {
        workingHours.unavailability.push({
          from: moment(intervals[i].timeTo).format('HH:mm'),
          to: moment(intervals[i + 1].timeFrom).format('HH:mm'),
          date: certainDateEdit ? certainDateEdit : undefined,
        });
      }
    }
  }
  if (dayOfWeek) {
    workingHours.day = dayOfWeek.day;
  }
  if (certainDateEdit) {
    workingHours.date = certainDateEdit;
  }
  return workingHours;
};

const workHoursTodate = workHour => {
  const currentDate = new Date();
  let hoursMinutes = workHour.split(':');
  currentDate.setHours(hoursMinutes[0]);
  currentDate.setMinutes(hoursMinutes[1]);
  return currentDate;
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const workingHoursToIntervals = workingHours => {
  const intervals = [];
  if (workingHours?.unavailability?.length === 1) {
    let interval = {
      timeFrom: '',
      timeTo: '',
    };
    interval.timeFrom = workHoursTodate(workingHours.from);
    interval.timeTo = workHoursTodate(
      workingHours.unavailability[0]?.from
        ? workingHours.unavailability[0]?.from
        : workingHours.to,
    );
    intervals.push({...interval});
    interval.timeFrom = workHoursTodate(workingHours.unavailability[0].to);
    interval.timeTo = workHoursTodate(workingHours.to);
    intervals.push({...interval});
  } else {
    const interval = {
      timeFrom: '',
      timeTo: '',
    };
    if (!workingHours.unavailability) {
      interval.timeFrom = workHoursTodate(workingHours.from);
      interval.timeTo = workHoursTodate(workingHours.to);
      intervals.push({...interval});
    } else {
      interval.timeFrom = workHoursTodate(workingHours.from);
      interval.timeTo = workHoursTodate(
        workingHours.unavailability[0]?.from
          ? workingHours.unavailability[0]?.from
          : workingHours.to,
      );
      intervals.push({...interval});
      for (let i = 0; i < workingHours.unavailability?.length; i++) {
        if (!!workingHours.unavailability[i + 1]) {
          interval.timeFrom = workingHours.unavailability[i].to;
          interval.timeTo = workingHours.unavailability[i + 1].from;
        } else {
          interval.timeFrom = workingHours.unavailability[i].to;
          interval.timeTo = workingHours.to;
        }
        intervals.push({...interval});
      }
    }
  }
  return intervals;
};

export const getNotificationBySlug = (notifications, slug) => {
  return notifications.find(n => n.slug === slug);
};

export const checkOnboardingComplete = notifications => {
  const onboardingKeyForCheck = Object.keys(ONBOARDING_SLUGS).map(
    key => ONBOARDING_SLUGS[key],
  );
  return notifications?.every(n => !onboardingKeyForCheck.includes(n.slug));
};
