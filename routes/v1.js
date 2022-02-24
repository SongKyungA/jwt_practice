const express = require('express')
const jwt = require('jsonwebtoken')

const { verifyToken } = require('./middleware.js')

const router = express.Router()

router.get('/token', async (req, res) => {
    try {
        // payload 부분 설정
        const token = jwt.sign({
            id: "내 SNS 사용자",
            nick: "consumer88",
            grade: "premium"
        }, 
        // verify signature에서 시크릿코드
        // process.env.JWT_SECRET = mysnsservice
        process.env.JWT_SECRET, {
            // 유효한 시간
            expiresIn: "60m",
            // 발급한 사람
            issure: "mySNS"
        })
        req.session.jwt = token
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token
        })
    } catch(err) {
        console.error(err)
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        })
    }
})

router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded)
})

module.exports = router