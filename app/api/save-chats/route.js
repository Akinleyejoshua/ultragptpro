import { NextResponse } from "next/server";
import Chats from "../models/chats";
import db from "../db";
db();

export async function POST(req) {
  const { history_id, chats } = await req?.json();

  const chatExist = await Chats.findOne({ history_id:history_id }).lean();

  if (chatExist) {
    const updateChat = await Chats.findByIdAndUpdate(chatExist._id, { 
        chats: chats,
        history_id:history_id
    });
    return new NextResponse(JSON.stringify(updateChat));
  } else {
    
    const saveChat = new Chats({
      history_id: history_id,
      chats: chats,
    });

    if (saveChat.save()) {
      return new NextResponse(JSON.stringify(saveChat));
    }
  }
}
