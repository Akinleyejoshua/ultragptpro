import { NextResponse } from "next/server";
import History from "../models/history";
import db from "../db";
db();

export async function POST(req){
    const {id, all} = await req.json();
    if (all){
        const histories = await History.find().lean();
        return new NextResponse(JSON.stringify(histories));
    } else {
        const history = await History.find({_id: id}).lean();
        return new NextResponse(JSON.stringify(history));
    }
}