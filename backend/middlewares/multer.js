import multer from "multer";
import fs from "fs";
import path from "path";
import os from "os";

const uploadDir = process.env.VERCEL ? path.join(os.tmpdir(), "uploads") : path.resolve("public");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${cleanFileName}`);
  }
});

const upload = multer({ storage });

export default upload;