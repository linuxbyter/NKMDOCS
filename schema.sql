-- NKM Documents Database Schema
-- Run this in Neon SQL Editor: https://console.neon.tech → SQL Editor

-- Orders table
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

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);

-- Verify it worked
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
