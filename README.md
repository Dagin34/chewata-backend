# Chewata Backend

This is the backend server for Chewata Chat, a real-time chatting application built with Express, MongoDB, and Socket.IO. It handles user authentication, messaging, and real-time notifications.

## Features
- **User Authentication:** Signup, login, logout, and profile management.
- **Real-Time Messaging:** Built with Socket.IO for instant message delivery.
- **Image Uploads:** Integrated with Cloudinary for profile picture and message image uploads.
- **RESTful APIs:** For users and messages.

## Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- A [Cloudinary](https://cloudinary.com/) account

## Environment Variables
Create a `.env` file at the project root with:
JWT_SECRET=<your_jwt_secret> 
MONGODB_URI=<your_mongodb_connection_uri> 
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name> 
CLOUDINARY_API_KEY=<your_cloudinary_api_key> 
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret> 
PORT=5200 NODE_ENV=production


## Installation
1. Clone the repository.
2. Navigate to the `chewata-backend` directory:
    ```sh
    cd chewata-backend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Development
Run in development mode with auto-reload:
```sh
npm run dev
```

## Production Build & Deployment
To start the server in production mode, run:
```sh
npm start
```

Deployment Tips:

1. Use a process manager like PM2 or Docker for containerization.
2. Ensure proper environment variable configuration.
3. Enable HTTPS and adjust CORS settings as needed.

## License
Licensed under the ISC License.

## Contact
For issues or questions, please open an issue in the repository or contact the developer.