import { request } from "@/utils/axios";

export const saveHistory = async (data) => request.post("/save-history", data);
export const getHistory = async (data) => request.post("/get-history", data);
export const delHistory = async (data) => request.post("/del-history", data);