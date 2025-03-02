import { testApiHandler } from "next-test-api-route-handler"; // Must always be first
import "@testing-library/jest-dom";
import * as appHandler from "../api/courses/[courseId]/route";
import { closeDB } from "@/lib/mongodb";
import { reqBody, courseId, userId } from "../testUtils";

describe("POST /api/courses/[courseId]", () => {
  afterAll(() => {
    jest.restoreAllMocks();
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
        expect(json).toStrictEqual("Created");
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
        expect(json).toStrictEqual({
          error: "user id or course id is not a valid ObjectId",
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
          body: reqBody,
        });
        const json = await response.json();
        expect(response.status).toBe(404);
        expect(json).toStrictEqual({
          error: "user id or course id is missing",
        });
      },
    });
  });
});
