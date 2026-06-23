import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export { sql };

export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      document_slug TEXT NOT NULL,
      document_name TEXT NOT NULL,
      answers JSONB NOT NULL DEFAULT '{}',
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      amount INTEGER NOT NULL,
      review_requested BOOLEAN NOT NULL DEFAULT false,
      status TEXT NOT NULL DEFAULT 'pending_payment',
      payment_method TEXT,
      payment_reference TEXT,
      download_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
  `;
}

export async function createOrder(order: {
  id: string;
  documentSlug: string;
  documentName: string;
  answers: Record<string, unknown>;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  reviewRequested: boolean;
  paymentMethod?: string;
  paymentReference?: string;
}) {
  const result = await sql`
    INSERT INTO orders (
      id, document_slug, document_name, answers,
      customer_name, customer_email, customer_phone,
      amount, review_requested, status, payment_method, payment_reference
    ) VALUES (
      ${order.id},
      ${order.documentSlug},
      ${order.documentName},
      ${JSON.stringify(order.answers)}::jsonb,
      ${order.customerName},
      ${order.customerEmail},
      ${order.customerPhone || null},
      ${order.amount},
      ${order.reviewRequested},
      'pending_payment',
      ${order.paymentMethod || null},
      ${order.paymentReference || null}
    )
    RETURNING *
  `;
  return result[0];
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  downloadUrl?: string
) {
  const result = await sql`
    UPDATE orders
    SET status = ${status},
        download_url = ${downloadUrl || null},
        updated_at = NOW()
    WHERE id = ${orderId}
    RETURNING *
  `;
  return result[0];
}

export async function getOrderByPaymentRef(paymentRef: string) {
  const result = await sql`
    SELECT * FROM orders WHERE payment_reference = ${paymentRef} LIMIT 1
  `;
  return result[0];
}

export async function getOrderById(orderId: string) {
  const result = await sql`
    SELECT * FROM orders WHERE id = ${orderId} LIMIT 1
  `;
  return result[0];
}
