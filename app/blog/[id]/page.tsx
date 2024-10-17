import BlogComponent from "@/components/Blog";
import { db } from "@/lib/db";

type Props = {
    params: {id: string};
}

export default async function Page({ params }: Props) {

    const blog = await db.blog.findFirst({
        where: {
            uuid: params.id
        }
    });

    if (!blog) {
        return (
            <div>
                <h1>
                    Blog not found
                </h1>
            </div>
        )
    }

    return <div className="my-20">
        <BlogComponent blog={blog} />
    </div>
}