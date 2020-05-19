const http = require('http');
const app = require('./app');

// const port = process.env.PORT || 8080;

const server = http.createServer(app);
// var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log("App now running on port", port);
//   });
server.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
