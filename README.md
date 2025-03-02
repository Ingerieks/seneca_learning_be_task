This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Assumptions

course id that is used in the url and user id that is used in headers should both be valid mongo Object ids, for example 507f1f77bcf86cd799439045 or 507f191e810c19729de860ea. Session id that is sent in the body can be any string, but needs to be unique

## Getting Started

First, to run the development server:

Node version v22.12.0

```bash
npm install
```

Set env variable: MONGODB_URI=<connection string> , for example: MONGODB_URI=mongodb://localhost:27017/stats

```bash
npm run dev
```

## Running the app in production

1. Install the dependencies

Node version v22.12.0

```bash
npm install
```

2. Build app for production:

```bash
npm run build
```

3. Start app:

Set env variable: MONGODB_URI=<connection string> , for example: MONGODB_URI=mongodb://localhost:27017/stats

```bash
npm run start
```

## Tests

To run tests locally:

```bash
npm test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
//npm install
//npm run build - builds production bundle
//npm run start - runs production bundle
//npm test
//docker & docker compose
//
