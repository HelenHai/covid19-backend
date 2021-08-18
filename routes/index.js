const express = require('express');
const router = express.Router();

const {query} = require('../common/db')
const testSql = require('../model/testSql')
const sql = require('../model/sql')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test API
router.get('/test',async function(req, res,next) {
  let params = req.query || req.params
  try{
    const ret = await query(testSql.test)
    res.json({
      code: 200,
      data: ret,
      msg: "success"
    })
  } catch (e) {
    console.error(e)
    res.json({
      code: -1,
      msg: 'Exception Error'
    })
  }
})

// API - get Variant Data
router.get('/getVariantsData',async function(req, res,next) {
    try{
        const ret = await query(`SELECT * FROM variants WHERE entity='${req.query.name}'`)
        if (ret.length) {
            res.json({
                code: 0,
                data: ret,
                msg: "success"
            })
        } else {
            res.json({
                code: 1,
                data: ret,
                msg: "No Variants information in this area"
            })
        }

    } catch (e) {
        console.error(e)
        res.json({
            code: -1,
            msg: 'Exception Error'
        })
    }
})

// API - lati-longti
router.get('/getNumbers', async (req,res,next)=>{
    try{
        const ret = await query(`SELECT * FROM country_cases WHERE country='${req.query.name}'`)
        res.json({
            code: 0,
            data: ret,
            msg: "success"
        })
    } catch (e) {
        console.error(e)
        res.json({
            code: -1,
            msg: 'Exception Error'
        })
    }
})

module.exports = router
