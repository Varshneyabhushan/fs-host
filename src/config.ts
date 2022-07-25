import { config } from "dotenv";
import { DownloadConfig } from "./api";
import { toNumber } from "./utils/conversions";
config();

let {
   PORT = "80",
   LOG_PATH: logPath = "logs",
   DOWNLOAD_PATH: downloadPath = "~/Downloads",
   REQUEST_TIME_OUT = "5000",
} = process.env;

let port = toNumber(PORT) ?? 80;
let requestTimeout = toNumber(REQUEST_TIME_OUT) ?? 5000;

export default {
   port,
   logPath,
   downloadConfig: {
      downloadPath,
      requestTimeout,
   } as DownloadConfig,
};
