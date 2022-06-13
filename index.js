const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("./lib/passport");
const passport_jwt = require("./lib/passport_jwt");
const { v4: uuidv4 } = require("uuid");
const router = require("./router");

const PORT = 8080;

const app = express();

app.use(methodOverride("_method"));

// Accepting Input
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set cookie parser, session and flash
app.use(cookieParser("NotSoSecret"));
app.use(
  session({
    secret: uuidv4(),
    cookie: { maxAge: 6000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Static files
app.use(express.static("public"));

// Set Templating Engine
app.use(expressLayouts);

app.use(passport.initialize());
app.use(passport.session());

app.set("layout", "./layouts/app");
app.set("view engine", "ejs");

// Middleware to pass `url` to locals variable so we can use it on view
app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  next();
});

// Router
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/admin`);
});
