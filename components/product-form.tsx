'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Button,
  FormControl,
  TextInput,
  Textarea,
  Select,
  Stack,
  Heading,
  Text,
  Radio,
  RadioGroup,
} from '@primer/react'
import { TrashIcon, XIcon } from '@primer/octicons-react'
import { Surface } from '@/components/surface'
import type { Product } from '@/lib/queries'

export function ProductForm({
  mode,
  product,
  action,
  onDelete,
  onRemoveGalleryImage,
}: {
  mode: 'create' | 'edit'
  product?: Product
  action: (formData: FormData) => void | Promise<void>
  onDelete?: () => void | Promise<void>
  onRemoveGalleryImage?: (imageUrl: string) => void | Promise<void>
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const gallery = Array.isArray(product?.galleryImages)
    ? (product?.galleryImages as string[])
    : []

  return (
    <Stack direction="vertical" gap="spacious">
      <Heading as="h1" variant="large">
        {mode === 'create' ? 'New product' : `Edit ${product?.name}`}
      </Heading>

      <form action={action} encType="multipart/form-data">
        <Stack direction="vertical" gap="normal">
          <FormControl required>
            <FormControl.Label>Product name</FormControl.Label>
            <TextInput name="name" defaultValue={product?.name} block />
          </FormControl>

          <FormControl>
            <FormControl.Label>Tagline</FormControl.Label>
            <TextInput
              name="tagline"
              defaultValue={product?.tagline ?? ''}
              placeholder="One line describing the product"
              block
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Textarea
              name="description"
              defaultValue={product?.description ?? ''}
              rows={4}
              block
            />
          </FormControl>

          <Stack direction="horizontal" gap="normal" wrap="wrap">
            <FormControl required style={{ flex: '1 1 160px' }}>
              <FormControl.Label>Price</FormControl.Label>
              <TextInput
                name="price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={
                  product ? (product.priceCents / 100).toFixed(2) : ''
                }
                leadingVisual="$"
                block
              />
            </FormControl>

            <FormControl style={{ flex: '1 1 160px' }}>
              <FormControl.Label>Currency</FormControl.Label>
              <Select name="currency" defaultValue={product?.currency ?? 'usd'} block>
                <Select.Option value="usd">USD</Select.Option>
                <Select.Option value="cad">CAD</Select.Option>
                <Select.Option value="eur">EUR</Select.Option>
                <Select.Option value="gbp">GBP</Select.Option>
              </Select>
            </FormControl>

            <FormControl style={{ flex: '1 1 160px' }}>
              <FormControl.Label>Category</FormControl.Label>
              <TextInput
                name="category"
                defaultValue={product?.category ?? ''}
                placeholder="Personal finance"
                block
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormControl.Label>Features (one per line)</FormControl.Label>
            <Textarea
              name="features"
              defaultValue={
                Array.isArray(product?.features)
                  ? (product?.features as string[]).join('\n')
                  : ''
              }
              rows={5}
              block
              placeholder={'12 structured sheets\nAutomatic net worth tracking\nBuilt-in monthly review'}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>What&apos;s included (one per line)</FormControl.Label>
            <Textarea
              name="included"
              defaultValue={
                Array.isArray(product?.included)
                  ? (product?.included as string[]).join('\n')
                  : ''
              }
              rows={4}
              block
              placeholder={'Core workbook (.xlsx)\nCompleted example workbook\nQuick-start guide (PDF)'}
            />
          </FormControl>

          <Stack direction="horizontal" gap="normal" wrap="wrap">
            <FormControl style={{ flex: '1 1 200px' }}>
              <FormControl.Label>Compatibility</FormControl.Label>
              <TextInput
                name="compatibility"
                defaultValue={product?.compatibility ?? ''}
                placeholder="Microsoft Excel"
                block
              />
            </FormControl>
            <FormControl style={{ flex: '1 1 200px' }}>
              <FormControl.Label>Version</FormControl.Label>
              <TextInput
                name="version"
                defaultValue={product?.version ?? ''}
                placeholder="1.0"
                block
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormControl.Label>Hero image</FormControl.Label>
            <input type="file" name="heroImage" accept="image/*" />
            {product?.heroImageUrl && (
              <FormControl.Caption>
                Current image is set. Upload a new one to replace it.
              </FormControl.Caption>
            )}
          </FormControl>

          {product?.heroImageUrl && (
            <div style={{ position: 'relative', width: 200, aspectRatio: '4 / 3' }}>
              <Image
                src={product.heroImageUrl || '/placeholder.svg'}
                alt="Current hero"
                fill
                style={{ objectFit: 'cover', borderRadius: 'var(--borderRadius-medium)' }}
              />
            </div>
          )}

          <FormControl>
            <FormControl.Label>Gallery images</FormControl.Label>
            <input type="file" name="galleryImages" accept="image/*" multiple />
            <FormControl.Caption>
              Additional images are appended to the existing gallery.
            </FormControl.Caption>
          </FormControl>

          {gallery.length > 0 && (
            <Stack direction="horizontal" gap="condensed" wrap="wrap">
              {gallery.map((url) => (
                <div key={url} style={{ position: 'relative', width: 100, aspectRatio: '4 / 3' }}>
                  <Image
                    src={url || '/placeholder.svg'}
                    alt="Gallery image"
                    fill
                    style={{ objectFit: 'cover', borderRadius: 'var(--borderRadius-medium)' }}
                  />
                  {onRemoveGalleryImage && (
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => onRemoveGalleryImage(url)}
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        background: 'var(--bgColor-emphasis)',
                        color: 'var(--fgColor-onEmphasis)',
                        border: 'none',
                        borderRadius: 'var(--borderRadius-full)',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <XIcon size={12} />
                    </button>
                  )}
                </div>
              ))}
            </Stack>
          )}

          <FormControl>
            <FormControl.Label>Downloadable file</FormControl.Label>
            <input type="file" name="productFile" />
            {product?.fileName && (
              <FormControl.Caption>
                Current file: {product.fileName}. Upload a new one to replace
                it.
              </FormControl.Caption>
            )}
          </FormControl>

          <RadioGroup name="status" defaultValue={product?.status ?? 'draft'}>
            <RadioGroup.Label>Status</RadioGroup.Label>
            <FormControl>
              <Radio value="draft" />
              <FormControl.Label>Draft — hidden from the shop</FormControl.Label>
            </FormControl>
            <FormControl>
              <Radio value="active" />
              <FormControl.Label>Active — visible and purchasable</FormControl.Label>
            </FormControl>
          </RadioGroup>

          <Stack direction="horizontal" justify="space-between" align="center">
            <Button type="submit" variant="primary">
              {mode === 'create' ? 'Create product' : 'Save changes'}
            </Button>
            {onDelete && (
              <Button
                type="button"
                variant="danger"
                leadingVisual={TrashIcon}
                onClick={() => setConfirmingDelete(true)}
              >
                Delete product
              </Button>
            )}
          </Stack>
        </Stack>
      </form>

      {confirmingDelete && onDelete && (
        <Surface style={{ borderColor: 'var(--borderColor-danger-emphasis)' }}>
          <Stack direction="vertical" gap="normal" padding="normal">
            <Text weight="semibold">Delete this product?</Text>
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              This permanently deletes the product and its uploaded files. This
              cannot be undone.
            </Text>
            <Stack direction="horizontal" gap="normal">
              <Button
                variant="danger"
                onClick={() => onDelete()}
              >
                Yes, delete it
              </Button>
              <Button variant="invisible" onClick={() => setConfirmingDelete(false)}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Surface>
      )}
    </Stack>
  )
}
