import GitRepo from "github-embed-repo";

export default function Repository() {
    return <GitRepo
        user="clxrityy"
        repo="nextjs-md-blog"
        options={{
            component: "card",
            statsToShow: [
                "stars",
                "forks",
                "watchers",
                "issues",
                "pull_requests",
                "contributors"
            ],
            theme: "light",
            showProfile: true,
        }}
    />
}