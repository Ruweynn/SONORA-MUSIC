const http = require('http');

const baseUrl = 'http://127.0.0.1:1337';
const email = 'admin@sonora.local';
const password = 'Admin123!';

const products = [
  {
    name: 'Sundown Telecaster',
    category: 'Guitars',
    price: 49999,
    description: 'Built for players who want warm rhythm, clarity, and a vintage edge on every stage.'
  },
  {
    name: 'Afterglow Delay',
    category: 'Pedals',
    price: 12499,
    description: 'A rich, warm analog-inspired delay for ambient leads and rhythmic textures.'
  },
  {
    name: 'Thunder 40 Combo',
    category: 'Amplifiers',
    price: 36999,
    description: 'Stage-ready tone with punchy mids and honest projection for live sets.'
  },
  {
    name: 'Coastline Jazzmaster',
    category: 'Guitars',
    price: 52999,
    description: 'Smooth, articulate rhythm guitar tone with a glossy modern finish.'
  }
];

function requestJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const data = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data });
        } catch (error) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

async function main() {
  const loginResponse = await requestJson(`${baseUrl}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (loginResponse.status !== 200 || !loginResponse.data?.data?.accessToken) {
    throw new Error(`Login failed: ${JSON.stringify(loginResponse)}`);
  }

  const token = loginResponse.data.data.accessToken;

  for (const product of products) {
    const response = await requestJson(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ data: product })
    });

    console.log('status', response.status, 'product', product.name, 'response', JSON.stringify(response.data).slice(0, 400));
  }

  console.log('Seeding complete');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
