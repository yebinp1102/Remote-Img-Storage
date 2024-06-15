const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4 } = require("uuid"); // v4: 랜덤 값 기반

const s3 = new S3Client();
const BUCKET = "remote-image-storage";

const uploadToS3 = async ({ file, userId }) => {
  const key = `${userId}/${v4()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  });

  try{
    await s3.send(command);
    return {key};
  }catch(err){
    console.log(err);
    return {error}
  }
};

module.exports = uploadToS3;