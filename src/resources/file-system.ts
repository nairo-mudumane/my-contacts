import fs from "fs";

type IConfig = { ignoreErrors: boolean };

export async function removeFile(
  path: string,
  config?: IConfig
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      fs.unlink(path, (error) => {
        if (error) {
          if (config && config.ignoreErrors) return resolve();
          return reject(error);
        }
        return resolve();
      });
    } catch (error) {
      if (config && config.ignoreErrors) return resolve();
      return reject(error);
    }
  });
}

export async function removeMultipleFiles(paths: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      paths.forEach(async (path) => {
        fs.unlink(path, (error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      });
    } catch (error) {
      return reject(error);
    }
  });
}
