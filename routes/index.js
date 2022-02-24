const express = require('express')
const router = express();

router.get('/', async (req, res, next) => {
    try {
        res.render('login', {})
    } catch(err) {
        console.error(err)
        next(err)
    }
})

module.exports = router