const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const siteRoutes = require("./routes/siteRoutes");
const adminRoutes = require("./routes/adminRoutes");

const createSiteTable = require("./models/siteModel");
const createAdminTable = require("./models/adminModel");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/sites", siteRoutes);
app.use("/api/admin", adminRoutes);

// Auto-create tables
createSiteTable();
createAdminTable();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
