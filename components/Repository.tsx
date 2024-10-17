import { GithubRepo } from "@birdgg/react-github";

export default function Repository() {
    return <div className="hover:scale-110 cursor-pointer rounded-lg hover:drop-shadow-2xl transition-all duration-75 ease-out">
        <GithubRepo repo="clxrityy/nextjs-md-blog" />
    </div>
}