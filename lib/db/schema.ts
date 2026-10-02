import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables --------------------------------------------------------
// No foreign keys on app tables (per Neon skill guidance) — userId is a
// plain scoping column so schema iteration stays easy.

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline'),
  description: text('description'),
  priceCents: integer('price_cents').notNull(),
  currency: text('currency').notNull().default('usd'),
  status: text('status').notNull().default('draft'), // 'draft' | 'active'
  category: text('category'),
  heroImageUrl: text('hero_image_url'),
  galleryImages: jsonb('gallery_images').notNull().default([]),
  features: jsonb('features').notNull().default([]),
  included: jsonb('included').notNull().default([]),
  compatibility: text('compatibility'),
  version: text('version'),
  filePathname: text('file_pathname'),
  fileName: text('file_name'),
  fileSizeBytes: integer('file_size_bytes'),
  userId: text('userId').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  productId: integer('product_id').notNull(),
  productName: text('product_name').notNull(),
  email: text('email').notNull(),
  amountCents: integer('amount_cents').notNull(),
  currency: text('currency').notNull().default('usd'),
  downloadToken: text('download_token').notNull().unique(),
  downloadsRemaining: integer('downloads_remaining').notNull().default(5),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
