import express from 'express'
import path from 'path'
import { listTalks, listRatingsForTalk } from './db/talks.js'

const app = express()
const port = process.env.PORT || 5000
console.log('starting server on port ', port)

app.use(express.static(__dirname + '/../public'))

//serve ui
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

//serves back end
app.get('/talks', function(req, res) {
  listTalks().then(function(talks) { res.json(talks) })
})

app.get('/talks/:id', function(req, res) {
  listRatingsForTalk(req.params.id).then(function(talks) { res.json(talks) })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/404.html'));
})
app.listen(port)
