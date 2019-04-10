const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LogsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    bodyTemperature: {
        type: String,
        default: '',
        trim: true,
        required: 'Body Temperature cannot be blank'
    },
    heartRate:{
        type: String,
        default: '',
        trim: true,
        required: 'Heart Rate cannot be blank'
    },
    bloodPressure:{
        type: String,
        default: '',
        trim: true,
        required: 'Blood Pressure cannot be blank'
    },
    respiratoryRate:{
        type: String,
        default: '',
        trim: true,
        required: 'Respiratory Rate cannot be blank'
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
mongoose.model('Logs', LogsSchema);
