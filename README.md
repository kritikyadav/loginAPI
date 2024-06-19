# loginAPI
NodeJS with ExpressJS and MongoDB small project. 

This repository contains a Node.js application implementing a login API using Express.js and MongoDB for backend storage. To get started, ensure you have Node.js, Express.js, and MongoDB installed on your system. Begin by cloning the repository from your preferred Git hosting service. Navigate into the cloned directory and install the necessary dependencies using npm install.

For MongoDB setup, ensure your local MongoDB server is running, and update the MongoDB connection URI in script.js to point to your database (mongodb://localhost:27017/). Create a .env file in the root directory and define a CLIENT_SECRET variable containing your chosen client secret text, ensuring it remains confidential (CLIENT_SECRET=placeClientSecretHere_whichMeansAnyTextAllowed).

Start the server with npm start, and it will run on http://localhost:5000. The API supports several endpoints: /register for user registration, /login for authentication and JWT token generation, and /logout to clear the token and log out the user. Middleware function isAuthenticated verifies user authentication by checking the JWT token stored in an HTTP-only cookie.

The directory structure includes a public/ folder for static assets like CSS and images, views/ for EJS view templates, script.js as the main server script, .env for environment variables, and README.md for this project README file.

Notes include the use of bcrypt for password hashing and JWT for token generation. Remember to keep your CLIENT_SECRET secure and avoid exposing it in your codebase. This project is licensed under the MIT License. Refer to the LICENSE file for more details.

# Login API using Node.js, Express.js, and MongoDB

This repository contains a simple login API implemented using Node.js, Express.js, and MongoDB. It provides basic authentication functionality with user registration, login, and logout features.

## Requirements

- Node.js
- Express.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. Install dependencies: npm install
3. Set up MongoDB:
    Make sure MongoDB is installed and running on your local machine. Update the MongoDB connection URI in script.js:
       mongoose.connect("mongodb://localhost:27017/", {
          dbName: "backend",
      })
4. Set up environment variables: Create a .env file in the root directory and define a CLIENT_SECRET variable:
   CLIENT_SECRET=placeClientSecretHere_whichMeansAnyTextAllowed
5. Start the server: npm start. This will start the server at http://localhost:5000.

Usage
Register: Navigate to /register to register a new user with a unique username and email address.

Login: Navigate to /login to log in using registered credentials. After successful login, a JWT token is generated and stored in a HTTP-only cookie.

Logout: Navigate to /logout to clear the JWT token and log out the user.

API Endpoints
POST /signup: Register a new user with username, email, and password.

POST /login: Authenticate user and generate a JWT token.

GET /logout: Clear the JWT token and log out the user.

Middleware
isAuthenticated: Middleware function to check if the user is authenticated by verifying the JWT token in the cookie.

Directory Structure:
├── public/              # Static files (e.g., CSS, images)
├── views/               # EJS view templates
├── script.js            # Main server script
├── .env                 # Environment variables
└── README.md            # Project README file

Notes
This API uses bcrypt for password hashing and jwt for token generation.
Ensure to keep your CLIENT_SECRET secure and do not expose it in your codebase.
