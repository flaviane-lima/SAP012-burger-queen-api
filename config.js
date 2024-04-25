exports.port = process.argv[2] || process.env.PORT || 8080;
exports.dbUrl = process.env.MONGODB_URI || process.env.DB_URL;
exports.secret = process.env.JWT_SECRET;
exports.adminEmail = process.env.ADMIN_EMAIL;
exports.adminPassword = process.env.ADMIN_PASSWORD;

// const requirezzz('dotenv').config();
