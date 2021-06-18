const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET chat messages
  console.log('in get')
    const queryText = `SELECT * FROM highscores`
    pool.query(queryText).then((response) => {
        console.log(response)
        res.send(response)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
});

router.post('/newmessage', (req,res) => {
    console.log('new message', req.body)
    const queryText = `INSERT INTO chat ("toUser", "fromUser", "message") VALUES ($1, $2, $3)`
    pool.query(queryText, [req.body.payload, req.body.user, req.body.message]).then((response) =>{
        res.sendStatus(201)
    }).catch((err) =>{
        res.sendStatus(500)
    })
})

router.put('/', (req,res) => {
    const unread = req.query.unread
    console.log(unread)
    const queryText = `UPDATE "chat" SET "read"='TRUE' WHERE "id"=$1`
    pool.query(queryText, [req.query.unread]).then((response) =>{
        res.sendStatus(200)
    }).catch((err) => {
        res.sendStatus(500)
    })
})

module.exports = router;
