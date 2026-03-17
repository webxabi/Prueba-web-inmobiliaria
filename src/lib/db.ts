import sqlite3 from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

// Use a more robust path resolution for production hostinger environments
const dbPath = process.env.DATABASE_URL 
  ? process.env.DATABASE_URL 
  : path.join(process.cwd(), 'inmobiliaria.db');

// Ensure the db file exists logic is somewhat handled by better-sqlite3 but let's be safe
const db = new sqlite3(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      sqft INTEGER NOT NULL,
      rooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      location TEXT NOT NULL,
      main_image_url TEXT NOT NULL,
      status TEXT DEFAULT 'disponible',
      featured BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS property_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      property_id INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
    );
  `);

  // Create default admin user if it doesn't exist
  const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  if (!adminExists) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin123', salt);
    db.prepare('INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)').run('admin', hash);
    console.log('Created default admin user (admin / admin123)');
  }
}

export default db;
