import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...valueParts] = trimmed.split("=");
  if (key && valueParts.length > 0) {
    process.env[key.trim()] = valueParts.join("=").trim();
  }
}

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  console.log("Connecting to Neon...");
  console.log("URL:", process.env.DATABASE_URL?.substring(0, 50) + "...");

  console.log("\nCreating orders table...");
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
  console.log("✓ orders table created");

  console.log("Creating indexes...");
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);`;
  console.log("✓ idx_orders_status created");

  await sql`CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);`;
  console.log("✓ idx_orders_email created");

  // Test insert
  console.log("\nTesting insert...");
  const result = await sql`INSERT INTO orders (id, document_slug, document_name, answers, customer_name, customer_email, amount, review_requested, status)
    VALUES ('NKM-TEST-001', 'test', 'Test Document', '{}', 'Test User', 'test@test.com', 1000, false, 'test')
    RETURNING id`;
  console.log("✓ Test insert successful:", result[0].id);

  // Clean up test
  await sql`DELETE FROM orders WHERE id = 'NKM-TEST-001'`;
  console.log("✓ Test data cleaned up");

  console.log("\n✅ Database initialized successfully!");
}

main().catch((err) => {
  console.error("❌ Database initialization failed:", err);
  process.exit(1);
});
