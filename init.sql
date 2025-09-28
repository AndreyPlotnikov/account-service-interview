-- This script is intended to be run manually.

CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY,
    "userId" UUID NOT NULL,
    balance FLOAT NOT NULL,
    currency VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY,
    "accountId" UUID NOT NULL REFERENCES accounts(id),
    type VARCHAR(50) NOT NULL, -- Intentionally permissive string
    amount FLOAT NOT NULL,
    currency VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
