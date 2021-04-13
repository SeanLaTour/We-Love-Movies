if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const theatersRouter = require("./theaters/theaters.router");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// Body Parser
app.use(express.json())

// Routes
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);
app.use("/movies", moviesRouter);

// Not Found
app.use(notFound);

// Errors
app.use(errorHandler);

// Export
module.exports = app;
