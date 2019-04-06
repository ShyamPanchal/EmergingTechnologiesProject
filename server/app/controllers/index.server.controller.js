// Create a new 'render' controller method
exports.render = function (req, res) {
    // Set the safe user object 
    const user = (!req.user) ? null : {
        _id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: req.user.address,
        city: req.user.city,
        phoneNumber: req.user.phoneNumber,
        email: req.user.email,
        isNurse: req.user.isNurse
    };

    res.json({ message: 'controller working' });
};