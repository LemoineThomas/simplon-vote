/** Model user_vote
 * @module models/user
 * @requires mongoose
 */

const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * @name userSchema
 * @requires mongoose
 * @memberof module:models/user
 * @function
 * @param {array} - Propriétés de mon schéma
 */
const userSchema = mongoose.Schema({
    _id: {
        type: ObjectId
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)