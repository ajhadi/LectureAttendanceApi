export default {
    "swagger": "2.0",
    "info": {"version": "1.0.0",
        "title": "Ilecture API",
        "contact": {
            "email": "ahmadhadijaelani@gmail.com"
        }
    },
    "host": "http://localhost:5001",
    "basePath": "/api",
    "tags": [
        {
            "name": "User",
            "description": "For user manager."
        },
        {
            "name": "Class",
            "description": "For Class Manager."
        },
        {
            "name": "Schedule",
            "description": "For Schedule Maneger"
        },
        {
            "name": "Attendance",
            "description": "For attendance sign."
        }
    ],
    "paths": {
        "/user/student": {
            "post": {
                "tags": [
                    "User"
                ],
                "summary": "Create new Student",
                "description": "Returns a single pet",
                "operationId": "getPetById",
                "consumes": [
                    "application/json"
                ],
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