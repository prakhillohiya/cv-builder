import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";
import routes from "./routes/index.routes";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logger";
import { IncomingHttpHeaders } from "http";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN!);
  res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));



//SERVERLESS
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

export default app;
//SERVERLESS

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


//SERVER
// app.listen(process.env.PORT, async () => {
//   try {
//     await connectDB();
//     routes(app);
//     console.log(`Server Running on ${process.env.PORT}`);
//   } catch (error) {
//     console.log(error);
//   }
// });
//SERVER

