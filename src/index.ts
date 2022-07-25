import config from "./config";
import express from "express";
import { getAddressInfo } from "./utils/conversions";

import createWinstonLogger from "./logger";
import makeFileUploadEndPoint from "./api";
const logger = createWinstonLogger(config.logPath);

const app = express();

const listener = app.listen(config.port, () => {
   logger.info(`app is listening on: ${getAddressInfo(listener.address())}`);
});

listener.on("error", (e) => logger.error({ message: `error while starting the server`, error: e }));

app.use("/files", makeFileUploadEndPoint(config.downloadConfig, logger));

//hosting images
app.use("/images", express.static(config.downloadConfig.downloadPath));

app.use("*", (_, res) => res.status(404).send({ success: false, message: "not a valid route" }));
