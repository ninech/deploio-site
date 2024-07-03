import axios from "axios";

import { config } from "config";

const apiUrl = config.VITE_API_URL;
const apiUsername = config.VITE_API_USERNAME;
const apiPassword = config.VITE_API_PASSWORD;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Basic ${btoa(`${apiUsername}:${apiPassword}`)}`,
  },
});
