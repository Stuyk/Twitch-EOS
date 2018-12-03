#include <twitch/twitch.hpp>

namespace twitchcontract {
   ACTION twitch::burntokens(name userchannel, string username, int64_t amount) {
      require_auth(userchannel);

      eosio_assert(amount > 0, "cannot burn less than zero tokens.");

      uint64_t position = get_user_position(userchannel, username);

      auto chaninfo = _channel.find(userchannel.value);

      eosio_assert(chaninfo->users.at(position).tokens >= amount, "cannot burn what you don't have.");

      _channel.modify(chaninfo, userchannel, [&](channels& x) {
         x.users.at(position).tokens -= amount;
      });
   }

   ACTION twitch::spendtokens(name userchannel, string username, int64_t amount, string itemname) {
      require_auth(userchannel);

      eosio_assert(amount > 0, "cannot burn less than zero tokens.");

      uint64_t position = get_user_position(userchannel, username);

      auto chaninfo = _channel.find(userchannel.value);

      eosio_assert(chaninfo->users.at(position).tokens >= amount, "cannot burn what you don't have.");

      _channel.modify(chaninfo, userchannel, [&](channels& x) {
         x.users.at(position).tokens -= amount;
         x.users.at(position).items.push_back(useritem({itemname, amount, username}));
      });
   }

   ACTION twitch::increment(name userchannel, string username) {
      require_auth(userchannel);

      // Check if the channel exists yet.
      auto chaninfo = _channel.find(userchannel.value);
      bool get_new_info = false;

      // Add the new channel.
      if (chaninfo == _channel.end()) {
         _channel.emplace(userchannel, [&](channels& x) {
            x.channelname = userchannel.value;
         });

         get_new_info = true;
      }

      // Get the information again if it was just emplaced.
      if (get_new_info) {
         chaninfo = _channel.find(userchannel.value);
      }

      bool was_user_found = false;

      // Update the user information with a new message count.
      for (int64_t i = 0; i < chaninfo->users.size(); i++) {
         if (chaninfo->users.at(i).username != username)
            continue;

         _channel.modify(chaninfo, userchannel, [&](channels& x) {
            x.users.at(i).messagecount += 1;
            x.users.at(i).tokens       += participation_reward;
         });

         was_user_found = true;
         break;
      }

      if (!was_user_found) {
         _channel.modify(chaninfo, userchannel, [&](channels& x) {
            x.users.push_back(userdata({username, 1, 0}));
         });
      }
   }

   uint64_t twitch::get_user_position(name userchannel, string username) {
      // Get Channel Information
      auto channel_info = _channel.find(userchannel.value);
      eosio_assert(channel_info != _channel.end(), "channel was not found");

      bool response = false;
      uint64_t position = 0;

      // Get User Information
      for (auto i = 0; i < channel_info->users.size(); i++) {
         if (channel_info->users.at(i).username == username) {
            response = true;
            break;
         }
      }

      eosio_assert(response, "user does not exist.");
      return position;
   }
}

