const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const { update } = require('../models/User');
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

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(500).json({error: 'Dados inválidos!'});
        }

        const data = matchedData(req);        

        let updates = {};

        if(data.name) {
            updates.name = data.name;
        }

        if(data.email) {
            const emailCheck = await User.findOne({email: data.email});

            if(emailCheck) {
                return res.status(500).json({error: 'E-mail já existe!'});
            }

            updates.email = data.email;
        }

        if(data.password) {
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }

        await User.findOneAndUpdate({token: data.token}, {$set: updates});
    }
};