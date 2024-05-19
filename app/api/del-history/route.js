import { NextResponse } from "next/server";
import History from "../models/history";
import Chats from "../models/chats";

import db from "../db";
db();

export async function POST(req) {
  const { id, all } = await req.json();
  if (all) {
    const histories = await History.deleteMany().lean();
    await Chats.deleteMany().lean();
    return new NextResponse(JSON.stringify(histories));
  } else {
    const history = await History.deleteOne({ _id: id }).lean();
    await Chats.deleteOne({ history_id: id }).lean();
    return new NextResponse(JSON.stringify(history));
  }
}
