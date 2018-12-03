#include <eosiolib/eosio.hpp>
#include <string>
#include <vector>

namespace twitchcontract {
   using namespace eosio;
   using std::string;
   using std::vector;

   const uint64_t participation_reward = 1;

   TABLE useritem {
      string      name;
      int64_t     value;
      string      creator;
   };

   TABLE userdata {
      string            username;
      uint64_t          messagecount = 0;
      uint64_t          tokens = 0;
      vector<useritem>  items;
   };

   CONTRACT twitch : public contract {
      public:
         using contract::contract;
         twitch(name receiver, name code, datastream<const char*> ds) 
            : contract(receiver, code, ds), _channel(receiver, receiver.value) {}

         // Increment Message - Registers and counts number of user messages.
         ACTION increment(name userchannel, string username);

         ACTION burntokens(name userchannel, string username, int64_t amount);

         ACTION spendtokens(name userchannel, string username, int64_t amount, string itemname);

         TABLE channels {
            uint64_t             channelname; // aka the owner
            vector<userdata>     users; // the users inside of this channel

            uint64_t primary_key() const { return channelname; }
         };

         typedef multi_index<"channels"_n, channels> channel;
      // Table References
      private:
         channel _channel;

         uint64_t get_user_position(name userchannel, string username);
   };
}

EOSIO_DISPATCH(twitchcontract::twitch, (increment)(spendtokens)(burntokens))