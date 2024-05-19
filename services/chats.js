import { request } from "@/utils/axios";

export const getChats = async (data) => request.post("/get-chats", data);
export const saveChats = async (data) => request.post("/save-chats", data);