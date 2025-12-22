import connectDB from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        await connectDB();
        const users = await User.find();
        return NextResponse.json(users);
    } catch (err) {
        console.error("API ERROR:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();

    const user = await User.create(body);
    return NextResponse.json(user);
}
