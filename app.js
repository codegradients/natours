const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

// Template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Globel MiddleWare

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set Security HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request from same API
const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});
app.use("/api", limit);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  }),
);

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Routes
app.use("/", viewRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: 'Fail',
  //   message: `Can't Find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't Find ${req.originalUrl} on this server`);
  // err.status = 'Fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});

app.use(globalErrorHandler);

// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

module.exports = app;