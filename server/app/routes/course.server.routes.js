const users = require('../../app/controllers/user.server.controller');
const courses = require('../../app/controllers/course.server.controller');
//
module.exports = function (app) {
    app.route('/api/courses')
        .get(courses.list)
        .post(courses.create);
    app.route('/api/courses/:id')
        .get(courses.read)
        .put(courses.hasAuthorization, courses.
            update)
        .delete(courses.delete);
};
