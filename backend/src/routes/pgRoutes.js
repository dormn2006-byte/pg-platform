import express from "express";

import {
  createPGController,
  getAllPGsController,
  getSinglePGController,
  getOwnerPGsController,
  updatePGController,
  deletePGController,
} from "../controllers/pgController.js";

import {
  protect,
  ownerOnly,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create PG
router.post(
  "/create",
  protect,
  ownerOnly,
  upload.array("images", 10),
  createPGController
);

// Get All PGs
router.get("/all", getAllPGsController);

// Get Logged In Owner PGs
router.get(
    "/owner/my-pgs",
    protect,
    ownerOnly,
    getOwnerPGsController
  );
// Get Single PG
router.get("/:id", getSinglePGController);



// Update PG
router.put(
  "/update/:id",
  protect,
  ownerOnly,
  updatePGController
);

// Delete PG
router.delete(
  "/delete/:id",
  protect,
  ownerOnly,
  deletePGController
);

export default router;