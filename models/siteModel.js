const db = require("../config/db");

const createSiteTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS sites (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      state VARCHAR(100),
      city VARCHAR(100),
      landmark VARCHAR(255),
      famousPlace VARCHAR(255),
      minPrice DECIMAL(10, 2),
      maxPrice DECIMAL(10, 2),
      youtubeLink VARCHAR(255),
      price DECIMAL(10, 2),
      coverImages JSON,
      innerImages JSON,
      pdfs JSON
    ) ENGINE=InnoDB;
  `;

  try {
    await db.query(sql);
    console.log("✅ 'sites' table ensured.");
  } catch (err) {
    console.error("❌ Error creating 'sites' table:", err.message);
  }
};

module.exports = createSiteTable;
