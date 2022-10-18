This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

You can start editing the .env.example file by modifying the environment variables and renaming the file to .env.local.

There are two environment variables that you need to set:

- CONTENTFUL_SPACE_ID - The ID of your Contentful space.
- CONTENTFUL_ACCESS_KEY - The access token for your Contentful space.
- NEXT_PUBLIC_CONTENTFUL_SPACE_ID - Sorry for this, but this is a workaround for the fact that Next.js doesn't allow you to use normal environment variables in frontend components and passing data from pages causes mismatch between backend and frontend. This is the ID of your Contentful space.
- NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY - The same as above, but for the access token.