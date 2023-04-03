const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
require("dotenv").config();

const CONTACT_ID = process.env.CONTACT_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const MESSAGE = process.env.MESSAGE;

const client = new Client({
	authStrategy: new LocalAuth({
		clientId: CLIENT_ID,
		dataPath: "./session",
	}),
});

client.initialize();

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
	console.log(`Cliente ${client.info.me.user} iniciado ✅`);
});

client.on("message", async (message) => {
	if (message.body.toLowerCase() === "bot") {
		contact = await client.getContactById(CONTACT_ID);
		client.sendMessage(message.from, MESSAGE);
		client.sendMessage(message.from, contact);
	}
});
