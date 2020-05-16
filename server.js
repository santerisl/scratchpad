const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const shortid = require('shortid')
const PORT = process.env.PORT || 3000

const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(__dirname + '/dist/scratchpad/'));

sqlite.open({
  filename: ':memory:',
  driver: sqlite3.Database
}).then(async (db) => {
  await db.exec('CREATE TABLE IF NOT EXISTS scratchpad (id TEXT PRIMARY KEY, name TEXT)')

  for(var i = 0; i < 10; i++) {
    await db.run('INSERT INTO scratchpad(id, name) VALUES (:id, :name)', {
      ':id': shortid.generate(),
      ':name': 'sp'+i
    })
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })

  app.get('/api', (req, res) => {
    db.all('SELECT * FROM scratchpad').then(result => {
      res.send(result)
    })
  });

  app.get('/api/:id', (req, res) => {
    db.get('SELECT name FROM scratchpad WHERE id = ?', req.params.id).then(result => {
      if(result) {
        res.send({ name: result.name })
      } else {
        res.sendStatus(404);
      }
    })
  });
})
