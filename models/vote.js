/** Model user_vote
 * @module models/vote
 * @requires mongoose
 */

const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

/**
 * @name voteSchema
 * @requires mongoose
 * @memberof module:models/vote
 * @function
 * @param {array} - Propriétés de mon schéma
 */
const voteSchema = mongoose.Schema({
    _id: {
        type: ObjectId
    },
    subject: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} n'est pas un entier"
        }
    },
    choices: {
        type: Array
    },
    nbVote: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} n'est pas un entier"
        }
    },
    createdBy: {
        type: ObjectId,
        ref: "user"
    },
    participants: {
        type: Array,
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'inprogress', 'finished'],
        default: "created"
    },

})

module.exports = mongoose.model('vote', voteSchema)