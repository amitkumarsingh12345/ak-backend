const db = require("../config/db");

const createAdminTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      reg_password VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB;
  `;

  try {
    await db.query(sql);
    console.log("✅ 'admin' table ensured.");
  } catch (err) {
    console.error("❌ Error creating 'admin' table:", err.message);
  }
};

module.exports = createAdminTable;
