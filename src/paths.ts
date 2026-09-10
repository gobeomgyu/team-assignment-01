// Vite supplies the same base for local development and a subdirectory deployment.
export const basePath = import.meta.env.BASE_URL;
export const imagePath = (filename: string) => `${basePath}images/${filename}`;
