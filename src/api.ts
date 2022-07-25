import { RequestHandler } from "express";

export interface DownloadConfig {
   downloadPath: string;
   requestTimeout: number;
}

export default function makeFileUploadEndPoint(config: DownloadConfig): RequestHandler {
   return (req, res) => {};
}
