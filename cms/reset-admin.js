const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('.tmp/data.db');
const email = 'admin@sonora.local';
const password = 'Admin123!';
const hash = bcrypt.hashSync(password, 10);

const result = db.prepare("UPDATE admin_users SET password = ? WHERE email = ?").run(hash, email);

if (result.changes === 0) {
  const insert = db.prepare(`INSERT INTO admin_users (
    firstname,
    lastname,
    email,
    password,
    is_active,
    blocked,
    created_at,
    updated_at,
    published_at
  ) VALUES (?, ?, ?, ?, 1, 0, ?, ?, ?)`);

  const now = Date.now();
  insert.run('Admin', 'User', email, hash, now, now, now);
}

db.close();
console.log('Admin password reset for', email);
