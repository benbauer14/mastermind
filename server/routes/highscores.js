const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET high scores
  console.log('in get')
    const queryText = `SELECT * FROM highscores ORDER BY score desc`
    pool.query(queryText).then((response) => {
        console.log(response)
        res.send(response)
    }).catch((err) => {
        res.sendStatus(500)
        console.log(err)
    })
});

router.post('/', (req,res) => {
    //add new score
    console.log(req.body)
    const queryText = `INSERT INTO highscores ("name", "colors", "time", "score") VALUES ($1, $2, $3, $4)`
    pool.query(queryText, [req.body.name, req.body.colors, req.body.time, req.body.score]).then((response) =>{
        res.sendStatus(201)
    }).catch((err) =>{
        res.sendStatus(500)
    })
})

module.exports = router;
