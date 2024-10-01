

export const generateToken = () => Date.now().toString(32) + Math.random().toString(32).split(".")[1];
