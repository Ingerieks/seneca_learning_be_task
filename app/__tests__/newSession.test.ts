import { testApiHandler } from "next-test-api-route-handler"; // Must always be first
import "@testing-library/jest-dom";
import * as appHandler from "../api/courses/[courseId]/route";
import dbConnect from "@/lib/mongodb";
import { Session } from "@/lib/models/session";
import { closeDB } from "@/lib/mongodb";
const body = JSON.stringify({
  sessionId: 543,
  totalModulesStudied: 3,
  averageScore: 67,
  timeStudied: 1230,
});

describe("POST /api/courses/[courseId]", () => {
  afterAll(() => {
    closeDB();
  });

  it("successfully creates a new session", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = "67bdfe40599c7540a1aa5c76";
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            userId: "67bc9444b1853b27d338f4b1",
          },
          body: body,
        });
        const json = await response.json();
        expect(response.status).toBe(201);
        await expect(json).toStrictEqual({
          description: "Created",
        });
      },
    });
  });

  it("returns an error if courseId is not valid", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = "123";
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            userId: "67bc9444b1853b27d338f4b1",
          },
          body: body,
        });
        const json = await response.json();
        expect(response.status).toBe(404);
        await expect(json).toStrictEqual({
          error: "UserId or CourseId is missing or is not a valid ObjectId",
        });
      },
    });
  });

  it("returns an error if userId is missing", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = "67bdfe40599c7540a1aa5c76";
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            userId: "",
          },
          body: body,
        });
        const json = await response.json();
        expect(response.status).toBe(404);
        await expect(json).toStrictEqual({
          error: "UserId or CourseId is missing or is not a valid ObjectId",
        });
      },
    });
  });

  it("returns session id already exists", async () => {
    await dbConnect();

    const existingSession = new Session({
      sessionId: 123,
      totalModulesStudied: 2,
      averageScore: 66,
      timeStudied: 4636,
      userId: "67bc9444b1853b27d338f4b1",
      courseId: "67bdfe40599c7540a1aa5c76",
    });
    await existingSession.save();

    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = "67bdfe40599c7540a1aa5c76";
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            userId: "67bc9444b1853b27d338f4b1",
          },
          body: body,
        });
        const json = await response.json();
        expect(response.status).toBe(500);
        await expect(json).toStrictEqual({
          error: "This session id already exists",
        });
      },
    });
  });
});
