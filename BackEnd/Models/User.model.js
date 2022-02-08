const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { role } = require("../helpers/user.role");



const UserScheme = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [role.admin, role.student,role.superadmin],
        default: role.student,
        required: true
    }
})

UserScheme.pre('save', async function (next) {

    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()


    } catch (error) {
        next(error)

    }
})



UserScheme.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error

    }
}

const User = mongoose.model('user', UserScheme)
module.exports = User