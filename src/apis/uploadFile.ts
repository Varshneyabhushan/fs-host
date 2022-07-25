import { RequestHandler } from "express";
import { createWriteStream, WriteStream } from "fs";
import { Logger } from "winston";
import { toErrorObject } from "../utils/conversions";
import { ensureDirectoryExistence, pathExists } from "../utils/fs";
import IdleListener from "../utils/IdleListener";
import { getPathForDownloadItem, getStreamFromURL } from "../utils/urls";

export interface DownloadConfig {
   downloadPath: string;
   requestTimeout: number;
}

export interface DownloadItem {
   path: string;
   url: string;
}

export default function makeFileUploadEndPoint(
   config: DownloadConfig,
   logger: Logger,
): RequestHandler {
   return async (req, res) => {
      const { url, path } = req.body;
      const currentItem = { url, path };
      let correctedPath = getPathForDownloadItem(currentItem);
      const downloadPath = `${config.downloadPath}/${correctedPath}`;

      try {
         await downloadUrl(url, downloadPath, config.requestTimeout);
         logger.info("downloaded to : " + downloadPath);
         res.json({ success: true, path: correctedPath });
      } catch (e) {
         let error = toErrorObject(e as Error);

         logger.error({
            message: "error downloading",
            payLoad: {
               url,
               downloadPath,
               error,
            },
         });

         res.status(400).json({ success: false, error });
      }
   };
}

async function downloadUrl(url: string, path: string, timeout: number): Promise<void> {
   return new Promise(async (resolve, reject) => {
      try {
         const readStream = await getStreamFromURL(url, timeout);

         await ensureDirectoryExistence(path);

         let writeStream = createWriteStream(path, {
            flags: "w",
            encoding: "utf-8",
            mode: 0o666,
         });
         let pipe = readStream.pipe(writeStream);
         addTimeoutToStream(pipe, timeout);

         pipe.on("close", () => resolve());
         pipe.on("error", (e) => reject(e));
      } catch (e) {
         reject(e as Error);
      }
   });
}

// when pipe is waiting for too long, it emits error
function addTimeoutToStream(stream: WriteStream, timeout: number) {
   let e = new Error("stream is broke");
   e.name = "STREAM BREAK";

   let listener = new IdleListener(timeout);
   listener.onIdle(() => stream.emit("error", e));

   stream.on("close", () => listener.clear());
   stream.on("drain", () => listener.hit());
}
