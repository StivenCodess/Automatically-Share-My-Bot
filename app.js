const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
require("dotenv").config();

const CONTACT_ID = process.env.CONTACT_ID;

/* CLIENT_ID and MESSAGE variables are completely optional, you can remove them and simply replace them with strings. */
const CLIENT_ID = process.env.CLIENT_ID;
const MESSAGE = process.env.MESSAGE;

const client = new Client({
	authStrategy: new LocalAuth({
		clientId: CLIENT_ID /* Here you can replace it with "client name of your choice". */,
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
		client.sendMessage(
			message.from,
			MESSAGE
		); /* Here you can replace it with "messsage of your choice".*/
		client.sendMessage(message.from, contact);
	}
});
