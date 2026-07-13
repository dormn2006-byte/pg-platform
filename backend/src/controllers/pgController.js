import {
  createPG,
  savePGImages,
  getAllPGs,
  getPGById,
  getPGsByOwner,
  updatePG,
  deletePG,
} from "../models/pgModel.js";

// Import the new utility (adjust the path to match your folder structure)
import { processImage } from "../utils/imageProcessor.js"; 

// Create PG
export const createPGController = async (req, res) => {
  try {
    const {
      title,
      description,
      pg_type,
      price,
      address,
      city,
      area,
      nearby_college,
      available_rooms,
      amenities,
      rules,
      google_map_link,
    } = req.body;

    // Validation
    if (!title || !pg_type || !price || !address || !city) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Uploaded Image Logic Extracted
    let processedImages = [];
    let profile_image = null;

    if (req.files && req.files.length > 0) {
      try {
        for (const file of req.files) {
          const processedFileName = await processImage(file);
          processedImages.push(processedFileName);
        }

        // Temporary: use the first uploaded image as the cover image.
        profile_image = processedImages[0];

        console.log("Processed Images:", processedImages);
      } catch (imageError) {
        return res.status(imageError.statusCode || 500).json({
          success: false,
          message: imageError.message,
        });
      }
    }

    // Owner ID from Logged In User
    const owner_id = req.user.id;

    const result = await createPG({
      owner_id,
      title,
      description,
      pg_type,
      price,
      address,
      city,
      area,
      nearby_college,
      available_rooms,
      amenities,
      rules,
      google_map_link,
      profile_image,
    });

    // Save gallery images after the PG has been created.
    if (processedImages.length > 0) {
      await savePGImages(result.insertId, processedImages);
      console.log(`Saved ${processedImages.length} gallery images for PG ${result.insertId}`);
    }

    return res.status(201).json({
      success: true,
      message: "PG created successfully",
      pgId: result.insertId,
    });
  } catch (error) {
    console.log("Create PG Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All PGs
export const getAllPGsController = async (req, res) => {
  try {
    const pgs = await getAllPGs();

    return res.status(200).json({
      success: true,
      total: pgs.length,
      pgs,
    });
  } catch (error) {
    console.log("Get All PGs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Single PG
export const getSinglePGController = async (req, res) => {
  try {
    const { id } = req.params;

    const pg = await getPGById(id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    console.log("Returning PG Details:", {
      id: pg.id,
      title: pg.title,
      profile_image: pg.profile_image,
      galleryCount: pg.gallery?.length || 0,
    });

    return res.status(200).json({
      success: true,
      pg,
    });
  } catch (error) {
    console.log("Get Single PG Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Owner PGs
export const getOwnerPGsController = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const pgs = await getPGsByOwner(ownerId);

    return res.status(200).json({
      success: true,
      total: pgs.length,
      pgs,
    });
  } catch (error) {
    console.log("Get Owner PGs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update PG
export const updatePGController = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPG = await getPGById(id);

    if (!existingPG) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }
    
    // NOTE: If you plan to allow users to update images later, 
    // you can reuse the processImage() utility right here!
    
    const updatedData = {
      title: req.body.title ?? existingPG.title,
      description: req.body.description ?? existingPG.description,
      pg_type: req.body.pg_type ?? existingPG.pg_type,
      price: req.body.price ?? existingPG.price,
      address: req.body.address ?? existingPG.address,
      city: req.body.city ?? existingPG.city,
      area: req.body.area ?? existingPG.area,
      nearby_college: req.body.nearby_college ?? existingPG.nearby_college,
      available_rooms: req.body.available_rooms ?? existingPG.available_rooms,
      amenities: req.body.amenities ?? existingPG.amenities,
      rules: req.body.rules ?? existingPG.rules,
      google_map_link:
        req.body.google_map_link ?? existingPG.google_map_link,
      profile_image: req.body.profile_image ?? existingPG.profile_image,
    };

    console.log("Update Data:", updatedData);

    await updatePG(id, updatedData);

    return res.status(200).json({
      success: true,
      message: "PG updated successfully",
    });
  } catch (error) {
    console.log("Update PG Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete PG
export const deletePGController = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPG = await getPGById(id);

    if (!existingPG) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    await deletePG(id);

    return res.status(200).json({
      success: true,
      message: "PG deleted successfully",
    });
  } catch (error) {
    console.log("Delete PG Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};