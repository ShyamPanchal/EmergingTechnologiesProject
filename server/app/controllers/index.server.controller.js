// Create a new 'render' controller method
exports.render = function (req, res) {
    // Set the safe student object 
    const student = (!req.student) ? null : {
        _id: req.student.id,
        firstName: req.student.firstName,
        lastName: req.student.lastName,
        address: req.student.address,
        city: req.student.city,
        phoneNumber: req.student.phoneNumber,
        email: req.student.email,
        program: req.student.program
    };

    res.json({ message: 'controller working' });
};