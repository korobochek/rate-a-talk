var express = require('express');
var path = require('path')

const app = express();
const port = 3000;

//app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../views/index.html'));
});

app.get('*', function(req, res) {
  res.json({ 'route': 'Sorry this page does not exist!' });
});
app.listen(port);
