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

Api is available on http://localhost:3000

1. When a new session is completed, a post request is sent to http://localhost:3000/api/courses/[coursseId], for example http://localhost:3000/api/courses/507f1f77bcf86cd799439047, with userId in the header, and a body: {
   "sessionId": "A123",
   "totalModulesStudied": 2,
   "averageScore": 70,
   "timeStudied": 1500
   }

2. A GET request can be made to http://localhost:3000/api/courses/507f1f77bcf86cd799439047, where stats can be fetched for the course, with aggregates of a user's session stats for that course. userId needs to be sent in the header

3. A GET request can be made to http://localhost:3000/api/courses/507f1f77bcf86cd799439047/sessions/[sessionId], for example http://localhost:3000/api/courses/sessions/A123, to see the stats for that session
