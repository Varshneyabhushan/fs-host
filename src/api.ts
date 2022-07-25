import { RequestHandler } from "express";
import { Logger } from "winston";

export interface DownloadConfig {
   downloadPath: string;
   requestTimeout: number;
}

export default function makeFileUploadEndPoint(
   config: DownloadConfig,
   logger: Logger,
): RequestHandler {
   return (req, res) => {};
}
