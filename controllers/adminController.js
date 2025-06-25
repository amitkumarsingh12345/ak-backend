const db = require("../config/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

// Register admin
const registerAdmin = async (req, res) => {
  const { username, reg_password } = req.body;

  if (!username || !reg_password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const [existing] = await db.query(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(reg_password, 10);
    await db.query("INSERT INTO admin (username, reg_password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login admin
const adminLogin = async (req, res) => {
  const { username, reg_password } = req.body;

  if (!username || !reg_password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM admin WHERE username = ? LIMIT 1",
      [username]
    );
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(reg_password, user.reg_password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, username: user.username });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { adminLogin, registerAdmin };
