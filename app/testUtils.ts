import { Session } from "@/lib/models/session";

export const courseId = "67bdfe40599c7540a1aa5c76";
export const userId = "67bc9444b1853b27d338f4b1";

export const mockSession = new Session({
  sessionId: "AB321",
  totalModulesStudied: 2,
  averageScore: 70,
  timeStudied: 1000,
  userId: userId,
  courseId: courseId,
});

export const mockSession_b = new Session({
  sessionId: "AB234",
  totalModulesStudied: 3,
  averageScore: 65,
  timeStudied: 1500,
  userId: userId,
  courseId: courseId,
});

export const mockSession_c = new Session({
  sessionId: "AB576",
  totalModulesStudied: 4,
  averageScore: 80,
  timeStudied: 2000,
  userId: userId,
  courseId: courseId,
});

export const lifetimeStats = {
  totalModulesStudied: 9,
  averageScore: 71.67,
  timeStudied: 4500,
};

export const mockDuplicateSession = new Session({
  sessionId: "AB234",
  totalModulesStudied: 3,
  averageScore: 67,
  timeStudied: 1230,
});

export const reqBody = JSON.stringify({
  sessionId: "AB234",
  totalModulesStudied: 3,
  averageScore: 67,
  timeStudied: 1230,
});
