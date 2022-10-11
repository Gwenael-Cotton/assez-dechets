const USER_NOT_FOUND = 'User not found';
const INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password';
const NOT_AUTHENTICATED = 'Not authenticated';
const REFRESH_TOKEN_MISSING = 'Refresh token is missing';
const AUTH_TOKEN_MISSING = 'Auth token is missing';
const MISSING_EMAIL_PASSWORD = 'Missing email or password in parameters';

const EVENT_NOT_FOUND = 'Event not found';
const START_DATE_MUST_BE_AFTER_TODAY = 'You must create an event in the future';
const END_DATE_MUST_BE_AFTER_START_DATE = 'End date must be after start date';
const EVENT_DELETED = 'Event deleted';

const JWT_ISSUER = 'assez-dechets';
const UNAUTHORIZED = 'Unauthorized';
const JWT_ERROR = 'JsonWebTokenError';

module.exports = {
  USER_NOT_FOUND,
  INVALID_EMAIL_OR_PASSWORD,
  NOT_AUTHENTICATED,
  REFRESH_TOKEN_MISSING,
  AUTH_TOKEN_MISSING,
  MISSING_EMAIL_PASSWORD,
  EVENT_NOT_FOUND,
  START_DATE_MUST_BE_AFTER_TODAY,
  END_DATE_MUST_BE_AFTER_START_DATE,
  EVENT_DELETED,
  JWT_ISSUER,
  UNAUTHORIZED,
  JWT_ERROR,
};
