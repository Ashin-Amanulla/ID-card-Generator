const mongoose = require('mongoose')
const Schema = mongoose.Schema


const idDetails_Scheme = new Schema({
    name: {
        type: String,
        required: [true, 'Name required !']
    },
    email: {
        type: String,
        required: [true, 'Email required !'],
    },
    number: {
        type: String,
        required: [true, 'Number required !'],
    },
    photo: {
        type: String,
        required: [true, 'Photo required !']
    },
    course_enrolled: {
        type: String,
        required: [true, 'Select Course']

    },
    date_applied: {
        type: Date,
        default: Date.now
    },
    admin_approve: {
        type: Boolean,
        default:false
    },
    admin_reject: {
        type: Boolean,
        default:false
    }
})

const idDetail = mongoose.model('id_detail',idDetails_Scheme)

module.exports = idDetail