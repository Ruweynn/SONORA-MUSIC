"use client";

import { useEffect, useMemo, useState } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          prompt: (callback?: (notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => void) => void;
        };
      };
    };
  }
}

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string;
};

type PaymentMethod = 'gcash' | 'qr' | 'cash';

type StudioReservation = {
  studioName: string;
  hourlyRate: number;
  date: string;
  startTime: string;
  endTime: string;
};

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

type ProductReview = {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const categories = ['all', 'Guitars', 'Pedals', 'Amplifiers', 'Studio', 'Drums', 'Keyboards'];

const normalizeCategory = (value: string) => value.trim().toLowerCase().replace(/[^a-z]/g, '');

const parsePriceValue = (price: string) => Number(String(price).replace(/[^\d.]/g, '')) || 0;

const getCodFee = (distanceKm: number) => {
  if (distanceKm <= 5) return 50;
  if (distanceKm <= 10) return 80;
  if (distanceKm <= 20) return 120;
  return 120 + Math.ceil(distanceKm - 20) * 15;
};

const formatCategory = (value: string) => {
  const normalized = normalizeCategory(value);
  const mapped: Record<string, string> = {
    guitar: 'Guitars',
    guitars: 'Guitars',
    pedal: 'Pedals',
    pedals: 'Pedals',
    amplifier: 'Amplifiers',
    amplifiers: 'Amplifiers',
    studio: 'Studio',
    drum: 'Drums',
    drums: 'Drums',
    keyboard: 'Keyboards',
    keyboards: 'Keyboards',
  };

  return mapped[normalized] || value.trim() || 'General';
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<Product[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservation, setReservation] = useState<StudioReservation | null>(null);
  const [reservationEmail, setReservationEmail] = useState('');
  const [reservationStatus, setReservationStatus] = useState<string | null>(null);
  const [reservationSending, setReservationSending] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'assistant', content: 'Hi! I can help with SONORA products, studio reservations, payments, and delivery.' },
  ]);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [profileAddress, setProfileAddress] = useState('');
  const [profileDistance, setProfileDistance] = useState('');

  const cartTotal = cart.reduce((total, product) => total + parsePriceValue(product.price), 0);
  const cartCount = cart.length;
  const codFee = getCodFee(Number(profileDistance) || 0);
  const checkoutTotal = cartTotal + (paymentMethod === 'cash' ? codFee : 0);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(`SONORA|${Date.now()}|${checkoutTotal}|${paymentMethod}`)}`;

  useEffect(() => {
    const savedProfile = window.localStorage.getItem('sonora-profile');
    if (!savedProfile) return;
    try {
      const saved = JSON.parse(savedProfile);
      setUserName(saved.name || 'Guest');
      setUserEmail(saved.email || '');
      setProfileAddress(saved.address || '');
      setProfileDistance(saved.distanceKm ? String(saved.distanceKm) : '');
      setIsLoggedIn(Boolean(saved.email));
    } catch {
      window.localStorage.removeItem('sonora-profile');
    }
  }, []);

  const requireLogin = (message: string) => {
    if (!isLoggedIn) {
      setLoginError(message);
      setIsLoginOpen(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const savedReviews = window.localStorage.getItem('sonora-product-reviews');
    if (!savedReviews) return;
    try {
      const parsed = JSON.parse(savedReviews) as ProductReview[];
      if (Array.isArray(parsed)) setReviews(parsed);
    } catch {
      window.localStorage.removeItem('sonora-product-reviews');
    }
  }, []);

  const openReviews = (product: Product) => {
    setReviewProduct(product);
    setReviewRating(5);
    setReviewComment('');
  };

  const submitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reviewProduct || !reviewComment.trim()) return;
    if (requireLogin('Mag-sign in muna para makapag-rate at mag-comment.')) return;

    const nextReview: ProductReview = {
      id: Date.now(),
      productId: reviewProduct.id,
      author: userName,
      rating: reviewRating,
      comment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };
    const nextReviews = [nextReview, ...reviews];
    setReviews(nextReviews);
    window.localStorage.setItem('sonora-product-reviews', JSON.stringify(nextReviews));
    setReviewComment('');
  };

  const productReviews = reviewProduct ? reviews.filter((review) => review.productId === reviewProduct.id) : [];
  const averageRating = productReviews.length
    ? productReviews.reduce((total, review) => total + review.rating, 0) / productReviews.length
    : 0;

  const sendChatMessage = async (event?: React.FormEvent<HTMLFormElement>, suggestedMessage?: string) => {
    event?.preventDefault();
    const message = (suggestedMessage ?? chatInput).trim();
    if (!message || chatLoading) return;
    setChatMessages((current) => [...current, { id: Date.now(), role: 'user', content: message }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, products: products.map(({ name, category, price }) => ({ name, category, price })) }),
      });
      const payload = await response.json();
      setChatMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', content: payload.reply || 'Please try asking another way.' }]);
    } catch {
      setChatMessages((current) => [...current, { id: Date.now() + 1, role: 'assistant', content: 'I could not connect right now. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const addToCart = (productId: number) => {
    if (requireLogin('Sign in to unlock your cart and add products.')) {
      return;
    }

    const product = products.find((item) => item.id === productId);
    if (product && normalizeCategory(product.category) === 'studio') {
      setReservation({
        studioName: product.name,
        hourlyRate: parsePriceValue(product.price),
        date: '',
        startTime: '',
        endTime: '',
      });
      setReservationEmail(userEmail);
      setReservationStatus(null);
      setIsReservationOpen(true);
      return;
    }

    setSelectedProductId(productId);
    if (product) setCart((current) => [...current, product]);

    window.setTimeout(() => {
      setSelectedProductId((current) => (current === productId ? null : current));
    }, 500);
  };

  const openCheckout = () => {
    if (!cart.length) {
      setPaymentStatus('Add a product to your cart before checkout.');
      return;
    }
    setPaymentStatus(null);
    setIsCheckoutOpen(true);
  };

  const placeOrder = () => {
    if (!cart.length) return;
    if (paymentMethod === 'cash' && (!profileAddress.trim() || Number(profileDistance) <= 0)) {
      setPaymentStatus('I-update muna ang profile gamit ang delivery address at distance bago mag-Cash on Delivery.');
      setIsCheckoutOpen(false);
      setIsProfileOpen(true);
      return;
    }
    const orderId = `SON-${Date.now()}`;
    window.localStorage.setItem('sonora-last-order', JSON.stringify({
      id: orderId,
      paymentMethod,
      items: cart,
      subtotal: cartTotal,
      deliveryFee: paymentMethod === 'cash' ? codFee : 0,
      total: checkoutTotal,
      createdAt: new Date().toISOString(),
    }));
    setCart([]);
    setIsCheckoutOpen(false);
    setPaymentStatus(`Order ${orderId} placed. Complete your ${paymentMethod === 'cash' ? 'Cash on Delivery' : paymentMethod === 'gcash' ? 'GCash' : 'QR'} payment.`);
  };

  const reservationHours = reservation?.startTime && reservation.endTime
    ? Math.max(0, (new Date(`1970-01-01T${reservation.endTime}`).getTime() - new Date(`1970-01-01T${reservation.startTime}`).getTime()) / 3600000)
    : 0;
  const reservationTotal = reservation ? reservationHours * reservation.hourlyRate : 0;

  const submitReservation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reservation || !reservationEmail.trim()) {
      setReservationStatus('Ilagay ang Gmail address na tatanggap ng reservation confirmation.');
      return;
    }
    if (!reservation.date || !reservation.startTime || !reservation.endTime || reservationHours <= 0) {
      setReservationStatus('Pumili ng petsa, start time, at end time. Dapat mas maaga ang start kaysa end time.');
      return;
    }

    setReservationSending(true);
    setReservationStatus(null);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reservation,
          email: reservationEmail.trim(),
          customerName: userName,
          hours: reservationHours,
          total: reservationTotal,
        }),
      });
      const rawResponse = await response.text();
      let payload: { error?: string; message?: string } = {};
      try {
        payload = JSON.parse(rawResponse);
      } catch {
        throw new Error(`Reservation service unavailable (${response.status}). Please refresh and try again.`);
      }
      if (!response.ok) throw new Error(payload.error || 'Reservation failed.');
      setReservationStatus(payload.message || 'Naipadala na ang reservation confirmation sa iyong Gmail.');
    } catch (error) {
      setReservationStatus(error instanceof Error ? error.message : 'Hindi naipadala ang reservation.');
    } finally {
      setReservationSending(false);
    }
  };

  const parseGoogleToken = (credential: string) => {
    try {
      const base64Payload = credential.split('.')[1];
      const normalized = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
      const decoded = atob(padded);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Google token decode failed:', error);
      return null;
    }
  };

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      setLoginError('Google OAuth is not configured yet. Add NEXT_PUBLIC_GOOGLE_CLIENT_ID in your frontend .env.local file.');
      return;
    }

    if (!window.google?.accounts?.id || !googleReady) {
      setLoginError('Google is still loading. Please wait a moment and try again.');
      return;
    }

    setLoginError(null);
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        setLoginError('Google sign-in was blocked or skipped. Please allow popups/cookies for localhost and try again.');
      }
    });
  };

  const handleEmailLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailField = form.elements.namedItem('email') as HTMLInputElement | null;
    const email = emailField?.value?.trim() ?? '';
    const enteredName = emailField?.value?.split('@')[0] ?? 'Music lover';

    setUserName(enteredName || 'Music lover');
    setUserEmail(email);
    setReservationEmail(email);
    setIsLoggedIn(true);
    window.localStorage.setItem('sonora-profile', JSON.stringify({ name: enteredName || 'Music lover', email, address: profileAddress, distanceKm: Number(profileDistance) || 0 }));
    setIsLoginOpen(false);
  };

  const saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.localStorage.setItem('sonora-profile', JSON.stringify({ name: userName, email: userEmail, address: profileAddress, distanceKm: Number(profileDistance) || 0 }));
    setIsProfileOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('Guest');
    setUserEmail('');
    setIsProfileOpen(false);
    window.localStorage.removeItem('sonora-profile');
  };

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      return;
    }

    const scriptId = 'google-gsi-script';
    const existingScript = document.getElementById(scriptId);

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          const payload = parseGoogleToken(response.credential);

          if (!payload) {
            setLoginError('Google sign-in failed. Please try again.');
            return;
          }

          const name = payload.name || payload.email || 'Google user';
          setUserName(name);
          setUserEmail(payload.email || '');
          setReservationEmail(payload.email || '');
          setIsLoggedIn(true);
          setIsLoginOpen(false);
          setLoginError(null);
        },
      });

      setGoogleReady(true);
    };

    if (existingScript) {
      initializeGoogle();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    script.onerror = () => {
      setLoginError('Google SDK failed to load. Please refresh and try again.');
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchProducts = async (attempt = 0) => {
      const candidateBases = Array.from(
        new Set([
          process.env.NEXT_PUBLIC_STRAPI_URL,
          'http://localhost:1337',
          'http://127.0.0.1:1337',
        ].filter(Boolean) as string[]),
      );

      let liveProducts: Product[] = [];

      for (const baseUrl of candidateBases) {
        const controller = new AbortController();
        const timer = window.setTimeout(() => controller.abort(), 5000);

        try {
          const response = await fetch(`${baseUrl}/api/products?populate=image&sort=id:asc`, {
            signal: controller.signal,
            cache: 'no-store',
          });

          if (!response.ok) {
            throw new Error(`Failed to load products: ${response.status}`);
          }

          const payload = await response.json();
          const normalizedList = Array.isArray(payload?.data) ? payload.data : [];

          liveProducts = normalizedList
            .map((item: any) => {
              const entry = item?.attributes ?? item ?? {};
              const rawPrice = Number(entry.price ?? item?.price ?? 0);
            const imageRecord = entry.image ?? item?.image;
            const imagePath = imageRecord?.data?.attributes?.url ?? imageRecord?.url ?? '';
            const imageUrl = imagePath
              ? imagePath.startsWith('http')
                ? imagePath
                : `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
              : undefined;

            const cleanName = typeof (entry.name ?? item?.name) === 'string'
              ? String(entry.name ?? item?.name).trim()
              : '';
            const rawCategory = typeof (entry.category ?? item?.category) === 'string'
              ? String(entry.category ?? item?.category)
              : '';
              const cleanCategory = formatCategory(rawCategory);
              const isPublished = Boolean(entry.publishedAt ?? item?.publishedAt ?? true);

              if (!cleanName || !cleanCategory || !isPublished) {
                return null;
              }

              return {
                id: Number(item?.id ?? entry.id ?? Math.random()),
                name: cleanName,
                category: cleanCategory,
                price: Number.isFinite(rawPrice) && rawPrice > 0
                  ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(rawPrice)
                  : 'Price on request',
                image: imageUrl,
              };
            })
            .filter(Boolean) as Product[];

          if (liveProducts.length > 0) {
            setProducts(liveProducts);
            return;
          }
        } catch (error) {
          console.warn(`Strapi fetch failed for ${baseUrl}:`, error);
        } finally {
          window.clearTimeout(timer);
        }
      }

      setProducts([]);
      if (attempt < 4) {
        window.setTimeout(() => fetchProducts(attempt + 1), 3000);
      }
    };

    fetchProducts().finally(() => setLoading(false));
  }, []);

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((product) => normalizeCategory(product.category) === normalizeCategory(activeCategory));
  }, [activeCategory, products]);

  return (
    <main className="store-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">S</span>
          <div>
            <strong>SONORA</strong>
            <small>Music Store</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href="#support">Support</a>
        </nav>

        <div className="header-actions">
          {isLoggedIn ? (
            <button className="account-button" type="button" onClick={() => setIsProfileOpen(true)}>
              {userName}
            </button>
          ) : (
            <button className="login-button" type="button" onClick={() => setIsLoginOpen(true)}>
              Log in
            </button>
          )}

          <button
            className={isLoggedIn ? 'cart-button' : 'cart-button locked'}
            type="button"
            onClick={() => {
              if (requireLogin('Sign in to access your cart.')) {
                return;
              }
              openCheckout();
            }}
          >
            Cart ({cartCount})
          </button>
        </div>
      </header>

      {paymentStatus ? <div className="checkout-banner">{paymentStatus}</div> : null}

      {isCheckoutOpen ? (
        <div className="login-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <section className="checkout-modal" onClick={(event) => event.stopPropagation()}>
            <div className="login-header">
              <div><p className="eyebrow login-eyebrow">Checkout</p><h3>Choose your payment</h3></div>
              <button type="button" className="close-button" onClick={() => setIsCheckoutOpen(false)} aria-label="Close checkout">×</button>
            </div>
            <div className="checkout-total-row"><span>{cartCount} item(s)</span><strong>₱{checkoutTotal.toLocaleString()}</strong></div>
            <div className="payment-options">
              {(['gcash', 'qr', 'cash'] as PaymentMethod[]).map((method) => <label className={paymentMethod === method ? 'payment-option active' : 'payment-option'} key={method}><input type="radio" name="payment-method" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} /><span>{method === 'gcash' ? 'GCash' : method === 'qr' ? 'QR code' : 'Cash on Delivery'}</span></label>)}
            </div>
            {paymentMethod === 'cash' ? <div className="cod-summary"><div><span>Items subtotal</span><strong>₱{cartTotal.toLocaleString()}</strong></div><div><span>COD delivery fee</span><strong>₱{codFee.toLocaleString()}</strong></div><small>{profileAddress ? `${profileAddress} · ${profileDistance} km` : 'Add your delivery details in Profile.'}</small></div> : null}
            {paymentMethod !== 'cash' ? <div className="qr-box"><img src={qrCodeUrl} alt="Generated payment QR code" /><div><p>Scan to pay</p><strong>{paymentMethod === 'gcash' ? 'GCash' : 'QR payment'}</strong><small>Amount: ₱{checkoutTotal.toLocaleString()}</small></div></div> : null}
            <p className="payment-note">{paymentMethod === 'cash' ? 'Pay cash when your order arrives.' : 'Complete payment using the displayed GCash or QR option after placing your order.'}</p>
            <button type="button" className="submit-button" onClick={placeOrder}>Place order</button>
          </section>
        </div>
      ) : null}

      {isProfileOpen ? (
        <div className="login-backdrop" onClick={() => setIsProfileOpen(false)}>
          <section className="profile-modal" onClick={(event) => event.stopPropagation()}>
            <div className="login-header"><div><p className="eyebrow login-eyebrow">Your SONORA profile</p><h3>Delivery details</h3></div><button type="button" className="close-button" onClick={() => setIsProfileOpen(false)} aria-label="Close profile">×</button></div>
            <p className="profile-intro">Ilagay ang address at layo mula SONORA para awtomatikong makuwenta ang Cash on Delivery fee.</p>
            <form className="profile-form" onSubmit={saveProfile}>
              <label>Name<input value={userName} onChange={(event) => setUserName(event.target.value)} required /></label>
              <label>Email<input value={userEmail} readOnly /></label>
              <label className="profile-full">Delivery address<textarea value={profileAddress} onChange={(event) => setProfileAddress(event.target.value)} placeholder="House number, street, barangay, city" required /></label>
              <label className="profile-full">Distance from SONORA (km)<input type="number" min="0.1" step="0.1" value={profileDistance} onChange={(event) => setProfileDistance(event.target.value)} placeholder="e.g. 8.5" required /></label>
              <p className="profile-help">COD fee: ₱50 up to 5 km, ₱80 up to 10 km, ₱120 up to 20 km, then ₱15 per additional kilometer.</p>
              <button type="submit" className="submit-button">Save profile</button>
            </form>
            <button type="button" className="logout-link" onClick={logout}>Log out</button>
          </section>
        </div>
      ) : null}

      {reviewProduct ? (
        <div className="login-backdrop" onClick={() => setReviewProduct(null)}>
          <section className="review-modal" onClick={(event) => event.stopPropagation()}>
            <div className="login-header">
              <div>
                <p className="eyebrow login-eyebrow">Community reviews</p>
                <h3>{reviewProduct.name}</h3>
              </div>
              <button type="button" className="close-button" onClick={() => setReviewProduct(null)} aria-label="Close reviews">×</button>
            </div>

            <div className="review-average">
              <strong>{averageRating ? averageRating.toFixed(1) : '—'}</strong>
              <span>{averageRating ? '★'.repeat(Math.round(averageRating)) : 'No ratings yet'}<small>{productReviews.length ? ` ${productReviews.length} review${productReviews.length === 1 ? '' : 's'}` : ''}</small></span>
            </div>

            <form className="review-form" onSubmit={submitReview}>
              <div className="rating-picker" aria-label="Choose a rating">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button type="button" key={rating} className={rating <= reviewRating ? 'star selected' : 'star'} onClick={() => setReviewRating(rating)} aria-label={`${rating} stars`}>★</button>
                ))}
              </div>
              <textarea value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} placeholder="Share your experience with this product..." required />
              <button type="submit" className="submit-button">Post review</button>
            </form>

            <div className="review-list">
              {productReviews.length ? productReviews.map((review) => (
                <article className="review-item" key={review.id}>
                  <div><strong>{review.author}</strong><span>{'★'.repeat(review.rating)}</span></div>
                  <p>{review.comment}</p>
                </article>
              )) : <p className="empty-review">Wala pang reviews. Ikaw ang unang mag-rate.</p>}
            </div>
          </section>
        </div>
      ) : null}

      {isReservationOpen && reservation ? (
        <div className="login-backdrop" onClick={() => setIsReservationOpen(false)}>
          <section className="reservation-modal" onClick={(event) => event.stopPropagation()}>
            <div className="login-header">
              <div>
                <p className="eyebrow login-eyebrow">Studio reservation</p>
                <h3>{reservation.studioName}</h3>
              </div>
              <button type="button" className="close-button" onClick={() => setIsReservationOpen(false)} aria-label="Close reservation">×</button>
            </div>

            <p className="reservation-intro">I-reserve ang studio bago mag-checkout. Piliin ang petsa at oras ng paggamit; automatic na kukuwentahin ang total payment.</p>

            <form className="reservation-form" onSubmit={submitReservation}>
              <label>Date
                <input type="date" min={new Date().toISOString().split('T')[0]} value={reservation.date} onChange={(event) => setReservation({ ...reservation, date: event.target.value })} required />
              </label>
              <label>Start time
                <input type="time" value={reservation.startTime} onChange={(event) => setReservation({ ...reservation, startTime: event.target.value })} required />
              </label>
              <label>End time
                <input type="time" value={reservation.endTime} onChange={(event) => setReservation({ ...reservation, endTime: event.target.value })} required />
              </label>
              <label>Gmail for confirmation
                <input type="email" value={reservationEmail} onChange={(event) => setReservationEmail(event.target.value)} placeholder="you@gmail.com" required />
              </label>

              <div className="reservation-total">
                <div><span>Hourly rate</span><strong>₱{reservation.hourlyRate.toLocaleString()}</strong></div>
                <div><span>Duration</span><strong>{reservationHours || 0} hour(s)</strong></div>
                <div className="reservation-grand-total"><span>Total payment</span><strong>₱{reservationTotal.toLocaleString()}</strong></div>
              </div>

              {reservationStatus ? <p className="reservation-status">{reservationStatus}</p> : null}
              <button type="submit" className="submit-button" disabled={reservationSending}>
                {reservationSending ? 'Sending reservation...' : 'Confirm studio reservation'}
              </button>
            </form>
          </section>
        </div>
      ) : null}

      {isLoginOpen ? (
        <div className="login-backdrop" onClick={() => setIsLoginOpen(false)}>
          <div className="login-modal" onClick={(event) => event.stopPropagation()}>
            <div className="login-header">
              <div>
                <p className="eyebrow login-eyebrow">Welcome back</p>
                <h3>Sign in to SONORA</h3>
              </div>
              <button type="button" className="close-button" onClick={() => setIsLoginOpen(false)}>
                ×
              </button>
            </div>

            <button type="button" className="google-button" onClick={handleGoogleLogin}>
              <span className="google-mark">G</span>
              Continue with Google
            </button>

            {loginError ? <p className="login-error">{loginError}</p> : null}

            <div className="divider"><span>or</span></div>

            <form className="login-form" onSubmit={handleEmailLogin}>
              <label>
                Email
                <input type="email" name="email" placeholder="you@gmail.com" required />
              </label>

              <label>
                Password
                <input type="password" name="password" placeholder="Your password" required />
              </label>

              <button type="submit" className="submit-button">Log in</button>
            </form>
          </div>
        </div>
      ) : null}

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Calapan City · Music Store</p>
          <h1>
            FEEL THE
            <span>SOUND</span>
          </h1>
          <p className="tagline">Built for players</p>
          <p className="hero-text">
            Discover guitars, amps, pedals, and studio essentials built to bring your sound to life.
          </p>
          <div className="cta-row">
            <a href="#shop" className="primary">Shop now</a>
            <a href="#about" className="secondary">Listen now</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Featured product preview">
          <div className="visual-card">
            <img
              className="hero-video"
              src="https://media1.tenor.com/m/1VFipeMyyAYAAAAC/cat-guitar.gif"
              alt="Animated cat playing guitar"
            />
          </div>
        </div>
      </section>

      <section className="products" id="shop">
        <div className="section-head">
          <div>
            <p className="eyebrow">Featured gear</p>
            <h2>Choose your sound</h2>
          </div>

          <div className="filter-row" aria-label="Select category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={category === activeCategory ? 'filter active' : 'filter'}
                aria-pressed={category === activeCategory}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'All gear' : category}
              </button>
            ))}
          </div>
        </div>

        {loading ? <p className="loading-state">Loading gear from Strapi…</p> : null}

        {!isLoggedIn && !loading ? (
          <p className="guest-banner">Guest access: browse only. Sign in to unlock the cart and full shopping access.</p>
        ) : null}

        {!loading && visibleProducts.length === 0 ? (
          <p className="empty-state">No gear matches this category yet.</p>
        ) : null}

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article
              className={selectedProductId === product.id ? 'product-card selected' : 'product-card'}
              key={product.id}
            >
              <div className="product-image">
                {product.image ? <img src={product.image} alt={product.name} /> : null}
              </div>
              <div className="product-meta">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <button type="button" className="review-link" onClick={() => openReviews(product)}>
                  {(() => {
                    const productRatings = reviews.filter((review) => review.productId === product.id);
                    const average = productRatings.length
                      ? productRatings.reduce((total, review) => total + review.rating, 0) / productRatings.length
                      : 0;
                    return average ? `★ ${average.toFixed(1)} · ${productRatings.length} review${productRatings.length === 1 ? '' : 's'}` : 'Be the first to review';
                  })()}
                </button>
                <div className="product-row">
                  <strong>{product.price}</strong>
                  <button
                    type="button"
                    aria-label={isLoggedIn ? `Add ${product.name} to cart` : `Sign in to add ${product.name} to cart`}
                    onClick={() => addToCart(product.id)}
                    disabled={!isLoggedIn}
                    className={isLoggedIn ? '' : 'locked-action'}
                    title={isLoggedIn ? `Add ${product.name} to cart` : 'Sign in to unlock this feature'}
                  >
                    {selectedProductId === product.id && isLoggedIn ? '✓' : isLoggedIn ? '+' : '🔒'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-panel" id="about">
        <div className="about-heading">
          <p className="eyebrow">About SONORA</p>
          <h2>Built by a student. Made for the sound community.</h2>
          <p className="about-lead">SONORA is a music store and creative project founded by Ruine David M. Arandia, created to make discovering great gear feel more personal, accessible, and connected to the people who use it.</p>
        </div>
        <div className="founder-layout">
          <div className="founder-portrait" role="img" aria-label="Portrait of Ruine David M. Arandia">
            <span>DA</span>
            <img src="/founder.jpg" alt="" onError={(event) => event.currentTarget.remove()} />
            <small>Founder · SONORA</small>
          </div>
          <div className="founder-copy">
            <p className="eyebrow">Meet the founder</p>
            <h3>Ruine David M. Arandia</h3>
            <p className="founder-role">Founder and builder · 3rd-year BSIT student</p>
            <p>I am a third-year Bachelor of Science in Information Technology student at Mindoro State University. I built SONORA as a space where my interest in technology meets my appreciation for music, instruments, and the creativity that happens when people find the right sound.</p>
            <p>From the product catalog to the checkout experience, SONORA is shaped around a simple idea: buying music gear should feel clear, welcoming, and exciting.</p>
          </div>
        </div>
        <div className="about-details">
          <article><span className="about-detail-number">01</span><h3>Why SONORA exists</h3><p>To connect players, creators, and dependable gear through a storefront that feels local and easy to use.</p></article>
          <article><span className="about-detail-number">02</span><h3>What I am learning</h3><p>Building SONORA lets me practice web development, product systems, user experience, and practical problem-solving.</p></article>
          <article><span className="about-detail-number">03</span><h3>Where we are going</h3><p>To grow SONORA into a trusted music and technology project for the creative community in Mindoro and beyond.</p></article>
        </div>
      </section>

      <section className="faq-panel" id="faq">
        <div className="faq-heading"><p className="eyebrow">Quick answers</p><h2>Frequently asked questions</h2><p>Everything you need to know before choosing your next sound.</p></div>
        <div className="faq-list">
          <details open><summary>What products are available?</summary><p>SONORA displays published products from the live catalog, including guitars, pedals, amplifiers, studio gear, drums, and keyboards.</p></details>
          <details><summary>Do I need an account to shop?</summary><p>You can browse as a guest. Sign in to add products to your cart and complete checkout.</p></details>
          <details><summary>What payment methods do you accept?</summary><p>Checkout supports GCash, generated QR payment, and Cash on Delivery.</p></details>
          <details><summary>How does Cash on Delivery work?</summary><p>Save your delivery address and distance in your profile, then choose Cash on Delivery at checkout.</p></details>
          <details><summary>How is the COD fee calculated?</summary><p>The fee is ₱50 up to 5 km, ₱80 up to 10 km, ₱120 up to 20 km, then ₱15 for each additional kilometer.</p></details>
          <details><summary>Where can I get more help?</summary><p>Use the SONORA assistant or email hello@sonorafestival.ph.</p></details>
        </div>
      </section>

      <section className="support-panel" id="support">
        <p className="eyebrow">Need help?</p>
        <h3>Talk to the SONORA desk</h3>
        <a href="mailto:hello@sonorafestival.ph">hello@sonorafestival.ph</a>
      </section>

      {isChatOpen ? (
        <section className="chat-panel" aria-label="SONORA AI assistant">
          <div className="chat-header"><div className="chat-title"><span className="chat-avatar">S</span><div><strong>SONORA assistant</strong><small>Online help desk</small></div></div><button type="button" className="chat-close" onClick={() => setIsChatOpen(false)} aria-label="Close assistant">×</button></div>
          <div className="chat-messages" aria-live="polite">
            {chatMessages.map((message) => <div className={`chat-message ${message.role}`} key={message.id}>{message.content}</div>)}
            {chatLoading ? <div className="chat-message assistant">Thinking...</div> : null}
          </div>
          <div className="chat-prompts">
            {['What products are available?', 'How do I reserve the studio?', 'How can I pay?'].map((prompt) => <button type="button" key={prompt} onClick={() => sendChatMessage(undefined, prompt)}>{prompt}</button>)}
          </div>
          <form className="chat-composer" onSubmit={sendChatMessage}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask SONORA anything..." aria-label="Ask SONORA assistant" /><button type="submit" disabled={!chatInput.trim() || chatLoading} aria-label="Send message">↑</button></form>
        </section>
      ) : null}
      <button type="button" className="chat-launcher" onClick={() => setIsChatOpen((current) => !current)} aria-label="Open SONORA assistant"><span>✦</span><strong>Ask SONORA</strong></button>
    </main>
  );
}
