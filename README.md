# Next.js Markdown Blog Template <img src="/logo.png" alt="logo" width="28px" />



## Features

- Clerk authentication
    - Middleware
- Prisma database
- Markdown blog editor
    - Post & view blogs

## Set up

##### Clone or use the template
```zsh
git clone https://github.com/clxrityy/nextjs-md-blog.git
```
##### Include your [`.env`](/.env.example) variables
```env
POSTGRES_URL=""
POSTGRES_URL_NON_POOLING=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
```

- Acquire your `POSTGRES_URL` & `POSTGRES_URL_NON_POOLING` through vercel
    - See [this guide](https://vercel.com/docs/storage/vercel-postgres) on Postgres with Vercel
- Get your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY` on your [clerk dashboard](https://dashboard.clerk.com/)

---