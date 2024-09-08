const { required, ref } = require('joi');
const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },

}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;