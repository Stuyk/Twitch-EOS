const settings        = require("../chat_properties");

var message_service = {
   greet_new_user: greet_new_user,
   send_chat_back: send_chat_back
}

module.exports = message_service;

function greet_new_user(client, channel, username) {
   client.say(channel, `Hello ${username}, welcome to the chat!`);
}

function send_chat_back(client, channel, username, response) {
   client.say(channel, `${settings.props.respond_prfx}${response}`);
};