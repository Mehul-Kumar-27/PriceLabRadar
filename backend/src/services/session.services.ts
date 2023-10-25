import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionInterface } from "../models/session.models";

export async function createSessionService(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent: userAgent,
  });

  return session.toJSON();
}

export async function findSessionService({ userId }: { userId: string }) {
  try {
    const sessions = await SessionModel.find({ user: userId });
    return sessions;
  } catch (error: any) {
    throw new Error(error)
  }




}

export async function updateSession(query: FilterQuery<SessionInterface>, update: UpdateQuery<SessionInterface>) {
  return await SessionModel.updateOne(query, update)
}