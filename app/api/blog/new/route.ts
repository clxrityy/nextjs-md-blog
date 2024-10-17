import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { title, previewContent, content, uuid, userId } = await req.json();

    try {
        const blog = await db.blog.create({
            data: {
                title,
                previewContent,
                content,
                uuid,
                userId,
            }
        })

        return NextResponse.json(blog, { status: 201 });
    }
    catch (e: any) {
        console.error(e);
        return NextResponse.json({
            error: `An error occurred while creating the blog post, ${e.message}`
        }, { status: 500 });
    }
}