const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7869;
const DB_FILE = path.join(__dirname, 'registrations_db.json');

// Ensure local db file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Auto-copy original uploaded seal logo into assets folder
try {
  const sealSrc = 'C:/Users/RSM_F/.gemini/antigravity-ide/brain/8cef0900-b21d-4961-9218-87cc167105a2/media__1790094670652.png';
  const sealDst1 = path.join(__dirname, 'assets', 'mahendra_seal_logo.png');
  const sealDst2 = path.join(__dirname, 'assets', 'mahendra_seal.png');
  if (fs.existsSync(sealSrc)) {
    fs.copyFileSync(sealSrc, sealDst1);
    fs.copyFileSync(sealSrc, sealDst2);
    console.log('✅ Auto-copied seal logo to assets folder!');
  }
} catch (e) { console.error('Seal copy note:', e.message); }

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  // Enable CORS headers for API
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  // Handle API route: /api/register (POST)
  if (reqPath === '/api/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        let existing = [];
        try {
          existing = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]');
        } catch(e) { existing = []; }

        existing.unshift(payload);
        fs.writeFileSync(DB_FILE, JSON.stringify(existing, null, 2));

        res.writeHead(200, { ...headers, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result: 'success', message: 'Saved to Local DB' }));
      } catch (err) {
        res.writeHead(500, { ...headers, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result: 'error', message: err.toString() }));
      }
    });
    return;
  }

  // Handle API route: /api/registrations (GET)
  if (reqPath === '/api/registrations' && req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]');
      res.writeHead(200, { ...headers, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ result: 'success', count: data.length, data: data }));
    } catch(err) {
      res.writeHead(500, { ...headers, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ result: 'error', message: err.toString() }));
    }
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, reqPath === '/' ? 'index.html' : reqPath);
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { ...headers, 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Command Center server running at http://localhost:${PORT}/`);
});
