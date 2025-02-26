import { io } from "socket.io-client";
import { API_URL } from "./api_url";

const socket = io(API_URL, {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": API_URL
  },
});

export default socket;
