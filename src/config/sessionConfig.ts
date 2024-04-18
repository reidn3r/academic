module.exports = {
    // secret: process.env.SS_KEY,
    secret: "1337a6febd35ba93211b2b1a608ad3c5",
    httpOnly: true,
    secure: false,
    cookie: { secure: false },
    saveUninitialized: true,
    resave: false,
    maxAge: 3600
}