const accountSid = process.env.ACCOUNT_SID || "";
const authToken = process.env.AUTH_TOKEN || "";

const messageSenderNumber = process.env.MESSAGE_SENDER_NUMBER || "";
const messageRecipientNumber = process.env.MESSAGE_RECIPIENT_NUMBER || "";

const client = require("twilio")(accountSid, authToken);

export class TwilioService {
  public async sendSmsNotification() {
    await client.messages.create({
      from: messageSenderNumber,
      to: messageRecipientNumber,
      body: "Oba!\nSeu pedido Tauste já saiu para entrega!",
    });
  }
}
