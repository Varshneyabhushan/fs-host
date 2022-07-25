import { promises } from "fs";
import { dirname } from "path";

export function ensureDirectoryExistence(filePath: string): Promise<void> {
   let directoryName = dirname(filePath);
   return promises
      .stat(directoryName)
      .then(() => {})
      .catch(() =>
         ensureDirectoryExistence(directoryName).then(() => promises.mkdir(directoryName)),
      );
}

export function pathExists(path: string): Promise<boolean> {
   return promises
      .stat(path)
      .then(() => true)
      .catch((e) => false);
}
