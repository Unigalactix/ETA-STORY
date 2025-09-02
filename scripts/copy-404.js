import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, '..', 'dist');
const index = path.join(dist, 'index.html');
const fallback = path.join(dist, '404.html');

if (!fs.existsSync(index)) {
  console.error('index.html not found in dist. Make sure the build ran successfully.');
  process.exit(1);
}

fs.copyFileSync(index, fallback);
console.log('Copied index.html to 404.html for SPA fallback');
