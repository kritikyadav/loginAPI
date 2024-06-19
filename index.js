
import { name } from 'ejs';
import express from 'express';
// import path to use and find path of you files. 
import path from 'path';
// import mongodb used to connect to mongodb.
import mongoose from "mongoose";
// import this to get cookie. 
import cookieParser from 'cookie-parser';
// now to use json-web-token import jwt
import jwt from 'jsonwebtoken';
import { register } from 'module';

// import bcrypt for auth. 
import bcrypt from "bcrypt";

mongoose.connect("mongodb://localhost:27017/", {
    dbName: "backend",
}).then(() => console.log("Database Connected"))
    .catch(() => console.log(e))

// Now we need to created a pre-defined schema 
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

const User = mongoose.model("user", userSchema);



const app = express();
// path.resolve() provide solution main folder path then use join to provide your path. 
// C:\NodeJSlerning
// C:\NodeJSlerning\public
// express.static() Serve static files from the 'public' directory here.
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// setting up view engine. 
app.set("view engine", "ejs");

/**authentication done here. 
next is used to call next req,response method if true else stuck.
next(); Passing control to the next middleware
Middleware function*/
const isAuthenticated = async (req, res, next) => {
    // if cookie exist then true else false.
    const { token } = req.cookies;
    if (token) {
        // provide same client secred everywhere otherwise this will not work. 
        const decode = jwt.verify(token, "placeClientSecretHere_whichMeansAnyTextAllowed")
        // this will store user info in req.user and can be accesed from anywhere. 
        req.user = await User.findById(decode._id);
        next();
    } else {
        res.redirect("/login");
    }
}

// landing page. 
// this will first call isAuthenticated Middleware function where next method call will be called if cookie exist. 
// next function will render logout page. 
app.get("/", isAuthenticated, (req, res) => {
    console.log(req.user);
    // req.user.username.charAt(0).toUpperCase() + req.user.username.slice(1)
    // req.user.username.toUpperCase()
    res.render("logout", {
        username: req.user.username.charAt(0).toUpperCase() + req.user.username.slice(1)
        , email: req.user.email
        , userid: req.user._id
    });
})

// login route for creating cookie and login user.
app.post("/login", async (req, res) => {

    const clickedButton = req.body.action;
    console.log("Clicked button:", clickedButton);
    if (clickedButton === 'register') {
        res.redirect("/register");
    } else if (clickedButton === 'login') {
        const { username, email, password } = req.body;
        console.log(req.body);

        if (email != '' && password != '') {

            let userexists = await User.findOne({ email });

            if (userexists) {
                // creating a hash password to save in db.
                let isMatch = await bcrypt.compare(password, userexists.password);
                if (isMatch) {
                    const token = jwt.sign({
                        _id: userexists._id
                    }, "placeClientSecretHere_whichMeansAnyTextAllowed")
                    console.log(userexists._id);
                    // after insert data in db
                    res.cookie('token', token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 15 * 60 * 1000) // adds cookie for 15 minuts. 
                    });
                    res.redirect("/");
                } else {
                    console.log("Wrong Password.");
                    res.render("login", { email, message: "Incorrect Password." });
                }
            } else {
                console.log("register first.");
                res.render("register", { message: "Kindly register first." });
            }
        } else {
            console.log("Fill the required fields.");
            res.render("login", { message: "Fill all the required fields to login." });
        }
    }
})

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (username != '' && email != '' && password != '') {
        let userexists = await User.findOne({ email });
        if (!userexists) {

            // creating a hash password to save in db.
            const hashedPassword = await bcrypt.hash(password, 10);


            await User.create({
                username, email, password: hashedPassword
            })
            res.redirect("/login");
        } else {
            console.log("User already registered.");
            res.render("register", { message: "User already registered. Try different email." });
        }
    } else {
        console.log("Fill the required fields.");
        res.render("register", { message: "Fill all the required fields to login." });
    }
});
// logout route for clearing cookie and loging out user. 
app.get("/logout", (req, res) => {

    res.cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now())
    }
    );
    res.redirect("/");
});


app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});

