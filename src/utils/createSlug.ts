
export const createSlug = (str : string) => str
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .trim() 
    .split(" ")
    .join("-")
    .toLowerCase();