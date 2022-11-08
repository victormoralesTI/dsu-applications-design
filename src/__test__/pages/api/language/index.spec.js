import { createMocks } from 'node-mocks-http'
import apiLanguageHandler, { setCookie } from '../../../../pages/api/language'

describe('API Language endpoint', () => {
  describe('Test handler', () => {
    it('should return a 405 status code when invalid method is sent', () => {
      const { req, res } = createMocks({ method: 'PUT' })
      apiLanguageHandler(req, res)
      expect(res._getStatusCode()).toBe(405)
      expect(JSON.parse(res._getData())).toEqual({ message: 'Method not allowed.' })
    })
  })

  describe('GET /api/language', () => {
    it('should return default locale', async () => {
      const { req, res } = createMocks({ method: 'GET' })
      await apiLanguageHandler(req, res)
      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual({ preferredLocale: '', defaultLocale: 'en-US' })
    })
  })

  describe('POST /api/language', () => {
    it('should change preferred locale to "es"', async () => {
      const { req, res } = createMocks({ method: 'POST', body: { newPreferredLocale: 'es' } })
      await apiLanguageHandler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(res.getHeaders()).toEqual({ 'set-cookie': 'NEXT_LOCALE=es; Path=/' })
      expect(res._isEndCalled()).toBe(true)
    })

    it('should parse preferred locale when is format as an object.', async () => {
      const { res } = createMocks({ method: 'POST' })
      setCookie(res, 'NEXT_LOCALE', 'fr', { path: '/' })
      expect(res.getHeaders()).toEqual({ 'set-cookie': 'NEXT_LOCALE=fr; Path=/' })
    })

    it('should set object as {} when options is not defined', async () => {
      const { res } = createMocks({ method: 'POST' })
      setCookie(res, 'NEXT_LOCALE', { language: 'fr' })
      expect(res.getHeaders()).toEqual({ 'set-cookie': 'NEXT_LOCALE=fr' })
    })
  })
})
