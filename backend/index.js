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
// import path from "path"
dotenv.config({});
const app = express();
// const _dirname = path.resolve();
connectDB();
// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  "https://virtual-classes-6.onrender.com",
  "https://virtual-classes-5.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".netlify.app") ||
        origin.endsWith(".onrender.com")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
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


// // frontend
// app.use(express.static(path.join(_dirname, "frontend/dist")));

// app.use((req, res) => {
//   res.sendFile(
//     path.resolve(_dirname, "frontend", "dist", "index.html")
//   );
// });
// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


