const pool = require("../config/db"); // your database connection

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, role,createdAt FROM users"
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const [[{ totalUsers }]] = await pool.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );
    res.json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
