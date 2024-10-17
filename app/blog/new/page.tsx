import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BlogForm = dynamic(() => import("@/components/Form"), {
    ssr: false,
});

export default async function Page() {

    const user = await currentUser();

    if (!user) {
        return null;
    }

    return <div className="mt-20 w-screen flex items-center justify-center">
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <BlogForm user={JSON.parse(JSON.stringify(user))} />
            </Suspense>
        </div>
    </div>
}