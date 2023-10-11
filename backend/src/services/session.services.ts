import { FilterQuery } from "mongoose";
import SessionModel, { SessionInterface } from "../models/session.models";

export async function createSessionService(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent: userAgent,
  });

  return session.toJSON();
}

export async function findSessionService(
  query: FilterQuery<SessionInterface>
) {
  return SessionModel.find(query);
}
