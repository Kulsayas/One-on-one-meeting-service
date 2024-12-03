import express from "express";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import managerRouter from "./routes/manager.route.js";
import bookRouter from "./routes/book.route.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api
app.use("/api/team-member", managerRouter);
app.use("/api/book", bookRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
