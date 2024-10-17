"use client";
import converter from "@/utils/converter";
import { Blog } from "@prisma/client";
import Link from "next/link";
import { Preview } from "react-mde";

interface BlogProps {
    blog: Blog;
}

export default function BlogComponent({ blog }: BlogProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-5 mt-20">
            <h1 className="text-4xl font-bold">
                {blog.title}
            </h1>
            <p className="text-lg font-light">
                {blog.previewContent}
            </p>
            <hr className="w-full border" />
            <div className="py-10 px-10">
                <Preview
                    markdown={blog.content}
                    minHeight={400}
                    generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
                    heightUnits="px"
                />
            </div>
        </div>
    );
}

export function BlogPreview({ blog }: BlogProps) {
    return (
        <div className="px-4 py-2 grid gap-3">
            <Link href={`/blog/${blog.uuid}`} className="hover:underline hover:text-blue-600 transision duration-150 ease-in">
                <h1>
                    {blog.title}
                </h1>
            </Link>
            <p>
                {blog.previewContent}
            </p>
            <div className="w-full px-4">
                <p className="text-xs lg:text-sm text-gray-600 font-mono uppercase tracking-tight absolute bottom-2 right-6">
                    {new Date(blog.createdAt).toDateString()}
                </p>
            </div>
        </div>
    )
}