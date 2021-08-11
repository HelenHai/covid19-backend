const express = require('express');
const router = express.Router();

const {query} = require('../common/db')
const testSql = require('../model/testSql')

// response function
function responseJSON(res, ret) {
  if (typeof ret == 'undefined') {
    res.json({
      code: -1,
      msg: 'failure'
    })
  } else {
    res.json(ret)
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test API
router.get('/test',async function(req, res,next) {
  let params = req.query || req.params
  const ret = await query(testSql.test)
  res.json(ret)
})

module.exports = router
