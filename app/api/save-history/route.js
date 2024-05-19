import { NextResponse } from "next/server";
import History from "../models/history";
import db from "../db";
db();

export async function POST(req) {
    const {
        title,
        path,
        name,
        role,
        role_id,
    } = await req?.json();

    const saveHistory = new History({
        title:title,
        path:path,
        name:name,
        role:role,
        role_id:role_id
    })

    if (saveHistory.save()){
        return new NextResponse(JSON.stringify(saveHistory))
    }
    
}
