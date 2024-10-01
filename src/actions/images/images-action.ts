"use server";
import sharp from "sharp";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { File } from "buffer";
import { getPublicIdCloudinary } from '../../utils/dashboard/getPublicIdCloudinay';

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const compressedImage = async (buffer : Buffer, width?: number, quality?: number) => {
    try {
        const bufferResult = await sharp(buffer)
            .resize({
                width: width,
                withoutEnlargement: true
            })
            .webp({ quality: quality ?? 70 })
            .toBuffer();
        return bufferResult;
    } catch (error) {
        throw new Error("An unexpected error ocurred while we trying to optimize the image");
    }
}

// Función para subir la imagen y obtener la URL
export const uploadImageToCloudinary = (buffer: Buffer): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result: UploadApiResponse) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });

        stream.end(buffer);
    });
};

export const uploadAndGetUrl = async (buffer: Buffer) => {
    try {
        const result = await uploadImageToCloudinary(buffer);
        const imageUrl = result.secure_url; 
        return imageUrl;
    } catch (error) {
        throw new Error("An error occurred while creating the image in Cloudinary");
    }
};

export const deleteImages = async (image : string) => {
    try {
        const publicId = getPublicIdCloudinary(image);
        if(!publicId) throw new Error("Image not found");
        await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
        });
    } catch (err) {
        console.log(err);
        throw new Error("An error occurred while deleting the image from Cloudinary");
    }
}
