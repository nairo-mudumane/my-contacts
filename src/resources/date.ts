import { ITimeStamps } from "../@types/data";

type IType = "create" | "update";

export function generateTimestamps(type: IType): ITimeStamps {
  const now = String(new Date());

  if (type === "update") return { updatedAt: now };

  return { createdAt: now, updatedAt: now };
}
