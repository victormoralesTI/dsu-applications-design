import { createClient } from 'contentful'

export const clientContentful = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  // space: 'process.env.CONTENTFUL_SPACE_ID',
  // accessToken: 'process.env.CONTENTFUL_ACCESS_KEY',
})
