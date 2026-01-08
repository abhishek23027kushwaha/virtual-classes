import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routers/auth.route.js";
import userRouter from "./routers/user.route.js";
import courseRouter from "./routers/course.route.js";
import OrderRoutes from "./routers/Order.route.js";
import reviewRouter from "./routers/review.route.js";


dotenv.config({});
const app = express();

connectDB();
// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(cookieParser());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)
app.use("/api/payment",OrderRoutes)
app.use("/api/review",reviewRouter)




// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
