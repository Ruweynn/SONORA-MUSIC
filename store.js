// @ts-nocheck

const fallbackProducts = [
  { id: 1, name: 'Sundown Telecaster', category: 'Guitars', price: 49999, badge: 'New', image: '/uploads/products/sundown-telecaster.svg', description: 'A bright, road-ready electric with a little desert dust in its voice.' },
  { id: 2, name: 'Bloom Overdrive', category: 'Pedals', price: 8499, badge: 'Bestseller', image: '/uploads/products/bloom-overdrive.svg', description: 'Warm, responsive drive that opens up when you lean into it.' },
  { id: 3, name: 'Field Notes II', category: 'Studio', price: 15599, badge: 'Essential', image: '/uploads/products/field-notes-ii.svg', description: 'A compact interface for capturing ideas before they disappear.' },
  { id: 4, name: 'Coastline Jazzmaster', category: 'Guitars', price: 67999, badge: 'Limited', image: '/uploads/products/coastline-jazzmaster.svg', description: 'Shimmering cleans and low-end authority for wide-open arrangements.' },
  { id: 5, name: 'Afterglow Delay', category: 'Pedals', price: 10599, badge: 'New', image: '/uploads/products/afterglow-delay.svg', description: 'Textured repeats that turn a single note into a whole horizon.' },
  { id: 6, name: 'Room Mic Pair', category: 'Studio', price: 23499, badge: 'Studio pick', image: '/uploads/products/room-mic-pair.svg', description: 'Matched condensers for honest rooms, overheads, and everything between.' },
  { id: 7, name: 'Thunder 40 Combo', category: 'Amplifiers', price: 28999, badge: 'New', image: '/uploads/products/thunder-40-combo.svg', description: 'A warm 40-watt combo with enough headroom for rehearsal and stage.' },
  { id: 8, name: 'Sunset Shell Kit', category: 'Drums', price: 54999, badge: 'Stage ready', image: '/uploads/products/sunset-shell-kit.svg', description: 'A responsive five-piece shell pack built for punch and projection.' },
  { id: 9, name: 'Maple 5A Sticks', category: 'Accessories', price: 699, badge: 'Essential', image: '/uploads/products/maple-5a-sticks.svg', description: 'Balanced maple drumsticks with a comfortable finish for long sessions.' },
  { id: 10, name: 'Northstar 61', category: 'Keyboards', price: 32999, badge: 'Editor pick', image: '/uploads/products/northstar-61.svg', description: 'A versatile 61-key board with expressive sounds and quick controls.' },
  { id: 11, name: 'Signal Patch Cable Set', category: 'Accessories', price: 1299, badge: 'Best value', image: '/uploads/products/signal-patch-cable-set.svg', description: 'Six quiet, flexible patch cables to keep your pedalboard tidy.' },
  { id: 12, name: 'Low Tide Bass Amp', category: 'Amplifiers', price: 41999, badge: 'Pro choice', image: '/uploads/products/low-tide-bass-amp.svg', description: 'Deep, clean low end with the grit to make a small room move.' },
  { id: 13, name: 'Midnight Stratocaster', category: 'Guitars', price: 58999, badge: 'New', image: '/uploads/products/midnight-stratocaster.svg', description: 'A versatile electric with glassy cleans and a comfortable modern neck.' },
  { id: 14, name: 'Hollowbody Sunburst', category: 'Guitars', price: 72999, badge: 'Limited', image: '/uploads/products/hollowbody-sunburst.svg', description: 'Warm semi-hollow tones for jazz, blues, and spacious indie parts.' },
  { id: 15, name: 'Valve King 20', category: 'Amplifiers', price: 36999, badge: 'Tube tone', image: '/uploads/products/valve-king-20.svg', description: 'A compact tube combo with rich breakup for studio and small stages.' },
  { id: 16, name: 'Clean Room 100', category: 'Amplifiers', price: 45999, badge: 'Stage ready', image: '/uploads/products/clean-room-100.svg', description: 'A powerful clean platform ready for pedals and full-band rehearsals.' },
  { id: 17, name: 'Pocket Practice Amp', category: 'Amplifiers', price: 6499, badge: 'Essential', image: '/uploads/products/pocket-practice-amp.svg', description: 'A small headphone-friendly amp for quiet practice anywhere.' },
  { id: 18, name: 'Studio Jazz Kit', category: 'Drums', price: 68999, badge: 'Studio pick', image: '/uploads/products/studio-jazz-kit.svg', description: 'A compact acoustic kit tuned for recording rooms and intimate stages.' },
  { id: 19, name: 'Brass Ride 20', category: 'Drums', price: 13999, badge: 'New', image: '/uploads/products/brass-ride-20.svg', description: 'A bright, musical ride cymbal with clear bell definition.' },
  { id: 20, name: 'Pocket Cajon', category: 'Drums', price: 4299, badge: 'Portable', image: '/uploads/products/pocket-cajon.svg', description: 'A portable percussion essential for acoustic sessions and unplugged sets.' },
  { id: 21, name: 'Glasshouse Reverb', category: 'Pedals', price: 11999, badge: 'New', image: '/uploads/products/glasshouse-reverb.svg', description: 'Wide ambient trails that turn simple chords into cinematic space.' },
  { id: 22, name: 'Copper Fuzz', category: 'Pedals', price: 9499, badge: 'Bestseller', image: '/uploads/products/copper-fuzz.svg', description: 'A gritty, harmonically rich fuzz for leads that refuse to sit still.' },
  { id: 23, name: 'Quiet Compressor', category: 'Pedals', price: 7999, badge: 'Essential', image: '/uploads/products/quiet-compressor.svg', description: 'Smooth studio-style compression for guitar, bass, and keys.' },
  { id: 24, name: 'Vocal Booth Mic', category: 'Studio', price: 18999, badge: 'Studio pick', image: '/uploads/products/vocal-booth-mic.svg', description: 'A focused condenser microphone for clear vocals and acoustic instruments.' },
  { id: 25, name: 'Monitor Pair 5', category: 'Studio', price: 27999, badge: 'Pro choice', image: '/uploads/products/monitor-pair-5.svg', description: 'Balanced nearfield monitors for confident mixes in smaller rooms.' },
  { id: 26, name: 'Mix Desk Headphones', category: 'Studio', price: 6999, badge: 'Essential', image: '/uploads/products/mix-desk-headphones.svg', description: 'Closed-back monitoring headphones with detailed low end.' },
  { id: 27, name: 'Leather Guitar Strap', category: 'Accessories', price: 1899, badge: 'Everyday carry', image: '/uploads/products/leather-guitar-strap.svg', description: 'A comfortable leather strap made for long rehearsals and long sets.' },
  { id: 28, name: 'Clip-On Tuner Pro', category: 'Accessories', price: 1299, badge: 'Essential', image: '/uploads/products/clip-on-tuner-pro.svg', description: 'Fast, accurate tuning visibility for stage or practice room.' },
  { id: 29, name: 'Instrument Cable 3M', category: 'Accessories', price: 999, badge: 'Best value', image: '/uploads/products/instrument-cable-3m.svg', description: 'A durable, low-noise cable for reliable everyday connections.' },
  { id: 30, name: 'Stage 88 Weighted', category: 'Keyboards', price: 49999, badge: 'Pro choice', image: '/uploads/products/stage-88-weighted.svg', description: 'An expressive weighted keyboard for piano players and arrangers.' },
  { id: 31, name: 'Mini Synth Lab', category: 'Keyboards', price: 17999, badge: 'New', image: '/uploads/products/mini-synth-lab.svg', description: 'A compact synthesizer for bass lines, textures, and happy accidents.' }
];

const apiBase = (() => {
  const directValue = typeof window !== 'undefined' ? (window.__SONORA_API_BASE__ || window.SONORA_API_BASE || '') : '';
  const candidates = [
    directValue,
    window.location?.origin && window.location.origin !== 'null' ? window.location.origin : '',
    'http://localhost:1337',
    'http://127.0.0.1:1337'
  ];

  const chosen = candidates.find(candidate => typeof candidate === 'string' && candidate && candidate.trim() && candidate !== 'null');
  return (chosen || 'http://localhost:1337').replace(/\/+$/, '');
})();

const apiUrl = path => `${apiBase}${String(path).startsWith('/') ? '' : '/'}${String(path).replace(/^\/+/, '')}`;

const state = { products: [], category: 'all', cart: JSON.parse(localStorage.getItem('arandia-cart') || '[]'), token: localStorage.getItem('arandia-token') || '', user: JSON.parse(localStorage.getItem('arandia-user') || 'null') };
const money = value => `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
const imageFor = product => {
  const image = product.imageUrl || product.image?.url || product.image?.data?.attributes?.url || product.image;
  return image && image.startsWith('/') ? `${window.location.origin}${image}` : image;
};

function normalizeProduct(item) {
  const product = item.attributes ? { id: item.id, ...item.attributes } : item;
  const category = product.category?.data?.attributes?.name || product.category?.name || product.category || 'Studio';
  return { ...product, category };
}

async function loadProducts() {
  try {
    const response = await fetch(apiUrl('/api/products?populate=*&filters[publishedAt][$notNull]=true'));
    if (!response.ok) throw new Error('Catalog unavailable');
    const data = await response.json();
    state.products = data.data?.length ? data.data.map(normalizeProduct) : fallbackProducts;
  } catch {
    state.products = fallbackProducts;
  }
  renderProducts();
}

function renderProducts() {
  const products = state.products.filter(product => state.category === 'all' || product.category === state.category);
  const markup = products.map(product => `<article class="product-card"><div class="product-image ${product.category.toLowerCase()}" ${imageFor(product) ? `style="background-image:url('${imageFor(product)}')"` : ''}><span class="badge">${product.badge || product.category}</span>${!imageFor(product) ? `<span class="product-mark">${product.category === 'Guitars' ? '♬' : product.category === 'Pedals' ? '◼' : '◉'}</span>` : ''}</div><div class="product-info"><div><p class="product-category">${product.category}</p><h3>${product.name}</h3></div><strong>${money(product.price)}</strong></div><p class="product-description">${product.description || ''}</p><button class="add-button" data-id="${product.id}" type="button"><span class="button-icon" aria-hidden="true">+</span> Add to cart <span class="button-arrow" aria-hidden="true">↗</span></button></article>`).join('');
  document.querySelectorAll('.product-grid').forEach(grid => { grid.innerHTML = markup; });
  document.querySelectorAll('.add-button').forEach(button => button.addEventListener('click', () => addToCart(Number(button.dataset.id))));
}

function addToCart(id) { const product = state.products.find(item => item.id === id); if (!product) return; state.cart.push(product); persistCart(); openCart(); }
function persistCart() { localStorage.setItem('arandia-cart', JSON.stringify(state.cart)); renderCart(); }
function renderCart() { document.querySelector('#cart-count').textContent = state.cart.length; document.querySelector('#cart-total').textContent = money(state.cart.reduce((sum, item) => sum + Number(item.price), 0)); document.querySelector('#cart-items').innerHTML = state.cart.length ? state.cart.map((item, index) => `<div class="cart-item"><span>${item.name}<small>${money(item.price)}</small></span><button type="button" data-remove="${index}" aria-label="Remove ${item.name}"><span aria-hidden="true">×</span></button></div>`).join('') : '<p class="empty-cart">Your ticket selection is waiting.</p>'; document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { state.cart.splice(Number(button.dataset.remove), 1); persistCart(); })); }
function renderFullCart() { document.querySelector('#full-cart-items').innerHTML = state.cart.length ? state.cart.map((item, index) => `<div class="full-cart-item"><div class="full-cart-thumb" style="background-image:url('${imageFor(item) || ''}')"></div><div><strong>${item.name}</strong><small>${item.category}</small></div><span>${money(item.price)}</span><button type="button" data-full-remove="${index}" aria-label="Remove ${item.name}">×</button></div>`).join('') : '<p class="empty-cart">Your ticket selection is waiting.</p>'; document.querySelector('#full-cart-total').textContent = money(state.cart.reduce((sum, item) => sum + Number(item.price), 0)); document.querySelectorAll('[data-full-remove]').forEach(button => button.addEventListener('click', () => { state.cart.splice(Number(button.dataset.fullRemove), 1); persistCart(); })); }
function openCart() { document.querySelector('#cart-drawer').classList.add('open'); document.querySelector('#cart-drawer').setAttribute('aria-hidden', 'false'); document.querySelector('#overlay').classList.add('visible'); }
function closeCart() { document.querySelector('#cart-drawer').classList.remove('open'); document.querySelector('#cart-drawer').setAttribute('aria-hidden', 'true'); document.querySelector('#overlay').classList.remove('visible'); }

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.filter.active').forEach(active => active.classList.remove('active')); document.querySelectorAll(`.filter[data-category="${button.dataset.category}"]`).forEach(active => active.classList.add('active')); state.category = button.dataset.category; renderProducts(); }));
document.querySelector('#cart-button').addEventListener('click', openCart); document.querySelector('#close-cart').addEventListener('click', closeCart); document.querySelector('#overlay').addEventListener('click', closeCart);
function buildQrCodeUrl(amount, reference) {
  const payload = `SONORA|${reference}|${amount}|GCash|09171234567`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(payload)}`;
}

function updatePaymentUi() {
  const method = document.querySelector('input[name="payment-method"]:checked')?.value || 'GCash';
  const total = Number(state.cart.reduce((sum, item) => sum + Number(item.price), 0)) || 0;
  const reference = `SONORA-${Date.now().toString().slice(-6)}`;
  const qrImage = document.querySelector('#qr-code-image');
  const qrWrap = document.querySelector('#qr-payment');
  const note = document.querySelector('#payment-note');

  if (method === 'Cash on delivery') {
    qrWrap.hidden = true;
    note.textContent = 'Pay cash when your order reaches your door. Please keep your receipt ready for confirmation.';
    return;
  }

  const qrUrl = buildQrCodeUrl(total, reference);
  if (qrImage) qrImage.src = qrUrl;
  if (qrWrap) qrWrap.hidden = false;

  if (method === 'GCash') {
    note.textContent = 'Scan the generated GCash QR code and send the exact total to complete your order.';
  } else if (method === 'QR code transfer') {
    note.textContent = 'Scan the QR code below to pay using your preferred wallet or payment app.';
  } else {
    note.textContent = 'Choose a valid payment method to continue.';
  }
}

function openPayment() {
  if (!state.cart.length) return;
  document.querySelector('#payment-total').textContent = document.querySelector('#cart-total').textContent;
  document.querySelector('#payment-modal').classList.add('open');
  document.querySelector('#payment-modal').setAttribute('aria-hidden', 'false');
  updatePaymentUi();
  closeCart();
  document.querySelector('#overlay').classList.add('visible');
}
function updateDeliveryFee() {
  const far = document.querySelector('#delivery-location').value === 'far';
  document.querySelector('#delivery-fee').textContent = money(far ? 350 : 120);
}
function closePayment() {
  document.querySelector('#payment-modal').classList.remove('open');
  document.querySelector('#payment-modal').setAttribute('aria-hidden', 'true');
  document.querySelector('#overlay').classList.remove('visible');
}
document.querySelector('#checkout').addEventListener('click', openPayment);
document.querySelector('#close-payment').addEventListener('click', closePayment);
document.querySelectorAll('input[name="payment-method"]').forEach(input => input.addEventListener('change', updatePaymentUi));
document.querySelector('#place-order').addEventListener('click', async () => {
  const method = document.querySelector('input[name="payment-method"]:checked')?.value || 'GCash';
  const profile = JSON.parse(localStorage.getItem('arandia-profile') || '{}');
  const customer = state.user || {};
  const message = document.querySelector('#payment-message');
  const total = state.cart.reduce((sum, item) => sum + Number(item.price), 0);

  if (!state.cart.length) {
    message.textContent = 'Your cart is empty. Add items before checking out.';
    return;
  }

  message.textContent = 'Creating your order...';

  try {
    const orderData = {
      id: `SON-${Date.now()}`,
      items: state.cart.map(item => ({ id: item.id, name: item.name, price: Number(item.price), quantity: 1 })),
      paymentMethod: method,
      total,
      deliveryLocation: document.querySelector('#delivery-location')?.value || 'near',
      customerName: customer.username || profile.name || 'Guest customer',
      customerEmail: customer.email || profile.email || 'guest@example.com',
      customerPhone: profile.phone || customer.phone || 'Not provided',
      deliveryAddress: profile.address || customer.address || 'Address to be confirmed',
      createdAt: new Date().toISOString(),
      status: method === 'Cash on delivery' ? 'Pending cash payment' : 'Awaiting payment confirmation'
    };

    localStorage.setItem('arandia-last-order', JSON.stringify(orderData));
    const latestOrders = JSON.parse(localStorage.getItem('arandia-orders') || '[]');
    latestOrders.push(orderData);
    localStorage.setItem('arandia-orders', JSON.stringify(latestOrders));

    state.cart = [];
    persistCart();
    renderFullCart();

    if (method === 'Cash on delivery') {
      message.textContent = `Order ${orderData.id} placed successfully. Please pay cash on delivery.`;
    } else {
      message.textContent = `Order ${orderData.id} placed successfully. Please complete the ${method} payment using the QR code shown above.`;
    }

    updatePaymentUi();
  } catch (error) {
    message.textContent = error.message || 'Unable to process your order right now.';
  }
});
document.querySelector('#delivery-location').addEventListener('change', updateDeliveryFee);
document.querySelector('#delivery-form').addEventListener('submit', event => { event.preventDefault(); if (!state.cart.length) { document.querySelector('#payment-page-start').textContent = 'Add items to your cart first'; return; } openPayment(); });
document.querySelector('#print-receipt').addEventListener('click', () => {
  const order = JSON.parse(localStorage.getItem('arandia-last-order') || 'null');
  const delivery = order?.deliveryFee || (document.querySelector('#delivery-location').value === 'far' ? 350 : 120);
  const items = order?.items || state.cart.map(item => ({ name: item.name, price: item.price, quantity: 1 }));
  const subtotal = order?.subtotal || items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity || 1), 0);
  const receipt = `<html><head><title>SONORA Festival Receipt</title><style>body{font-family:Arial;padding:32px;color:#17211b}h1{font-size:26px}table{border-collapse:collapse;width:100%;margin:24px 0}td{border-bottom:1px solid #ddd;padding:10px 0}.total{font-weight:bold;font-size:18px}</style></head><body><h1>SONORA Festival</h1><p>Order ${order?.orderNumber || 'draft'} - ${new Date().toLocaleString('en-PH')}</p><table>${items.map(item => `<tr><td>${item.name} x${item.quantity || 1}</td><td>${money(Number(item.price) * Number(item.quantity || 1))}</td></tr>`).join('')}<tr><td>Delivery fee</td><td>${money(delivery)}</td></tr><tr class="total"><td>Total</td><td>${money(Number(order?.total || subtotal + delivery))}</td></tr></table><p>Thank you for being part of SONORA Festival.</p></body></html>`;
  const receiptWindow = window.open('', '_blank', 'width=720,height=640'); if (!receiptWindow) return; receiptWindow.document.write(receipt); receiptWindow.document.close(); receiptWindow.focus(); receiptWindow.print();
});
document.querySelector('#newsletter-form').addEventListener('submit', event => { event.preventDefault(); document.querySelector('#form-message').textContent = 'You are on the list. See you in the next drop.'; event.target.reset(); });
function routePage() { const rawRoute = window.location.hash.replace('#', '') || 'home'; const route = rawRoute.split('?')[0] || 'home'; const page = route.endsWith('-page') ? route : `${route}-page`; const isHome = route === 'home'; document.querySelectorAll('[data-home-section]').forEach(section => section.classList.toggle('page-hidden', !isHome)); document.querySelectorAll('[data-page]').forEach(view => view.classList.toggle('active', view.dataset.page === page)); if (page === 'cart-page') renderFullCart(); if (page === 'payment-page') document.querySelector('#payment-page-total').textContent = money(state.cart.reduce((sum, item) => sum + Number(item.price), 0)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('hashchange', routePage);
document.querySelector('#full-cart-checkout').addEventListener('click', () => { if (state.cart.length) openPayment(); });
document.querySelector('#payment-page-start').addEventListener('click', openPayment);
async function fetchCurrentUserProfile() {
  if (!state.token) return;
  try {
    const response = await fetch(apiUrl('/api/users/me'), { headers: { Authorization: `Bearer ${state.token}` } });
    if (!response.ok) return;
    const user = await response.json();
    state.user = { ...state.user, ...user };
    localStorage.setItem('arandia-user', JSON.stringify(state.user));
    localStorage.setItem('arandia-profile', JSON.stringify({ phone: user.phone || '', address: user.address || '' }));
  } catch {}
}

async function loginUser(event) {
  event.preventDefault();
  const form = event.target;
  const message = document.querySelector('#login-message');
  message.textContent = 'Signing you in...';
  try {
    const response = await fetch(apiUrl('/api/auth/local'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: form.querySelector('#login-email').value.trim(), password: form.querySelector('#login-password').value })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Login failed. Check your details.');
    state.token = data.jwt;
    state.user = data.user;
    localStorage.setItem('arandia-token', data.jwt);
    localStorage.setItem('arandia-user', JSON.stringify(data.user));
    await fetchCurrentUserProfile();
    message.textContent = 'You are signed in.';
    form.reset();
    renderSession();
  } catch (error) { message.textContent = error.message; }
}

function renderSession() {
  const panel = document.querySelector('#session-panel');
  const form = document.querySelector('#login-form');
  if (state.token && state.user) {
    panel.hidden = false;
    document.querySelector('#session-welcome').textContent = `Signed in as ${state.user.username || state.user.email}.`;
    form.hidden = true;
  } else {
    panel.hidden = true;
    form.hidden = false;
  }
}

function logoutUser() {
  state.token = '';
  state.user = null;
  localStorage.removeItem('arandia-token');
  localStorage.removeItem('arandia-user');
  localStorage.removeItem('arandia-profile');
  document.querySelector('#order-history').hidden = true;
  renderSession();
  document.querySelector('#login-message').textContent = 'You have been signed out.';
}

document.querySelector('#login-form').addEventListener('submit', loginUser);
document.querySelector('#use-demo-account').addEventListener('click', () => {
  document.querySelector('#login-email').value = 'demo@arandiamusic.test';
  document.querySelector('#login-password').value = 'DemoArandia2026!';
  document.querySelector('#login-email').focus();
});
document.querySelector('#logout-button').addEventListener('click', logoutUser);
document.querySelector('#create-account').addEventListener('click', () => {
  document.querySelector('#signup-panel').hidden = false;
  document.querySelector('#login-message').textContent = '';
});
document.querySelector('#signup-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;
  const message = document.querySelector('#signup-message');
  message.textContent = 'Creating your profile...';
  try {
    const phone = form.querySelector('#signup-phone').value.trim();
    const address = form.querySelector('#signup-address').value.trim();
    const response = await fetch(apiUrl('/api/auth/local/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.querySelector('#signup-username').value.trim(),
        email: form.querySelector('#signup-email').value.trim(),
        password: form.querySelector('#signup-password').value,
        phone,
        address
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Sign up failed.');
    state.token = data.jwt;
    state.user = data.user;
    localStorage.setItem('arandia-token', data.jwt);
    localStorage.setItem('arandia-user', JSON.stringify(data.user));
    localStorage.setItem('arandia-profile', JSON.stringify({ phone, address }));
    await fetchCurrentUserProfile();
    message.textContent = 'Profile created. You are signed in.';
    form.reset();
    renderSession();
  } catch (error) { message.textContent = error.message; }
});

document.querySelector('#load-orders').addEventListener('click', async () => {
  const box = document.querySelector('#order-history');
  box.hidden = false;
  box.innerHTML = '<p>Loading your orders...</p>';
  if (!state.token) { box.innerHTML = '<p>Please log in first.</p>'; return; }
  try {
    const response = await fetch(apiUrl('/api/orders/me'), { headers: { Authorization: `Bearer ${state.token}` } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Could not load orders.');
    const orders = data.data || [];
    if (!orders.length) { box.innerHTML = '<p>You have no orders yet.</p>'; return; }
    box.innerHTML = orders.map(order => `<div class="order-row"><div><strong>${order.orderNumber}</strong><small>${new Date(order.createdAt).toLocaleString('en-PH')} · ${order.paymentMethod}</small></div><div><span class="order-status ${order.status}">${order.status}</span><small>${money(order.total)}</small></div></div>`).join('');
  } catch (error) { box.innerHTML = `<p>${error.message}</p>`; }
});

async function handlePaymentReturn() {
  const hash = window.location.hash;
  const queryIndex = hash.indexOf('?');
  if (queryIndex === -1) return;
  const params = new URLSearchParams(hash.slice(queryIndex + 1));
  const success = params.get('success');
  const cancelled = params.get('cancelled');
  const message = document.querySelector('#payment-message');
  if (success) {
    state.cart = [];
    persistCart();
    localStorage.removeItem('arandia-last-order');
    if (message) message.textContent = `Payment submitted successfully for order ${success}. Your order will update after PayMongo confirms payment.`;
  } else if (cancelled) {
    if (message) message.textContent = `Payment for order ${cancelled} was cancelled. Your cart is still available.`;
  }
}
window.addEventListener('hashchange', handlePaymentReturn);



function initStoreLocalWidgets() {
  const timeEl = document.querySelector('#store-time');
  const dateEl = document.querySelector('#store-date');
  const tempEl = document.querySelector('#store-temp');
  const weatherEl = document.querySelector('#store-weather');
  const statusEl = document.querySelector('#store-status');
  const hoursEl = document.querySelector('#store-hours');
  const tipEl = document.querySelector('#sound-tip');

  const tips = [
    'Today’s sound: clean tones.',
    'Tip: Tune before every session.',
    'Try less gain, more dynamics.',
    'Good tone starts with good strings.',
    'Record the idea before it disappears.'
  ];
  let tipIndex = Math.floor(Math.random() * tips.length);
  if (tipEl) tipEl.textContent = tips[tipIndex];
  setInterval(() => { if (tipEl) { tipIndex = (tipIndex + 1) % tips.length; tipEl.textContent = tips[tipIndex]; } }, 7000);

  const updateClock = () => {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).formatToParts(now);
    const get = type => parts.find(p => p.type === type)?.value || '';
    if (timeEl) timeEl.textContent = `${get('hour')}:${get('minute')}:${get('second')} ${get('dayPeriod')}`;
    if (dateEl) dateEl.textContent = new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }).format(now);
    const hour = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', hour12: false }).format(now));
    const open = hour >= 10 && hour < 18;
    if (statusEl) statusEl.innerHTML = `<span class="live-dot"></span> STORE DESK · ${open ? 'OPEN NOW' : 'CLOSED NOW'}`;
    if (hoursEl) hoursEl.textContent = open ? 'Mon–Fri · 10:00–18:00 · Come in!' : 'Mon–Fri · 10:00–18:00 · Online orders stay open';
  };
  updateClock();
  setInterval(updateClock, 1000);

  if (tempEl && weatherEl) {
    const weatherLabels = { 0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Foggy',48:'Foggy',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',80:'Rain showers',81:'Rain showers',82:'Heavy showers',95:'Thunderstorm',96:'Thunderstorm',99:'Thunderstorm' };
    fetch('https://api.open-meteo.com/v1/forecast?latitude=13.4117&longitude=121.1803&current=temperature_2m,weather_code&timezone=Asia%2FManila')
      .then(response => { if (!response.ok) throw new Error('Weather unavailable'); return response.json(); })
      .then(data => {
        const current = data.current;
        tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
        weatherEl.textContent = `${weatherLabels[current.weather_code] || 'Local conditions'} · Calapan City`;
      })
      .catch(() => { tempEl.textContent = '—°C'; weatherEl.textContent = 'Weather unavailable · Calapan City'; });
  }
}

function toggleAssistant(open) { document.querySelector('#assistant-panel').classList.toggle('open', open); document.querySelector('#assistant-panel').setAttribute('aria-hidden', String(!open)); }
document.querySelector('#assistant-launcher').addEventListener('click', () => toggleAssistant(true));
document.querySelector('#close-assistant').addEventListener('click', () => toggleAssistant(false));
document.querySelector('#assistant-form').addEventListener('submit', async event => { event.preventDefault(); const input = document.querySelector('#assistant-input'); const messages = document.querySelector('#assistant-messages'); const question = input.value.trim(); if (!question) return; messages.insertAdjacentHTML('beforeend', `<div class="assistant-message assistant-message-user">${question}</div><div class="assistant-message assistant-message-bot assistant-loading">Thinking...</div>`); input.value = ''; messages.scrollTop = messages.scrollHeight; try { const response = await fetch(apiUrl('/api/assistant'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error?.message || 'Assistant unavailable.'); document.querySelector('.assistant-loading').outerHTML = `<div class="assistant-message assistant-message-bot">${data.answer}</div>`; } catch (error) { document.querySelector('.assistant-loading').textContent = error.message; } messages.scrollTop = messages.scrollHeight; });

const loginPassword = document.querySelector('#login-password');
const passwordToggle = document.querySelector('#toggle-login-password');
if (passwordToggle && loginPassword) {
  passwordToggle.addEventListener('click', () => {
    const visible = loginPassword.type === 'text';
    loginPassword.type = visible ? 'password' : 'text';
    passwordToggle.textContent = visible ? 'Show' : 'Hide';
    passwordToggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
  });
}
const savedLoginEmail = localStorage.getItem('arandia-login-email');
if (savedLoginEmail) {
  const email = document.querySelector('#login-email');
  const remember = document.querySelector('#remember-login');
  if (email) email.value = savedLoginEmail;
  if (remember) remember.checked = true;
}
const loginForm = document.querySelector('#login-form');
if (loginForm) loginForm.addEventListener('submit', () => {
  const remember = document.querySelector('#remember-login');
  const email = document.querySelector('#login-email');
  if (remember?.checked && email?.value) localStorage.setItem('arandia-login-email', email.value.trim());
  else localStorage.removeItem('arandia-login-email');
});
renderCart(); loadProducts();
updateDeliveryFee();
renderSession();
fetchCurrentUserProfile();
initStoreLocalWidgets();
handlePaymentReturn();
routePage();