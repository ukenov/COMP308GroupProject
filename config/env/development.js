//Development configuration options
//To sign the session identifier, use a secret string
module.exports = {
  //db: "mongodb://localhost/healthtrac-db",
  db: "mongodb+srv://asylhan:8rX99tFP5zykwFW@mongodbserver.hohag.mongodb.net/group7-db?retryWrites=true&w=majority",
  sessionSecret: "developmentSessionSecret",
  secretKey: "real_secret",
};
