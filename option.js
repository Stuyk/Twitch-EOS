var token = require("./plugins/token");

const options = {
   options: {
      debug: true
   },
   connection: {
      reconnect: true
   },
   identity: {
      username: "stuykgaming",
      password: token.get_token()
   },
   channels: ['#stuykgaming']
};

module.exports = options;