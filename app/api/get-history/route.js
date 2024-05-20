import { NextResponse } from "next/server";
import History from "../models/history";
import Chats from "../models/chats";
import db from "../db";
db();

export async function POST(req) {
  const { id, all } = await req.json();
  if (all) {
    const histories = await History.find().lean();
    const chats = await Chats.find({ history_id: histories[0]._id }).lean();
    const data = [];

    histories.forEach((item, i) => {
      data.push({
        ...item,
        evaluation: chats[i]?.evaluation 
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
