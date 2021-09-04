const User = require('../models/User');

module.exports = {
    info: async (req, res) => {

        let token = req.query.token;

        const user = await User.findOne({token}); 

        res.json({
            name: user.name,
            email: user.email,
        });
    },

    editAction: async (req, res) => {

    }
};