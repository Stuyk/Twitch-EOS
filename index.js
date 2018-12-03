const eos            = require("./eos/eos_hook");
const options        = require("./option");
const settings       = require("./chat_properties");
const tmi            = require("tmi.js");
const defaultChannel = "#stuykgaming";


// Plugins
const account         = require("./plugins/account");
const message_service = require("./plugins/message_service");
const utility         = require("./plugins/utility");
const dice            = require("./plugins/dice");
const commands        = require("./plugins/commands");

const client = new tmi.client(options);
client.connect();
client.on("chat", onChatMessageEvent);

function onChatMessageEvent(channel, userstate, message, self) {
   if (self) 
      return;
  
   var isCommand = utility.is_message_command(message);

   

   if (!isCommand) {
      // Log new message:
      eos.add_user_to_table(client, channel, userstate.username);

      /*
      // Register a new user.
      if (account.get_user_info(userstate.username) == undefined) {
         account.emplace_user_info(userstate.username);
         message_service.greet_new_user(client, channel, userstate.username);
      } else {
      // Update an existing user.
         account.increment_message(userstate.username);
         account.increment_currency(userstate.username);
      }
      */
      return;
   }

   commands.parse_message(client, channel, userstate.username, message);
};
