const express = require("express");
const cors = require("cors");
const multer = require("multer");
const uploadToS3 = require("./s3");

const app = express();

const PORT = process.env.PORT || 5000;

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/images", upload.single("image"), (req, res) => {
  const { file } = req;
  const userId = req.headers["x-user-id"];

  if (!file || !userId) return res.status(400).json({ message: "Bad request" });
  const { error, key } = uploadToS3({
    file,
    userId,
  });
  if(error) return res.status(500).json({message: error.message});
  
  return res.status(201).json({key});
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
