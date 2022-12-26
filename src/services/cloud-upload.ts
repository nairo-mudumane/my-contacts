import type { IMediaStorage } from "../@types";
import { removeFile, removeMultipleFiles } from "../resources";
import { mediaStorage } from "./database";

export class CloudUpload {
  private env = process.env.ENV;
  async single(config: IMediaStorage) {
    try {
      const fileLink = await mediaStorage
        .upload(config.filepath, {
          public: true,
          destination: `${this.env}/${config.destination}/${config.filename}`,
        })
        .then(async (response) => {
          await removeFile(config.filepath);
          return response[0].metadata.mediaLink as string;
        });

      return fileLink;
    } catch (error: Error | any) {
      await removeFile(config.filepath);
      return undefined;
    }
  }

  async multiple(config: IMediaStorage[]) {
    try {
      let links: string[];

      config.forEach(async (file) => {
        await mediaStorage
          .upload(file.filepath, {
            public: true,
            destination: `${this.env}/${file.destination}/${file.filename}`,
          })
          .then(async (response) => {
            await removeFile(file.filepath);
            links.push(response[0].metadata.mediaLink as string);
          });
      });
    } catch (error: Error | any) {
      const paths: string[] = [];
      config.forEach((file) => {
        paths.push(file.filepath);
      });
      removeMultipleFiles(paths);
      return undefined;
    }
  }
  constructor() {}
}
