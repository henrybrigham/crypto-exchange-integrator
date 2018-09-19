/* eslint no-console: 0 */
let gar     = global.appRoot;
let app     = require(`${gar}/server.js`);

app.use(function(req, res) {
  res.status(404).send('<h1>Error: 404</h1><p>Page not found</p>');
});

app.use(function(err, req, res) {
  console.log('ERROR!', err);
  res.status(500).send(err.toString());
});
