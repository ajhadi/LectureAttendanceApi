export default {
    "swagger": "2.0",
    "info": {
        "description": "This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.",
        "version": "1.0.0",
        "title": "Ilecture API",
        "termsOfService": "http://localhost:5001",
        "contact": {
            "email": "ahmadhadijaelani@gmail.com"
        }
    },
    "host": "http://localhost:5001",
    "basePath": "/api",
    "tags": [
        {
            "name": "Authentication",
            "description": "Everything about your Pets"
        },
        {
            "name": "User",
            "description": "Access to Petstore orders"
        }
    ],
    "paths": {
        "/user/{username}": {
            "get": {
                "tags": [
                    "User"
                ],
                "summary": "Find pet by ID",
                "description": "Returns a single pet",
                "operationId": "getPetById",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "description": "ID of pet to return",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Pet not found"
                    }
                },
                "security": [
                    {
                        "api_key": []
                    }
                ]
            }
        },
    }
}