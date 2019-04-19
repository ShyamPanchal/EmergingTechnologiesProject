const users = require('../controllers/user.server.controller');
const data = require('../controllers/data.server.controller');
//
module.exports = function (app) {
    app.route('/api/logs/create').post(data.createLog);

    app.route('/api/logs/:id').get(data.readAllLogs);

    app.route('/api/comments/create').post(data.createComment);

    app.route('/api/comments/getFor/:id').get(data.getCommentsFor);
    
    app.route('/api/comments/getBy/:forId/:byId').get(data.getCommentsBy);

    app.route('/api/comments/:id').put(data.replaceComment).delete(data.deleteComment);

    app.route('/api/alerts/create').post(data.createAlert);

    app.route('/api/comments/:id').delete(data.deleteComment);

    app.route('/api/logs/:id').delete(data.deleteLog);

    app.route('/api/alerts/:id').delete(data.dismissAlert);

    app.route('/api/alerts/getAll').get(data.getAllAlerts);
    
    app.route('/api/patients/getAll').get(data.getAllPatients);
    
    app.route('/api/name/fullName/:id').get(data.getFullName);

    app.route('/api/videos/create').post(data.createVideo);

    app.route('/api/videos/getAll').get(data.readAllVideos);

    app.route('/api/videos/:id').delete(data.deleteVideo);

    app.route('/api/videos/:id').put(data.replaceVideo);
};
