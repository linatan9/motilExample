import {icons, colors} from './index';
import React from 'react';
export const BASE_URL = 'https://dev-motil-api.herokuapp.com/';
import {translate} from '../i18n';

export const CALLBACK_LINK_FOR_STRIPE = {
  prefixes: [
    'https://dev-motil-api.herokuapp.com/specialist/wh/stripe/connect',
  ],
  config: {
    screens: {
      SignIn: 'stripe',
      parse: {
        code: code => code,
      },
    },
  },
};

export const ACCOUNT_SOCIAL_TYPES = {
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
  APPLE: 'APPLE',
};

export const WEB_CLIENT_ID =
  '844550719526-30t1bqdlarquovqna2l4093gl3g1g0g5.apps.googleusercontent.com';

export const STRIPE_CLIENT_DEV = 'ca_EmzVBqWKyDHHTLluXvVymBXMDLsGJJK0';

export const WEEKDAYS_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const WEEKDAYS_NUMBER = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

export const FIREBASE_RESPONSE_CODES = {
  USER_EXIST: 'auth/email-already-in-use',
  USER_NOT_FOUND: 'auth/user-not-found',
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_WEAK_PASSWORD: 'auth/weak-password',
  INVALID_PASSWORD: 'auth/wrong-password',
};

export const TOP_ERRORS = {
  [FIREBASE_RESPONSE_CODES.INVALID_EMAIL]:
    'The email address is badly formatted.',
  [FIREBASE_RESPONSE_CODES.INVALID_WEAK_PASSWORD]:
    'Password should be at least 6 characters.',
  [FIREBASE_RESPONSE_CODES.USER_EXIST]: 'The email address is already in use.',
  [FIREBASE_RESPONSE_CODES.USER_NOT_FOUND]:
    'There is no user record corresponding to this identifier.',
  [FIREBASE_RESPONSE_CODES.INVALID_PASSWORD]: 'The password is invalid.',
};

export const SCHEDULE_SUMMARY_ITEMS_NAMES = {
  WORKING_HOURS: 'WorkingHours',
  REST_DAYS: 'RestDays',
  WORKING_DAYS: 'WorkingDays',
};

export const BOOKING_STATUSES = {
  ASSIGNED: 'ASSIGNED',
  ACCEPTED: 'ACCEPTED',
  STARTED: 'STARTED',
  DECLINE: 'DECLINE',
  FAILED: 'FAILED',
  CANCEL: 'CANCEL',
  DELETED: 'DELETED',
  SUCCESSFUL: 'SUCCESSFUL',
};

export const STATUS_COLOR_MAP = {
  [BOOKING_STATUSES.ASSIGNED]: colors.yellow,
  [BOOKING_STATUSES.ACCEPTED]: colors.acceptedStatusColor,
  [BOOKING_STATUSES.STARTED]: colors.startedStatusColor,
  [BOOKING_STATUSES.DECLINE]: colors.red,
  [BOOKING_STATUSES.FAILED]: colors.red,
  [BOOKING_STATUSES.CANCEL]: colors.red,
  [BOOKING_STATUSES.DELETED]: colors.red,
  [BOOKING_STATUSES.SUCCESSFUL]: colors.green,
};

export const BOOKINGS_TABS = {
  UPCOMING: 'Upcoming',
  HISTORY: 'History',
};

export const CONNECTS_TYPE = {
  WHATS_APP: 'WHATS_APP',
  FACEBOOK: 'FACEBOOK',
  PHONE: 'PHONE',
};

export const LANGUAGES = {
  ENGLISH: 'ENGLISH',
  SPANISH: 'SPANISH',
};

export const TRANSPORTS = {
  FOOT: 'FOOT',
  BIKE: 'BIKE',
  TRUCK: 'TRUCK',
  MOTORCYCLE: 'MOTORCYCLE',
  CAR: 'CAR',
};

export const ONBOARDING_SLUGS = {
  SPECIALIST_BACKGROUND_CHECK: 'specialist-background-check', //
  SPECIALIST_SETUP_STRIPE: 'specialist-setup-stripe', //
  SPECIALIST_SETUP_SERVICE: 'specialist-setup-service', //
  SPECIALIST_SETUP_SCHEDULE: 'specialist-setup-schedule', //
  SPECIALIST_SHARE_SCHEDULE: 'specialist-share-schedule', //
};

export const MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY =
  'MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY';
export const PUSH_NOTIFICATIONS_TYPES = {
  SPECIALIST_CHECKR_VERIFIED: 'specialist_checkr_verified',
  SPECIALIST_GOT_PAID: 'specialist_got_paid',
  SPECIALIST_NEW_TASK: 'specialist_new_task',
};

export const REQUIRED_TEXT = translate(
  'settingsNavigation.editPersonalInfo.fieldIsRequired',
);

export const EMAIL_REG_EXP =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PHONE_REG_EXP =
  /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;
