# Next.js Markdown Blog Template <img src="/logo.png" alt="logo" width="28px" />

![preview](https://i.gyazo.com/f73f986e554ae3275b9407c069cc6041.gif)

## [🔗 Demo](https://nextjs-md-blog-sigma.vercel.app/)

## Features

- [Clerk authentication](#clerk-authentication)
    - [Middleware](#middleware)
- [Prisma database](#prisma)
- [Markdown editor](#markdown-editor)

<details>
    <summary><b>Preview</b></summary>

#### Before Authentication
![before auth](https://i.gyazo.com/e8789ac6ab6629a6b366e8886a841020.png)

---

#### After Authentication
![after auth](https://i.gyazo.com/f1db171173d96e0b81ac39e20c59d295.png)
</details>

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

## Clerk Authentication

Clerk is a very simple authentication tool. 

Rather than going through step by step instructions, give the [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs) guide a look for more information.

### Middleware

Two vital imports are required for the middleware to work & protect the appropriate routes:

- [`clerkMiddleware()`](https://clerk.com/docs/references/nextjs/clerk-middleware)
- [`createRouteMatcher()`](https://clerk.com/docs/references/nextjs/clerk-middleware#create-route-matcher)

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
```

- Per all Next.js middleware, export the [config matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher) to determine what files/routes the middleware function will apply to:
    ```ts
    export const config = {
        matcher: [
            // Skip Next.js internals and all static files, unless found in search params
            '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
            // Always run for API routes
            '/(api|trpc)(.*)',
        ]
    }
    ```
- Create a *route matcher* that declares which routes to protect
    ```ts
    const isAuthenticatedRoute = createRouteMatcher([
        "/blog/new", // Ensure no unauthenticated users can post a blog
    ])
    ```
- Export the clerk middleware (must be exported as **default**) and handle the authenticated route(s)
    ```ts
    export default clerkMiddleware((auth, req) => {
        const { 
            sessionClaims // auth object properties
        } = auth();

        if (isAuthenticatedRoute(req) && !sessionClaims) {
            /**
             * If the request is an authenticated route and there's no auth object properties, redirect to sign in
             */
            auth().redirectToSignIn();
        }
    })
    ```

---

## Prisma

If you're deploying with [Vercel](https://vercel.com/) (recommended): on your dashboard under the **Storage** tab, there is an option to set up a **free** postgres database (regardless of your plan).

Once you've set that up, it should be pretty straight forward to get your `.env` variables to get started with Prisma.

![vercel postgres prisma quickstart](https://i.gyazo.com/b5af554da042dae4cf5cf2aa2739fea3.png)

Prisma should already be installed if you're using this repo; but if not:
```zsh
pnpm add @prisma/client
```
```zsh
pnpm add --save-dev prisma
```

### Setting Up Prisma

1. Prisma init
    ```zsh
    npx prisma init
    ```
    - This will create [`/prisma/schema.prisma`](/prisma/schema.prisma) within the root of your application.
2. Ensure your [generator/client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) & [datasource](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources) are directing to the proper values. In this case:
    ```prisma
    generator client {
        provider = "prisma-client-js"
    }

    datasource db {
        provider  = "postgresql"
        url       = env("POSTGRES_URL")
        directUrl = env("POSTGRES_URL_NON_POOLING")
    }
    ```
3. Generate the prisma client
    ```zsh
    npx prisma generate
    ```
4. Define your prisma client
    ```ts
    /**
     * ~/lib/db.ts
     */
    import { PrismaClient } from "@prisma/client";
    // ...
    ```
5. With any changes to models within your schema, ensure you're pushing and pulling your changes locally:
    ```zsh
    npx prisma db push
    ```
    ```zsh
    npx prisma db pull
    ```
6. Lastly, update your `build` script within your `package.json` to generate your prisma client every time the application is built
    - (Update this script on vercel for production as well)
    ```json
    "scripts": {
        "build": "prisma generate && next build"
    }
    ```
---

## Markdown Editor

The markdown editor comes from the package [`react-mde`](https://github.com/andrerpena/react-mde).

```tsx
"use client";

import { ComponentPropsWithoutRef } from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import "@/styles/mde.css";

type EditorProps = ComponentPropsWithoutRef<typeof ReactMde>;

const Editor = ({ ...props }: EditorProps) => {
    return (
        <ReactMde
            value={props.value}
            onChange={props.onChange}
            selectedTab={props.selectedTab}
            onTabChange={props.onTabChange}
            generateMarkdownPreview={props.generateMarkdownPreview}
            maxEditorHeight={props.maxEditorHeight}
            minEditorHeight={props.minEditorHeight}
        />
    )
}

export default Editor;
```

---

## Issues & Contributions

- Make a [pull request](https://github.com/clxrityy/nextjs-md-blog/pulls)
- Report an [issue](https://github.com/clxrityy/nextjs-md-blog/issues)
- Contact me at [contact@mjanglin.com](mailto:contact@mjanglin.com)

> Thank you <3