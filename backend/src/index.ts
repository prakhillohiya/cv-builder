import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import routes from "./routes/index.routes";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logger";
import { IncomingHttpHeaders } from "http";

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(" "),
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

routes(app);


const initializeApp = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initializeApp();

// app.use((req, res, next) => {
//   const startTime = Date.now();

//   const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//   const logData: {
//     method: string;
//     url: string;
//     ip: string | string[] | undefined;
//     timestamp: string;
//     userAgent: string | undefined;
//     requestBody: any;
//     requestHeaders: IncomingHttpHeaders;
//     responseStatusCode?: number;
//     responseTime?: number;
//     responseHeaders?: any;
//   } = {
//     method: req.method,
//     url: req.url,
//     ip: ip,
//     timestamp: new Date().toISOString(),
//     userAgent: req.headers["user-agent"],
//     requestBody: req.body,
//     requestHeaders: req.headers,
//   };

//   res.on("finish", () => {
//     const endTime = Date.now();
//     const responseTime = endTime - startTime;

//     logData.responseStatusCode = res.statusCode;
//     logData.responseTime = responseTime;
//     logData.responseHeaders = res.getHeaders();

//     logger.info(logData);
//   });

//   next();
// });

// app.listen(process.env.PORT, async () => {
//   try {
//     await connectDB();
//     routes(app);
//     console.log(`Server Running on ${process.env.PORT}`);
//   } catch (error) {
//     console.log(error);
//   }
// });


export default app;