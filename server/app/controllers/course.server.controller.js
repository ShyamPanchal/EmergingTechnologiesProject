const mongoose = require('mongoose');
const Course = mongoose.model('Course');
//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course(req.body.course);
    course.creator = req.body.user;
    console.log(course);
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    Course.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            courseName: req.body.course.courseName,
            courseCode: req.body.course.courseCode,
            semester: req.body.course.semester,
            creator: req.body.user,
            section: req.body.course.section
        }
    },function(err, result){
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
};
//
exports.delete = function (req, res) {
    console.log(req.params.id);
    Course.remove({_id: req.params.id}, function(err,result){
        console.log(err);
        console.log(result);
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
};
//The hasAuthorization() middleware uses the req.course and req.user objects
//to verify that the current user is the creator of the current course
exports.hasAuthorization = function (req, res, next) {
    console.log(req.body.course);
    if (req.body.course.creator._id != req.body.user._id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

exports.list = function (req, res) {
    Course.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, courses) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};