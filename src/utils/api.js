import axios from "axios";
import { CHAT_URL, USER_URL } from "./url";

// 创建axios实例
export const UserAPI = axios.create({
  baseURL: USER_URL,
});

export const ChatAPI = axios.create({
  baseURL: CHAT_URL,
});
