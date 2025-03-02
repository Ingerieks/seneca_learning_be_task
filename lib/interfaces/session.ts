import { ICourse } from "./course";
import { IUser } from "./user";

export interface ISession {
  sessionId: string;
  totalModulesStudied: number;
  averageScore: number;
  timeStudied: number;
  courseId: ICourse;
  userId: IUser;
}
