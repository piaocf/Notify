export const DBNAME = 'notify-db';
export const DBVERSION = 1;
// if you want to run the gui separate from the api, change this to to your api location example: "http://localhost:8787/api"
export const APIBASE = (typeof process !== 'undefined') ? process?.env?.PREACT_APP_BACKEND_URL ?? "/api" : "/api";