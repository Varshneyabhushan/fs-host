import { RequestHandler } from "express";
import { Logger } from "winston";
import { toErrorObject } from "../utils/conversions";
import { pathExists } from "../utils/fs";
import { DownloadConfig } from "./uploadFile";

export default function makeFileStatusCheckEndpoint(
   config: DownloadConfig,
   logger: Logger,
): RequestHandler {
   return (req, res) => {
      const { path = "" } = req.body;
      const downloadPath = `${config.downloadPath}/${path}`;
      pathExists(downloadPath)
         .then((exists) => res.json({ exists }))
         .catch((e) => res.status(400).json({ error: toErrorObject(e) }));
   };
}
