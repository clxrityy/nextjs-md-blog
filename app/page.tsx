import logo from "@/logo.png";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";
import { BlogPreview } from "@/components/Blog";
import { ICONS } from "@/utils/icons";

export default async function Home() {

  const user = await currentUser();

  const blogs = await db.blog.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row gap-8 items-center justify-center lg:justify-between lg:shadow-2xl lg:h-screen  lg:shadow-slate-500 overflow-y-scroll scroll-smooth">
      <div className="flex flex-col items-center justify-center gap-8 mx-auto w-full lg:border-r h-screen min-w-80">
        <div className="flex flex-col lg:flex-row gap-1 items-center h-screen justify-center">
        </div>
        <Image src={logo} alt="logo" width={100} height={100} className="drop-shadow-md" />
        <h1>
          Next.js Markdown Blog
        </h1>
        <p>
          A simple markdown blog built with Next.js
        </p>
        <div className="w-full border-b flex items-center justify-center pb-10 drop-shadow-md">
          {
            !user ? (
              <button className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-lg font-semibold">
                <Link href="/sign-in">
                  Sign In
                </Link>
              </button>
            ) : (
              <button className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-lg font-semibold">
                <Link href="/blog/new">
                  Create Post
                </Link>
              </button>
            )
          }
        </div>
        <div className="hidden lg:block w-full">
          <div className="w-full flex items-center justify-center gap-5">
            <div className="w-3/4 flex flex-col items-center justify-center mx-auto gap-3 border px-7 py-6 relative rounded-md shadow-md hover:shadow-2xl transition-all duration-200 ease-linear cursor-pointer">
              <h1 className="text-center w-full">
                Tech Stack
              </h1>
              <ul className="w-full grid gap-2 list-disc *:flex *:flex-row *:gap-1">
                <li>
                  <Link href={"/"} className="link">
                    <ICONS.clerk /> Clerk
                  </Link> — authentication & middleware
                </li>
                <li>
                <Link href={"/"} className="link">
                    <ICONS.prisma /> Prisma
                  </Link> — database
                </li>
                <li>
                <Link href={"/"} className="link">
                    <ICONS.nextjs /> Next.js
                  </Link> — frontend framework
                </li>
                <li>
                <Link href={"/"} className="link">
                    <ICONS.tailwindcss /> Tailwind CSS
                  </Link> — styling
                </li>
                <li>
                <Link href={"/"} className="link">
                    <ICONS.markdown /> React MDE
                  </Link> — markdown editor
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-col flex items-center justify-center lg:h-screen my-10">
        <div className="w-full flex items-stretch justify-center h-fit flex-col mx-10 gap-5">
          {
            blogs.map((blog) => (
              <div key={blog.id} className="w-1/2 flex flex-col items-center justify-center mx-auto gap-3 border px-7 py-6 relative rounded-md shadow-md hover:shadow-2xl transition-all duration-200 ease-linear cursor-pointer">
                <BlogPreview blog={blog} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
