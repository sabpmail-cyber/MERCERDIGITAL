'use server'

import { requireAdminUserId } from '@/lib/get-admin'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { put, del } from '@vercel/blob'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function parseLines(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== 'string') return []
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export async function createProduct(formData: FormData) {
  const userId = await requireAdminUserId()

  const name = String(formData.get('name') ?? '').trim()
  if (!name) throw new Error('Product name is required')

  const tagline = String(formData.get('tagline') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const priceDollars = Number.parseFloat(String(formData.get('price') ?? '0'))
  const priceCents = Math.round(
    Number.isFinite(priceDollars) ? priceDollars * 100 : 0,
  )
  const currency = String(formData.get('currency') ?? 'usd').toLowerCase()
  const category = String(formData.get('category') ?? '').trim()
  const compatibility = String(formData.get('compatibility') ?? '').trim()
  const version = String(formData.get('version') ?? '').trim()
  const features = parseLines(formData.get('features'))
  const included = parseLines(formData.get('included'))
  const status = formData.get('status') === 'active' ? 'active' : 'draft'

  let slug = slugify(name)
  const existing = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1)
  if (existing.length > 0) {
    slug = `${slug}-${Date.now().toString(36)}`
  }

  let heroImageUrl: string | null = null
  const heroImage = formData.get('heroImage')
  if (heroImage instanceof File && heroImage.size > 0) {
    const blob = await put(`products/${slug}/hero-${heroImage.name}`, heroImage, {
      access: 'public',
      addRandomSuffix: true,
    })
    heroImageUrl = blob.url
  }

  const galleryFiles = formData.getAll('galleryImages')
  const galleryImages: string[] = []
  for (const file of galleryFiles) {
    if (file instanceof File && file.size > 0) {
      const blob = await put(`products/${slug}/gallery-${file.name}`, file, {
        access: 'public',
        addRandomSuffix: true,
      })
      galleryImages.push(blob.url)
    }
  }

  let filePathname: string | null = null
  let fileName: string | null = null
  let fileSizeBytes: number | null = null
  const productFile = formData.get('productFile')
  if (productFile instanceof File && productFile.size > 0) {
    const blob = await put(`products/${slug}/download-${productFile.name}`, productFile, {
      access: 'private',
      addRandomSuffix: true,
    })
    filePathname = blob.pathname
    fileName = productFile.name
    fileSizeBytes = productFile.size
  }

  const [created] = await db
    .insert(products)
    .values({
      slug,
      name,
      tagline: tagline || null,
      description: description || null,
      priceCents,
      currency,
      status,
      category: category || null,
      heroImageUrl,
      galleryImages,
      features,
      included,
      compatibility: compatibility || null,
      version: version || null,
      filePathname,
      fileName,
      fileSizeBytes,
      userId,
    })
    .returning({ id: products.id })

  revalidatePath('/admin')
  revalidatePath('/shop')
  revalidatePath('/')
  redirect(`/admin/products/${created.id}`)
}

export async function updateProduct(productId: number, formData: FormData) {
  const userId = await requireAdminUserId()

  const [existingProduct] = await db
    .select()
    .from(products)
    .where(and(eq(products.id, productId), eq(products.userId, userId)))
    .limit(1)
  if (!existingProduct) throw new Error('Product not found')

  const name = String(formData.get('name') ?? '').trim()
  const tagline = String(formData.get('tagline') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const priceDollars = Number.parseFloat(String(formData.get('price') ?? '0'))
  const priceCents = Math.round(
    Number.isFinite(priceDollars) ? priceDollars * 100 : 0,
  )
  const currency = String(formData.get('currency') ?? 'usd').toLowerCase()
  const category = String(formData.get('category') ?? '').trim()
  const compatibility = String(formData.get('compatibility') ?? '').trim()
  const version = String(formData.get('version') ?? '').trim()
  const features = parseLines(formData.get('features'))
  const included = parseLines(formData.get('included'))
  const status = formData.get('status') === 'active' ? 'active' : 'draft'

  let heroImageUrl = existingProduct.heroImageUrl
  const heroImage = formData.get('heroImage')
  if (heroImage instanceof File && heroImage.size > 0) {
    const blob = await put(
      `products/${existingProduct.slug}/hero-${heroImage.name}`,
      heroImage,
      { access: 'public', addRandomSuffix: true },
    )
    heroImageUrl = blob.url
  }

  const galleryFiles = formData.getAll('galleryImages')
  const newGalleryImages: string[] = []
  for (const file of galleryFiles) {
    if (file instanceof File && file.size > 0) {
      const blob = await put(
        `products/${existingProduct.slug}/gallery-${file.name}`,
        file,
        { access: 'public', addRandomSuffix: true },
      )
      newGalleryImages.push(blob.url)
    }
  }
  const existingGallery = Array.isArray(existingProduct.galleryImages)
    ? (existingProduct.galleryImages as string[])
    : []
  const galleryImages = [...existingGallery, ...newGalleryImages]

  let filePathname = existingProduct.filePathname
  let fileName = existingProduct.fileName
  let fileSizeBytes = existingProduct.fileSizeBytes
  const productFile = formData.get('productFile')
  if (productFile instanceof File && productFile.size > 0) {
    if (existingProduct.filePathname) {
      await del(existingProduct.filePathname).catch(() => {})
    }
    const blob = await put(
      `products/${existingProduct.slug}/download-${productFile.name}`,
      productFile,
      { access: 'private', addRandomSuffix: true },
    )
    filePathname = blob.pathname
    fileName = productFile.name
    fileSizeBytes = productFile.size
  }

  await db
    .update(products)
    .set({
      name: name || existingProduct.name,
      tagline: tagline || null,
      description: description || null,
      priceCents,
      currency,
      status,
      category: category || null,
      heroImageUrl,
      galleryImages,
      features,
      included,
      compatibility: compatibility || null,
      version: version || null,
      filePathname,
      fileName,
      fileSizeBytes,
      updatedAt: new Date(),
    })
    .where(and(eq(products.id, productId), eq(products.userId, userId)))

  revalidatePath('/admin')
  revalidatePath(`/admin/products/${productId}`)
  revalidatePath('/shop')
  revalidatePath(`/products/${existingProduct.slug}`)
  revalidatePath('/')
}

export async function removeGalleryImage(productId: number, imageUrl: string) {
  const userId = await requireAdminUserId()
  const [existingProduct] = await db
    .select()
    .from(products)
    .where(and(eq(products.id, productId), eq(products.userId, userId)))
    .limit(1)
  if (!existingProduct) throw new Error('Product not found')

  const galleryImages = (
    Array.isArray(existingProduct.galleryImages)
      ? (existingProduct.galleryImages as string[])
      : []
  ).filter((url) => url !== imageUrl)

  await db
    .update(products)
    .set({ galleryImages, updatedAt: new Date() })
    .where(and(eq(products.id, productId), eq(products.userId, userId)))

  await del(imageUrl).catch(() => {})

  revalidatePath(`/admin/products/${productId}`)
}

export async function deleteProduct(productId: number) {
  const userId = await requireAdminUserId()
  const [existingProduct] = await db
    .select()
    .from(products)
    .where(and(eq(products.id, productId), eq(products.userId, userId)))
    .limit(1)
  if (!existingProduct) throw new Error('Product not found')

  if (existingProduct.filePathname) {
    await del(existingProduct.filePathname).catch(() => {})
  }
  const galleryImages = Array.isArray(existingProduct.galleryImages)
    ? (existingProduct.galleryImages as string[])
    : []
  for (const url of galleryImages) {
    await del(url).catch(() => {})
  }
  if (existingProduct.heroImageUrl) {
    await del(existingProduct.heroImageUrl).catch(() => {})
  }

  await db
    .delete(products)
    .where(and(eq(products.id, productId), eq(products.userId, userId)))

  revalidatePath('/admin')
  revalidatePath('/shop')
  revalidatePath('/')
  redirect('/admin')
}
