import { NextResponse } from "next/server";
import History from "../models/history";
import Chats from "../models/chats";
import db from "../db";
db();

export async function POST(req) {
  const { id, all } = await req.json();
  if (all) {
    const histories = await History.find().lean();
    const chats = await Chats.find().lean();
    const data = [];

    histories.forEach((item, i) => {
      const findChats = chats.find(x => x.history_id == item?._id)
      data.push({
        ...item,
        evaluation: findChats?.evaluation,
        chats: findChats?.chats?.length
      });
    });

    return new NextResponse(
      JSON.stringify(data)
    );
  } else {
    return new NextResponse(
      JSON.stringify(id)
    );
  }
}
