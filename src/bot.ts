import { Telegraf as TelegramBot, Context } from "telegraf";
import { Config } from "./config";

export class Bot {
    private bot: TelegramBot;

    constructor() {
        this.bot = this.createTelegramBot();
    }

    public start() {
        this.bot.start(this.handleBotStart.bind(this));
        this.bot.command('menu', this.handleMenuCommand.bind(this));
        this.bot.launch();
        this.handleBotLaunch();
    }

    // -------------------------------PRIVATE--------------------------------- //

    private createTelegramBot() {
        const botToken = Config.TELE_BOT_TOKEN;
        return new TelegramBot(botToken);
    }

    private handleBotStart(ctx: Context) {
        ctx.reply(`GM Developers🌅 \n Let's get you the faucet you want.\n`, {
            reply_markup: {
                keyboard: [
                    [
                        { text: "🚀 Get Started" },
                        { text: "ℹ️ Info" },
                    ]
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    }

    private handleMenuCommand(ctx: Context) {
        ctx.reply("📋 Menu:", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Get Started", callback_data: 'get_started' },
                        { text: "Info", callback_data: 'info' }
                    ]
                ]
            }
        });
    }

    private handleBotLaunch() {
        console.log("Bot is up and running...");

        this.bot.on('text', (ctx) => {

            if (ctx.message.text === "🚀 Get Started") {
                this.handleGetStarted(ctx);
            } else if (ctx.message.text === "ℹ️ Info") {
                this.handleInfo(ctx);
            }
        });

        this.bot.action('get_started', (ctx) => this.handleGetStarted(ctx));
        this.bot.action('info', (ctx) => this.handleInfo(ctx));
    }

    private handleGetStarted(ctx: Context) {
        const webLink = Config.TELE_BOT_WEB_LINK;

        ctx.reply("Click the button below to get started:", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🚀 Get Started",
                            web_app: {
                                url: webLink,
                            },
                        },
                    ],
                ],
            },
        });
    }

    private handleInfo(ctx: Context) {
        ctx.reply("ℹ️ This bot helps you get Faucet on Arbitrum Sepolia. Connect the wallet and start using.");
    }
}
