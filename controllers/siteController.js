const db = require("../config/db");

const uploadSite = async (req, res) => {
  try {
    const {
      title,
      description,
      state,
      city,
      landmark,
      famousPlace,
      minPrice,
      maxPrice,
      youtubeLink,
      price,
    } = req.body;

    const coverPaths = req.files["coverImages"]?.map((f) => f.path) || [];
    const innerPaths = req.files["innerImages"]?.map((f) => f.path) || [];
    const pdfPaths = req.files["uploads"]?.map((f) => f.path) || [];

    const sql = `
      INSERT INTO sites (
        title, description, state, city, landmark, famousPlace, 
        minPrice, maxPrice, youtubeLink, price, 
        coverImages, innerImages, pdfs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      description,
      state,
      city,
      landmark,
      famousPlace,
      minPrice,
      maxPrice,
      youtubeLink,
      price,
      JSON.stringify(coverPaths),
      JSON.stringify(innerPaths),
      JSON.stringify(pdfPaths),
    ];

    const [result] = await db.query(sql, values);
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { uploadSite };
