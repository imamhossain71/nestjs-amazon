// import { Tomorrow } from "next/font/google"

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || 'Next.js App Directory Template'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A Next.js app directory template with Tailwind CSS, TypeScript, and more.'
export const APP_COPYRIGTHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGTHT ||
  `© Copyright 2025  ${APP_NAME}. All rights reserved.`
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN ||
  'Your Next.js app, beautifully styled with Tailwind CSS.'

export const PAGE_SIZE = Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 9)
export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.NEXT_PUBLIC_FREE_SHIPPING_MIN_PRICE || 35
)
export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: 'PayPal',
    commission: 0,
    isDefault: true,
  },
  { name: 'Stripe', commission: 0, isDefault: true },
  { name: 'Cash on Delivery', commission: 0, isDefault: true },
]
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'
export const AVAILABLE_DELIVERY_DATES = [
  {
    name: 'tomorrow',
    daysToDeliver: 1,
    shippingprice: 12.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 3 days',
    daysToDeliver: 3,
    shippingprice: 6.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 5 days',
    daysToDeliver: 5,
    shippingprice: 4.9,
    freeShippingMinPrice: 35,
  },
]
