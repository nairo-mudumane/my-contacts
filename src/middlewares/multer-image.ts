import path from "path";
import multer from "multer";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";

const limits = {
  fileSize: 1024 * 1024 * 10, // 10MB
  // files: 1,
};

function fileFilter(
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
}

function filename(
  request: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) {
  const now = new Date().toISOString().toLowerCase();
  const name = encodeURIComponent(file.originalname);

  callback(null, `${now}_${name}`);
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.resolve("uploads"));
  },
  filename,
});

export const localUpload = multer({
  storage,
  fileFilter,
  limits,
});
