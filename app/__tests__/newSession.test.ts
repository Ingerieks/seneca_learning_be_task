import { testApiHandler } from "next-test-api-route-handler"; // Must always be first
import "@testing-library/jest-dom";
import * as appHandler from "../api/courses/[courseId]/route";
import dbConnect from "@/lib/mongodb";
import { Session } from "@/lib/models/session";
import { closeDB } from "@/lib/mongodb";
import {
  mockSession,
  reqBody,
  courseId,
  userId,
  mockDuplicateSession,
} from "../testUtils";

describe("POST /api/courses/[courseId]", () => {
  afterAll(() => {
    closeDB();
  });

  it("successfully creates a new session", async () => {
    await testApiHandler({
      paramsPatcher(params) {
        params.courseId = courseId;
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            userId: userId,
          },
          body: reqBody,
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
        params.courseId = "1a";
      },
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: "POST",
          headers: {
            userId: userId,
          },
          body: reqBody,
        });
        const json = await response.json();
        expect(response.status).toBe(404);
        await expect(json).toStrictEqual({
          error: "UserId or CourseId is not a valid ObjectId",
        });
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
          method: "POST",
          headers: {
            userId: "",
          },
          body: reqBody,
        });
        const json = await response.json();
        expect(response.status).toBe(404);
        await expect(json).toStrictEqual({
          error: "UserId or CourseId is missing",
        });
      },
    });
  });
});
