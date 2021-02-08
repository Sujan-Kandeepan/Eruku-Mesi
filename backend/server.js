const app = require('./setup.js');

app.listen(app.PORT, function () {
  console.log("Server is running on port: " + app.PORT);
});