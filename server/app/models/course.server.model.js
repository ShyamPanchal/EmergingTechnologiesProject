const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    },
    courseCode:{
        type: String,
        default: '',
        trim: true,
        required: 'Course code cannot be blank'
    },
    section: {
        type: String, default: '',
        trim: true
    },
    semester: {
        type: String, default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);
