const settings = require("../chat_properties");

var account = {
   increment_message:   increment_message,
   emplace_user_info:   emplace_user_info,
   increment_currency:  increment_currency,
   get_user_info:       get_user_info,
   get_user_count:      get_user_count
};

module.exports = account;

function userinfo(username, message_count, crypto, last_message_time, last_reward_time) {
   return {
      username,
      message_count,
      crypto,
      last_message_time,
      last_reward_time
   };
};

var user_information = [];

function get_user_info(username) {
   return user_information.find(x => x.username === username);
}

function get_user_count() {
   return user_information.length;
}

function increment_message(username) {
   var user = get_user_info(username);
   
   if (user == undefined)
      return;

   user.message_count += 1;
}

function emplace_user_info(username) {
   var user = get_user_info(username);
   
   if (user != undefined)
      return;

   user_information.push(
      userinfo(
         username, 
         1, 
         10, 
         Date.now(), 
         Date.now()
      )
   );
}

function increment_currency(username) {
   var user = get_user_info(username);

   if (user == undefined)
      return;

   user.crypto += settings.props.crypto_gains;
}