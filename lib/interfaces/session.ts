import { IUser } from "./user";

export interface ISession {
  //sessionId: String;
  totalModulesStudied: Number;
  averageScore: Number;
  timeStudied: Number;
  courseId: String;
  userId: IUser;
}
