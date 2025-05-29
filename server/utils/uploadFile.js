import { __dirname } from "../index.js";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { GraphQLError } from "graphql";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//?===================================UPLOAD USING CLOUDINARY=====================================
export const uploadFile = async (img) => {
  try {
    const uploadImg = await img;
    const { createReadStream, filename } = uploadImg.file;

    return new Promise((resolve, reject) => {
      const stream = createReadStream();
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
          public_id: filename,
          folder: "uploads",
        },
        (error, result) => {
          if (error) {
            reject(new GraphQLError("No Image provided"));
          }
          resolve(result.secure_url);
        }
      );

      stream.pipe(cloudinaryStream);
    });
  } catch (error) {
    throw new GraphQLError(error?.message);
  }
};
