const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4 } = require("uuid"); // v4: 랜덤 값 기반

const s3 = new S3Client();
const BUCKET = "remote-image-storage";

const uploadToS3 = async ({ file, userId }) => {
  const key = `${userId}/${v4()}`;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (err) {
    console.log(err);
    return { error };
  }
};

const getImageKeysByUser = async (userId) => {
  const command = new ListObjectsV2Command({
    Bucket: "remote-image-storage",
    Prefix: userId,
  });

  const { Contents = [] } = await s3.send(command);

  return Contents.sort(
    (a,b) => new Date(b.LastModified) - new Date(a.LastModified)
  ).map((image) => image.Key);
};

const getUserPresignedUrls = async (userId) => {
  try {
    const imageKeys = await getImageKeysByUser(userId);

    const presignedUrls = await Promise.all(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: "remote-image-storage",
          Key: key,
        });
        return getSignedUrl(s3, command, { expiresIn: 900 });
      })
    );

    return {presignedUrls};
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = { uploadToS3, getUserPresignedUrls };
