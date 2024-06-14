const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

const PORT = process.env.PORT || 5000;

const storage = multer.memoryStorage()
const upload = multer({
    storage
})

app.use(cors({
    origin: "*"
}));

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`)
})