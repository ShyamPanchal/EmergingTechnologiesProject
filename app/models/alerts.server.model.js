const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlertsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    alertString: {
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
mongoose.model('Alerts', AlertsSchema);
