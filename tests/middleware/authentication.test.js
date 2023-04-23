const isLoggedInCheck = require('../../app/middleware/authentication')

describe("Authentication middleware test", () => {

    beforeEach(() => {
        mockRequest = {
            header: (headerKey) => {
                return mockRequest[headerKey]
            }
        };
        mockResponse = {
            json: function (message) {
                this.message = message.message;
            },
            status: function (responseStatus) {
                this.statusCode = responseStatus;
                return this;
            },
            statusCode: null,
            message: null
        };
        mockNext = jest.fn();
    });

    it("should return a status of 401 if no token found in headers", async () => {
        isLoggedInCheck(mockRequest, mockResponse, mockNext)
        expect(mockResponse.statusCode).toBe(401)
        expect(mockResponse.message).toBe("No token found, authorisation denied")
    });

    it("should return a status of 401 if an invalid token is found in headers", async () => {
        mockRequest['x-auth-token'] = '1234';
        isLoggedInCheck(mockRequest, mockResponse, mockNext)
        expect(mockResponse.statusCode).toBe(401)
        expect(mockResponse.message).toBe('Token provided is not valid, authorisation denied')
    });
    it("should return a valid req.user value if a valid token is found in headers", async () => {
        mockRequest['x-auth-token'] = process.env.PERMANENT_JWT;
        isLoggedInCheck(mockRequest, mockResponse, mockNext)
        expect(mockRequest.user.id).toBe('63ef88ccb6002c2b43228f4d')
        expect(mockRequest.user.username).toBe('testuser5')
    })
    it("should return a status of 500 if error occurs in try block", () => {
        jest.spyOn(console, 'error')
        console.error.mockImplementation(() => null);

        mockRequest['x-auth-token'] = process.env.PERMANENT_JWT;
        mockNext = null;
        isLoggedInCheck(mockRequest, mockResponse, mockNext)
        expect(mockResponse.statusCode).toBe(500)
    })

})