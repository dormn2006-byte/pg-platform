import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

/**
 * Processes an uploaded image file: validates dimensions, converts to WebP,
 * resizes, compresses, and cleans up the original file.
 * * @param {Object} file - The file object from Multer (req.file)
 * @returns {String} - The new WebP filename
 */
export const processImage = async (file) => {
  // Temporary logging for debugging (Remove in production)
  console.log("Uploaded File Details:", file);

  const originalPath = file.path;

  try {
    // Validate image dimensions before processing
    const metadata = await sharp(originalPath).metadata();
    
    if (metadata.width > 8000 || metadata.height > 8000) {
      await fs.unlink(originalPath); // Clean up the rejected file
      const error = new Error("Image resolution is too high. Max allowed is 8000x8000 pixels.");
      error.statusCode = 400; // Attach status code for the controller to use
      throw error;
    }

    // Keep Multer's generated filename, just change to .webp
    const originalNameWithoutExt = path.parse(file.filename).name;
    const webpFilename = `${originalNameWithoutExt}.webp`;
    const webpPath = path.join(file.destination, webpFilename);

    // Optimize with Sharp: fit: "inside" and effort: 6
    await sharp(originalPath)
      .resize({ width: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);

    // Delete the original uploaded JPG/PNG file to save space
    await fs.unlink(originalPath);

    // Return the new .webp filename so the controller can save it to the DB
    return webpFilename;

  } catch (error) {
    console.error("Image Processing Error:", error);
    
    // Attempt to delete the partially uploaded/orphaned original file on failure
    try {
      await fs.unlink(originalPath);
    } catch (cleanupError) {
      console.error("Failed to delete orphaned file:", cleanupError);
    }
    
    // If the error doesn't already have a status code, give it a default 500
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Failed to process the uploaded image.";
    }
    
    // Re-throw the error so the controller can catch it and send a response
    throw error;
  }
};