const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require("fs");
const cors = require('cors')
const shortid = require('shortid')
const PORT = process.env.PORT || 3000

const db = require('better-sqlite3')(':memory:');

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(__dirname + '/dist/scratchpad/'))

const dbInit = fs.readFileSync('create.sql', 'utf8')
db.exec(dbInit);

const scratchpads = db.prepare('SELECT * FROM scratchpad')

const selectScratchpadAuth = db.prepare('SELECT auth FROM scratchpad WHERE id = ?');

const selectScratchpad = db.prepare('SELECT id, name FROM scratchpad WHERE id = ?');
const insertScratchpad = db.prepare('INSERT INTO scratchpad (id, auth, name) VALUES (:id, :auth, :name)')
const deleteScratchpad = db.prepare('DELETE FROM scratchpad WHERE id = ?')
const updateScratchpad = db.prepare('UPDATE scratchpad SET name = :name WHERE id = ?')

const insertItem = db.prepare('INSERT INTO item (content, time, sid) VALUES (:content, :time, ?)')
const deleteItem = db.prepare('DELETE FROM item WHERE sid = ? AND id = ?')
const updateItem = db.prepare('UPDATE item SET content = :content WHERE sid = ? AND id = ?')
const selectItems = db.prepare('SELECT id, content, time FROM item WHERE sid = ? ORDER BY time DESC')

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

app.get('/api/scratchpad', (req, res) => {
  res.send(scratchpads.all())
});

app.post('/api/scratchpad', (req, res) => {
  const data = {
    id: shortid.generate(),
    name: req.body.name || 'Scratchpad',
    auth: req.body.auth || null
  }
  insertScratchpad.run(data)
  res.status(201).send(data)
});


app.use('/api/scratchpad/:id', (req, res, next) => {
  const result = selectScratchpadAuth.get(req.params.id);
  if(!result) {
    res.sendStatus(404)
  } else if(result.auth && req.headers.authorization !== result.auth) {
    res.sendStatus(403)
  } else {
    next()
  }
})

app.delete('/api/scratchpad/:id', (req, res) => {
  const result = deleteScratchpad.run(req.params.id)
  res.sendStatus(result.changes > 0 ? 204 : 404)
})

app.put('/api/scratchpad/:id', (req, res) => {
  if(req.body.name) {
    const data = { name: req.body.name}
    const result = updateScratchpad.run(data, req.params.id)
    res.sendStatus( result.changes > 0 ? 204 : 404)
  } else {
    res.sendStatus(400)
  }
})

app.get('/api/scratchpad/:id', (req, res) => {
  const result = selectScratchpad.get(req.params.id);
  if(result) {
    res.send({...result, items: selectItems.all(req.params.id)})
  } else {
    res.sendStatus(404)
  }
});

app.post('/api/scratchpad/:id/items', (req, res) => {
  const item = {
    time: Date.now(),
    content: req.body.content || ''
  }
  const result = insertItem.run(item, req.params.id)
  if(result.changes > 0) {
    res.status(201).send({...item, id: result.lastInsertRowid})
  } else {
    res.sendStatu(404)
  }
});

app.delete('/api/scratchpad/:id/items/:itemId', (req, res) => {
  const result = deleteItem.run(req.params.id, req.params.itemId)
  res.sendStatus(result.changes > 0 ? 204 : 404)
})

app.put('/api/scratchpad/:id/items/:itemId', (req, res) => {
  if(req.body.content) {
    const data = { itemid: req.params.itemId, content: req.body.content}
    const result = updateItem.run(data, req.params.id, req.params.itemId)
    res.sendStatus(result.changes > 0 ? 204 : 404)
  } else {
    res.sendStatus(400)
  }
})
