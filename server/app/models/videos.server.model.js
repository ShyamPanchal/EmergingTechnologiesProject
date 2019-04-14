const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideosSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'Created By field cannot be blank'
    },
    dismissed: {
        type: Boolean,
        default: false
    }
});
mongoose.model('Videos', VideosSchema);
