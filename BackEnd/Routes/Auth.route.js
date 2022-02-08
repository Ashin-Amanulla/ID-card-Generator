const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.model')
const { authJoi,authLoginJoi } = require('../helpers/validation_schema')
const { signAccessToken,
    signRefreshToken,
    verifyRefreshToken } = require('../helpers/jwt_helper')


// SignIn

router.post('/register', async (req, res, next) => {

    try {

        console.log(req.body)
        const result = await authJoi.validateAsync(req.body) //Joi Validation for incoming registeration details

        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) throw createError.Conflict(`${result.email} is already been registered`)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)

        res.send({ accessToken, refreshToken })

    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

// login

router.post('/login', async (req, res, next) => {

    try {
        const result = await authLoginJoi.validateAsync(req.body)

        const user = await User.findOne({ email: result.email })
        if (!user) throw createError.NotFound("User Not Registered")


        const isMatch = await user.isValidPassword(result.password)
        console.log(isMatch, "isMatch")
        if (!isMatch) throw createError.Unauthorized('Username/password not valid')

        const accessToken = await signAccessToken(user.id,user.role)
        const refreshToken = await signRefreshToken(user.id,user.role)

        res.send({ accessToken, refreshToken,username: user.username , role: user.role})

    } catch (error) {
        if (error.isJoi === true) {
            return next(createError.BadRequest("Invalid Username/Password"))
        }
        next(error)
    }

})

//refresh token

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()

        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)

        res.send({ accessToken, refToken })

    } catch (error) {
        next(error)
    }
})


// Logout
router.delete('/logout', async (req, res, next) => {
    res.send("logout route")
})






module.exports = router;