import 'dotenv/config';

export const API_URL = process.env.API_URL;
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = process.env.KEY;
export const MODAL_CLOSE_SEC = 2.5;

console.log(process.env.API_URL);
console.log(process.env.KEY);
