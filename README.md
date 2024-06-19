# loginAPI
NodeJS with ExpressJS and MongoDB small project. 

This repository contains a Node.js application implementing a login API using Express.js and MongoDB for backend storage. To get started, ensure you have Node.js, Express.js, and MongoDB installed on your system. Begin by cloning the repository from your preferred Git hosting service. Navigate into the cloned directory and install the necessary dependencies using npm install.

For MongoDB setup, ensure your local MongoDB server is running, and update the MongoDB connection URI in script.js to point to your database (mongodb://localhost:27017/). Create a .env file in the root directory and define a CLIENT_SECRET variable containing your chosen client secret text, ensuring it remains confidential (CLIENT_SECRET=placeClientSecretHere_whichMeansAnyTextAllowed).

Start the server with npm start, and it will run on http://localhost:5000. The API supports several endpoints: /register for user registration, /login for authentication and JWT token generation, and /logout to clear the token and log out the user. Middleware function isAuthenticated verifies user authentication by checking the JWT token stored in an HTTP-only cookie.

The directory structure includes a public/ folder for static assets like CSS and images, views/ for EJS view templates, script.js as the main server script, .env for environment variables, and README.md for this project README file.

Notes include the use of bcrypt for password hashing and JWT for token generation. Remember to keep your CLIENT_SECRET secure and avoid exposing it in your codebase. This project is licensed under the MIT License. Refer to the LICENSE file for more details.
