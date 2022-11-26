import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Test EndPoint API Response', () => {
  it('Should Get API StatusCode 200', async () => {
    const response = await request.get(
      '/api/images/?filename=fjord&width=500&height=500'
    )
    expect(response.statusCode).toBe(200)
  })
  it('Should NOT Sharp Image when (inValid URL)', async () => {
    const urlValid = await request.get('/api/images/')
    expect(urlValid.statusCode).toBe(400)
  })
})
