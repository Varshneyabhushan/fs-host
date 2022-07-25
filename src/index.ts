import config from "./config";
import express from "express";
import { getAddressInfo } from "./utils/conversions";

import createWinstonLogger from "./logger";
import makeFileUploadEndPoint from "./apis/uploadFile";
import makeFileStatusCheckEndpoint from "./apis/checkFile";

const logger = createWinstonLogger(config.logPath);

const app = express();
app.use(express.json());

const listener = app.listen(config.port, () => {
   logger.info(`app is listening on: ${getAddressInfo(listener.address())}`);
});

listener.on("error", (e) => logger.error({ message: `error while starting the server`, error: e }));

app.post("/files", makeFileUploadEndPoint(config.downloadConfig, logger));
app.post("/exists", makeFileStatusCheckEndpoint(config.downloadConfig, logger));

//hosting images
app.use("/images", express.static(config.downloadConfig.downloadPath));

app.use("*", (_, res) => res.status(404).send({ success: false, message: "not a valid route" }));
