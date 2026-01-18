// Change this one line to update your backend location for the whole app
export const BASE_URL = "http://localhost:8090";

export const ENDPOINTS = {
  BASE_URL: BASE_URL, // Expose BASE_URL for dynamic routes
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  RUN_ASSESSMENT: `${BASE_URL}/api/assessment/run`,
  RUN_WEEKLY_ASSESSMENT: `${BASE_URL}/api/assessment/runWeeklyAssessment`,
};