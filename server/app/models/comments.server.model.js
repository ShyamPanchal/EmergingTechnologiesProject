const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentsSchema = new Schema({
    dailyTips: {
        type: String,
        default: '',
        trim: true
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Created By field cannot be blank'
    },
    createdFor: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Created For field cannot be blank'
    }
});
mongoose.model('Comments', CommentsSchema);
