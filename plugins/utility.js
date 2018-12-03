var settings = require("../chat_properties");

var utility = {
   is_message_command: is_message_command
};

module.exports = utility;

// Actual Code:
function is_message_command(message) {
   if (message.charAt(0) == settings.props.command_prfx)
      return true;
   return false;
};