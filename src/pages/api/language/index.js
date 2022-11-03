import { serialize } from 'cookie'

const DEFAULT_LOCALE = 'en-US'

const PREFERRED_LOCALE_COOKIE = 'NEXT_LOCALE'

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getLanguage(req, res)
    case 'POST':
      return postLanguage(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed.' })
  }
}

const getLanguage = (req, res) => {
  const preferredLocale = req.cookies[PREFERRED_LOCALE_COOKIE] || ''
  return res.status(200).json({ preferredLocale, defaultLocale: DEFAULT_LOCALE })
}

const postLanguage = (req, res) => {
  const newPreferredLocale = req.body
  setCookie(res, PREFERRED_LOCALE_COOKIE, newPreferredLocale, { path: '/' })
  // res.redirect('/');
  return res.end()
}

export const setCookie = (res, name, value, options = {}) => {
  const stringValue = typeof value === 'object' ? String(Object.values(value)[0]) : String(value)
  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}
