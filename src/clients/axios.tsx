import axios from "axios";

/**
 * Axios instance for API backend requests.
 * This instance is configured with the base URL and default headers.
 */

const ApiBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { ApiBackend };
