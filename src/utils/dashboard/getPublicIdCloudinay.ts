
export const getPublicIdCloudinary = (imageOfCloudinary : string | null) => {
    if(!imageOfCloudinary) return null
    return imageOfCloudinary.split("/").pop()?.split(".")[0] ?? null
}