import { testApiHandler } from "next-test-api-route-handler"; // Must always be first
import "@testing-library/jest-dom";
import * as appHandler from "../api/courses/[courseId]/route";

describe("POST /api/courses/[courseId]", () => {
  it("creates a new session", async () => {
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
          body: JSON.stringify({
            sessionId: 456,
            totalModulesStudied: 3,
            averageScore: 75,
            timeStudied: 1230,
          }),
        });
        const json = await response.json();
        expect(response.status).toBe(201);
        await expect(json).toStrictEqual({
          description: "Created",
        });
      },
    });
  });
});
