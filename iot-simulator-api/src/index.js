import loadConfig from './config'

const config = loadConfig()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({port: config.port})
console.log('WS server started')

MongoClient.connect(config.mongodbUrl, (err, db) => {
  assert.equal(null, err)
  const collection = db.collection('measurements')
  console.log('Connected to database')

  wss.on('connection', (ws) => {
    console.log('New WS client connected')
    collection.find({}, {a: 1, createdAt: 1, _id: 0}).sort({'_id': -1}).limit(10).toArray((err, docs) => {
      assert.equal(err, null)
      docs.reverse().forEach((message) => {
        ws.send(JSON.stringify(message))
      })
    })

    ws.on('message', (message) => {
      console.log('Got WS message')
      let doc = JSON.parse(message)
      doc.createdAt = new Date()

      wss.clients.forEach((conn) => {
        conn.send(JSON.stringify(doc))
      })

      collection.insertOne(doc, (err, result) => {
        assert.equal(err, null)
        console.log('Inserted measurement: %j', doc)
      })
    })
  })
})
