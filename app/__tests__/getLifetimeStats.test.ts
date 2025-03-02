import { testApiHandler } from "next-test-api-route-handler"; // Must always be first
import "@testing-library/jest-dom";
import * as appHandler from "../api/courses/[courseId]/route";
import dbConnect from "@/lib/mongodb";
import { closeDB } from "@/lib/mongodb";
import {
  mockSession,
  mockSession_b,
  mockSession_c,
  lifetimeStats,
  courseId,
  userId,
} from "../testUtils";

const body = JSON.stringify({
  sessionId: 543,
  totalModulesStudied: 3,
  averageScore: 67,
  timeStudied: 1230,
});

describe("GET /api/courses/[courseId]", () => {
  afterAll(() => {
    closeDB();
  });

  it("returns a session document with totalModulesStudied, averageScore and timeStudied fields", async () => {
    await dbConnect();

    mockSession;
    await mockSession.save();
    mockSession_b;
    await mockSession_b.save();
    mockSession_c;
    await mockSession_c.save();

    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = courseId;
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
          headers: {
            userId: userId,
          },
        });

        const json = await response.json();
        expect(response.status).toBe(200);
        expect(json).toStrictEqual(lifetimeStats);
      },
    });
  });

  it("returns an error if userId is missing", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = courseId;
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
        });

        const json = await response.json();
        expect(response.status).toBe(404);
        await expect(json).toStrictEqual({
          error: "UserId or CourseId is missing",
        });
      },
    });
  });

  it("returns an error if courseId is invalid", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = "2b3c";
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
          headers: {
            userId: userId,
          },
        });

        const json = await response.json();
        expect(response.status).toBe(404);
        await expect(json).toStrictEqual({
          error: "UserId or CourseId is not a valid ObjectId",
        });
      },
    });
  });
});
