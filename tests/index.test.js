const request = require('supertest');
const baseURL = 'http://localhost:4000'

describe("Root route test", () => {
    it("should return a status of 200 without errors", async () => {
        const response = await request(baseURL).get('/')
        expect(response.statusCode).toBe(200)
        expect(response.body.error).not.toBeDefined()
    })
    it("should provide the expected response in json format", async () => {
        const response = await request(baseURL).get('/')
        expect(response.body.response).toBe( "This is the root" )
        expect(response.body.hasOwnProperty('response')).toBe(true)
        expect(typeof response.body).toBe('object')
    })
})

