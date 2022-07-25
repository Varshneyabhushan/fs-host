import winston from "winston";

//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6

export default function createLogger(folderPath: string) {
   let newTransport = (level: string, filePath: string) =>
      new winston.transports.File({
         filename: `${folderPath}/${filePath}`,
         level,
      });

   return winston.createLogger({
      format: winston.format.json(),
      transports: [
         newTransport("error", "error.log"),
         newTransport("warn", "warn.log"),
         newTransport("info", "info.log"),
      ],
   });
}
