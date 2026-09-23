import { NextResponse } from 'next/server';

type ProductContext = {
  name: string;
  category: string;
  price: string;
};

type ChatRequest = {
  message?: string;
  products?: ProductContext[];
};

const fallbackReply = (message: string, products: ProductContext[]) => {
  const question = message.toLowerCase();
  const catalog = products.length
    ? products.map((product) => `${product.name} (${product.category}, ${product.price})`).join(', ')
    : 'No published products are currently available.';

  if (question.includes('product') || question.includes('available') || question.includes('sell') || question.includes('have')) {
    return `Our live catalog currently includes: ${catalog}`;
  }

  if (question.includes('cash') || question.includes('cod') || question.includes('delivery')) {
    return 'We offer Cash on Delivery. Open your profile to save your complete address and distance from SONORA; the checkout will calculate the delivery fee automatically.';
  }

  if (question.includes('gcash') || question.includes('qr') || question.includes('pay')) {
    return 'At checkout, you can choose GCash, QR code, or Cash on Delivery. GCash and QR payments show a generated payment code, while COD uses your saved delivery details.';
  }

  if (question.includes('cart') || question.includes('buy') || question.includes('order')) {
    return 'Sign in first, then select the plus button on any product to add it to your cart. Open Cart to review your items and proceed to payment.';
  }

  if (question.includes('address') || question.includes('profile')) {
    return 'Select your account name in the top bar to open your profile. You can edit your phone number, delivery address, and distance there.';
  }

  return 'I can help with products, carts, orders, GCash, QR payments, Cash on Delivery, delivery fees, and profile details. What would you like to know?';
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const message = body.message?.trim();
    const products = Array.isArray(body.products) ? body.products.slice(0, 40) : [];

    if (!message) {
      return NextResponse.json({ reply: 'Tell me what you need help with.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: fallbackReply(message, products), mode: 'local' });
    }

    const endpoint = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const catalog = products.map((product) => `${product.name} | ${product.category} | ${product.price}`).join('\n');

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 220,
        messages: [
          {
            role: 'system',
            content: `You are the SONORA Music Store assistant. Answer briefly and warmly. Only claim product availability from this live catalog. Explain that payment and COD orders are completed in the website checkout. Live catalog:\n${catalog || 'No products published yet.'}`,
          },
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ reply: fallbackReply(message, products), mode: 'local' });
    }

    const payload = await response.json();
    const reply = payload?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ reply: reply || fallbackReply(message, products), mode: 'ai' });
  } catch {
    return NextResponse.json({ reply: 'I could not connect right now. Please try again or email hello@sonorafestival.ph.', mode: 'local' });
  }
}
