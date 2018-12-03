const eos             = require("../eos/eos_hook");
const message_service = require("./message_service");
const account         = require("./account");
const utility         = require("./utility");
const settings        = require("../chat_properties");

var commands = {
   parse_message:    parse_message
};

module.exports = commands;

function parse_message(client, channel, username, message) {
   var parsed = message.split(" ");

   if (parsed[0] == "!burn") {
      if (parsed[1] == undefined)
         return;

      eos.burn_tokens(client, channel, username, parsed[1]);
   }

   if (parsed[0] == "!buyitem") {
      if (parsed[1] == undefined)
         return;

      if (parsed[2] == undefined)
         return;

      eos.buy_item(client, channel, username, parsed[1], parsed[2]);
   }

   
   
   
   
   /*
   if (account.get_user_count() <= 0)
      return;

   var user = account.get_user_info(username);
   var prfx = settings.props.command_prfx;

   if (user == undefined)
      return;

   switch(message.toLowerCase()) {
      case `${prfx}message_count`:
         message_service.send_chat_back(client, channel, username, `${username}'s message count is: ${user.message_count}`);
         return;
      case `${prfx}money`:
         message_service.send_chat_back(client, channel, username, `${username}'s currency count is: ${user.crypto}`);
         return;
      /*
      case `${settings.props.command_prfx}claim`:
         if (!check_if_reward_is_ready(username)) {
            send_chat_message_back(channel, username, `${username} your reward is not ready.`);
            return;
         }
         claim_reward(username);
         send_chat_message_back(channel, username, `${username} has claimed their reward for the last minute!`);
         return;
      case `${settings.props.command_prfx}dice`:

         return;
      */
   
}