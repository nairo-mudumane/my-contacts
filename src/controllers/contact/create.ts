import type { Request, Response } from "express";

export async function create(request: Request, response: Response) {
  return response.json({ ok: true });
}
