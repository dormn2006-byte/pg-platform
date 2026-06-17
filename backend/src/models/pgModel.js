import db from "../config/db.js";

// Create New PG
export const createPG = async (pgData) => {
  const {
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
  } = pgData;

  const query = `
    INSERT INTO pgs (
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
      profile_image,
      google_map_link,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  const [result] = await db.execute(query, [
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
    profile_image,
    google_map_link,
    'pending',
  ]);

  return result;
};

// Get All PGs
export const getAllPGs = async () => {
  const query = `
    SELECT
      pgs.*,
      users.full_name AS owner_name,
      users.email AS owner_email
    FROM pgs
    LEFT JOIN users ON pgs.owner_id = users.id
    WHERE pgs.status = 'approved'
    ORDER BY pgs.created_at DESC
  `;

  const [rows] = await db.execute(query);

  return rows;
};

// Get Single PG By ID
export const getPGById = async (id) => {
  const query = `
   SELECT
    pgs.*,
    users.full_name AS owner_name,
    users.email AS owner_email,
    users.phone AS owner_phone
FROM pgs
JOIN users ON pgs.owner_id = users.id
WHERE pgs.id = ?
  `;

  const [rows] = await db.execute(query, [id]);

  return rows[0];
};

// Get PGs By Owner
export const getPGsByOwner = async (ownerId) => {
  const query = `
    SELECT * FROM pgs
    WHERE owner_id = ?
    ORDER BY created_at DESC
  `;

  const [rows] = await db.execute(query, [ownerId]);

  return rows;
};

// Update PG
export const updatePG = async (id, pgData) => {
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
    profile_image,
  } = pgData;

  const query = `
    UPDATE pgs
    SET
      title = ?,
      description = ?,
      pg_type = ?,
      price = ?,
      address = ?,
      city = ?,
      area = ?,
      nearby_college = ?,
      available_rooms = ?,
      amenities = ?,
      rules = ?,
      google_map_link = ?,
      profile_image = ?
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [
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
    id,
  ]);

  return result;
};

// Delete PG
export const deletePG = async (id) => {
  const query = `DELETE FROM pgs WHERE id = ?`;

  const [result] = await db.execute(query, [id]);

  return result;
};