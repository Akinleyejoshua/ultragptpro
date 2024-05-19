import { NextResponse } from "next/server";
import Chats from "../models/chats";
import db from "../db";
db();

export async function POST(req){
    const {history_id, all} = await req.json();
    if (all){
        const chat = await Chats.find().lean();
        return new NextResponse(JSON.stringify(chat));
    } else {
        const chat = await Chats.findOne({history_id: history_id}).lean();
        return new NextResponse(JSON.stringify(chat));
    }
}