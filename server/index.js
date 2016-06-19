import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import { listTalks, listRatingsForTalk } from './db/talks'
import { saveRating } from './db/ratings'

const app = express()
const port = process.env.PORT || 5000
console.log('starting server on port ', port)

app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json())

//serve ui
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

//serves back end
app.get('/talks', function(req, res) {
  listTalks().then(talks => res.json(talks))
})

app.get('/talks/:id', function(req, res) {
  listRatingsForTalk(req.params.id).then(talks => res.json(talks))
})

app.post('/ratings', function(req, res) {
  saveRating(req.body.rating, req.body.comment, req.body.talkId).then((rating) => {
    console.log('created a rating with details: ', { rating: req.body.rating, comment: req.body.comment, talkId: req.body.talkId })
    res.status(201).send()
  }).catch(error => {
    res.status(422).send(error)
  })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/404.html'));
})
app.listen(port)
