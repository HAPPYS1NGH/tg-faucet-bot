import express from "express";
import { Bot } from "./bot";
import { Config } from "./config";

const app = express();
const port = Config.PORT;

const bot = new Bot();
bot.start();

app.get("/", (req, res) => {
    res.send("Hello, this is your Telegram Bot server!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
