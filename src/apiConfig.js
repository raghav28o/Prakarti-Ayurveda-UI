// Change this one line to update your backend location for the whole app
export const BASE_URL = "http://localhost:8090";

export const ENDPOINTS = {
  BASE_URL: BASE_URL, // Expose BASE_URL for dynamic routes
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  GOOGLE_AUTH: `${BASE_URL}/oauth2/authorization/google`,
  GET_USER_PROFILE: `${BASE_URL}/api/users/me`,
  RUN_ASSESSMENT: `${BASE_URL}/api/assessment/run`,
  RUN_WEEKLY_ASSESSMENT: `${BASE_URL}/api/assessment/runWeeklyAssessment`,
  ASSESSMENT_HISTORY: `${BASE_URL}/api/assessment/history`,
};