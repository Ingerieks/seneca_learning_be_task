import { testApiHandler } from "next-test-api-route-handler"; // Must always be first
import "@testing-library/jest-dom";
import * as appHandler from "../api/courses/[courseId]/sessions/[sessionId]/route";
import dbConnect from "@/lib/mongodb";
import { closeDB } from "@/lib/mongodb";
import { mockSession, courseId, userId } from "../testUtils";

describe("GET /api/courses/[courseId]/sessions/[sessionId]", () => {
  afterAll(() => {
    jest.restoreAllMocks();
    closeDB();
  });

  it("returns a session document with totalModulesStudied, averageScore, timeStudied and sessionId fields", async () => {
    await dbConnect();

    await mockSession.save();

    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = courseId;
        params.sessionId = "AB321";
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
        expect(json).toStrictEqual({
          sessionId: "AB321",
          totalModulesStudied: 2,
          averageScore: 70,
          timeStudied: 1000,
        });
      },
    });
  });

  it("returns an error if userId is missing", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = courseId;
        params.sessionId = "AB321";
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "GET",
        });

        const json = await response.json();
        expect(response.status).toBe(404);
        expect(json).toStrictEqual({
          error: "user id, session id or course id is missing",
        });
      },
    });
  });

  it("returns an error if courseId is invalid", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = "2b3c";
        params.sessionId = "AB321";
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
        expect(response.status).toBe(400);
        expect(json).toStrictEqual({
          error: "user id or course id is not a valid ObjectId",
        });
      },
    });
  });
});
