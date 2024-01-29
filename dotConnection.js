const { ConnectionBuilder } = require("electron-cgi");

let connection = null;

connection = new ConnectionBuilder()
  .connectTo("dotnet", "run", "--project", "./dotnetCore")
  .build();

connection.onDisconnect = () => {
  console.log("connection lost");
};

module.exports = {dotConnection: connection};
