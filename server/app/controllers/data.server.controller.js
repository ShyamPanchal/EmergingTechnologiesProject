const mongoose = require('mongoose');
const Logs = mongoose.model('Logs');
const Comments = mongoose.model('Comments');
const Alerts = mongoose.model('Alerts');
const User = mongoose.model('User');

//#region Logs

exports.createLog = function (req, res) {
    const log = new Logs(req.body);

    console.log("create log called with log: ");
    console.log(log);

    log.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.status(200).json(log);
        }
    });
}

exports.readAllLogs = function (req, res) {
    Logs.find({ createdFor: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    }).sort({ created: -1 });
}

//#endregion

//#region Comments

exports.createComment = function (req, res) {
    const comment = new Comments(req.body);

    console.log("create comment called with: ");
    console.log(comment);

    comment.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.status(200).json(comment);
        }
    });
}

exports.getCommentsFor = function (req, res) {
    Comments.find({ createdFor: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
}

exports.getCommentsBy = function (req, res) {
    console.log(req.params.forId);
    console.log(req.params.byId);
    Comments.find({ createdFor: req.params.forId, createdBy: req.params.byId }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
}

exports.replaceComment = function (req, res) {
    Comments.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
}

exports.deleteComment = function (req, res) {
    Comments.remove({ _id: req.params.id }, function (err, result) {
        console.log(err);
        console.log(result);
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
}

//#endregion

//#region Alerts
exports.createAlert = function (req, res) {
    const alert = new Alerts(req.body);

    console.log("create comment called with: ");
    console.log(alert);

    alert.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.status(200).json(alert);
        }
    });
}

exports.dismissAlert = function (req, res) {
    req.body.dismissed = true;
    Alerts.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            result.dismissed = true;
            res.json(result);
        }
    });
}

exports.getAllAlerts = function (req, res) {
    Alerts.find({dismissed: false},function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
}
//#endregion

//#region Extras
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

//#endregion