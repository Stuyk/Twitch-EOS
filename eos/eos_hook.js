const { Api, JsonRpc, RpcError, JsSignatureProvider } = require("eosjs");
const fetch = require("node-fetch"); 
const { TextDecoder, TextEncoder } = require('text-encoding');
const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const signatureProvider = new JsSignatureProvider(["5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"]); // This key is a developer key so it's fine being compromised.
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

var eoshook = {
   add_user_to_table: add_user_to_table,
   burn_tokens      : burn_tokens,
   buy_item         : buy_item
}

module.exports = eoshook;

// Add a new user to the table.
function add_user_to_table(client, channel, username) {
   var newchannel = channel.substring(1);

   const result = api.transact({
      actions: [{
         account: 'ultra',
         name: 'increment',
         authorization: [{
            actor: newchannel,
            permission: 'active'
         }],
         data: {
            userchannel: newchannel,
            username: username
         },
      }]
   }, {
      blocksBehind: 3,
      expireSeconds: 30,
   }).then((response) => {
      //var jsonResponse = JSON.stringify(response);

      console.log(response);
      client.say(channel, `${response.processed.id}`);
   });
};

function buy_item(client, channel, username, name, amount) {
   var newchannel = channel.substring(1);

   if (amount <= 0)
      return;

   const result = api.transact({
      actions: [{
         account: 'ultra',
         name: 'spendtokens',
         authorization: [{
            actor: newchannel,
            permission: 'active'
         }],
         data: {
            userchannel: newchannel,
            username: username,
            amount: amount,
            itemname: name
         },
      }]
   }, {
      blocksBehind: 3,
      expireSeconds: 30,
   }).then((response) => {
      if (response.processed.id.length > 10) {
         client.say(channel, `${username} just bought the item ${name}`);
      } else {
         client.say(channel, `${username} couldn't purchase ${name}`);
      }
   });
}

function burn_tokens(client, channel, username, amount) {
   var newchannel = channel.substring(1);

   if (amount <= 0)
      return;

   const result = api.transact({
      actions: [{
         account: 'ultra',
         name: 'burntokens',
         authorization: [{
            actor: newchannel,
            permission: 'active'
         }],
         data: {
            userchannel: newchannel,
            username: username,
            amount: amount
         },
      }]
   }, {
      blocksBehind: 3,
      expireSeconds: 30,
   }).then((response) => {
      if (response.processed.id.length > 10) {
         client.say(channel, `${username} just burned ${amount} tokens.`);
      } else {
         client.say(channel, `${username} burn failed.`);
      }
   });
};



// rows.[value].users.username or users.messagecount, etc.






/*
var newdata = rpc.get_table_rows({
   json: true,
   code: "ultra",
   scope: "ultra",
   table: "channels",
   table_key: "",
   lower_bound: "",
   upper_bound: "",
   limit: 500
}).then((response) => {
   console.log(response);

   console.log(response.rows[0].users);

   
});
*/
