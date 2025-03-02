import { ICourse } from "./course";
import { IUser } from "./user";

export interface ISession {
  sessionId: String;
  totalModulesStudied: Number;
  averageScore: Number;
  timeStudied: Number;
  courseId: ICourse;
  userId: IUser;
}
