"use client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import Input from "./ui/Input";
import Editor from "./Editor";
import { useState } from "react";
import converter from "@/utils/converter";
import Textarea from "./ui/Textarea";
import { User } from "@clerk/nextjs/server";
import { BASE_URL } from "@/config";
import { useRouter } from "next/navigation";

export const blogFormSchema = z.object({
    title: z.string().min(5).max(98),
    previewContent: z.string().min(5).max(200),
    content: z.string().min(5),
    uuid: z.string().uuid(),
    userId: z.string(),
});

type BlogFormProps = {
    user: User;
}

const BlogForm = ({ user }: BlogFormProps) => {

    const [content, setContent] = useState<string>("Hello, **world**!");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
    const [title, setTitle] = useState<string>("");
    const [previewContent, setPreviewContent] = useState<string>("");
    const uuid = uuidv4();

    const router = useRouter();

    async function handleSubmit(data: z.infer<typeof blogFormSchema>) {
        try {
            const res = await fetch(`${BASE_URL}/api/blog/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                
            }
        } catch (e) {
            console.error(e);
        } finally {
            return router.push(`/blog/${uuid}`);
        }
    }

    return <div className="mt-20 w-screen flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
            <form className="flex flex-col items-center justify-center gap-5 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full">
                    <Input type="text" name="title" placeholder="Title" onChange={(e) => {
                        e.preventDefault();
                        setTitle(e.target.value);
                    }} />
                    <Textarea name="previewContent" className="w-2/3 md:w-1/3 lg:w-1/4" placeholder="Blog preview content" onChange={(e) => {
                        e.preventDefault();
                        setPreviewContent(e.target.value);
                    }} />
                </div>
                <Editor
                    textAreaComponent={Textarea}
                    value={content}
                    onChange={(e) => setContent(e)}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
                    maxEditorHeight={500}
                    minEditorHeight={200}
                />
                {/* <div className="hidden">
                    <input type="text" name="uuid" value={uuid} />
                    <input type="text" name="userId" value={user.id} />
                </div> */}
                <button
                    className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-lg font-semibold focus:ring focus:ring-offset-2 focus:ring-offset-[var(--foreground)] focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit({
                            title,
                            previewContent,
                            content,
                            uuid,
                            userId: user.id
                        });
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
}

export default BlogForm;