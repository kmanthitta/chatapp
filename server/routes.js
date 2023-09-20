const express = require("express");
const router = express.Router();

const register = require("./routes/register");
const chat = require("./routes/chat").router;
const find = require("./routes/find");
const login = require("./routes/login");

router.use("/register", register);

router.use("/login", login);

router.use("/chat", chat);

router.use("/find", find);

module.exports = router;
