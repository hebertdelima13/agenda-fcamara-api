const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');


module.exports = {
    signin: async (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(300).json({error: 'Dados inválidos!'});
        }

        const data = matchedData(req);

        // Validando o e-mail

        const user = await User.findOne({email: data.email});

        if(!user) {
            return res.status(301).json({error: 'E-mail ou senha inválido!'});
        }

        // Validando a senha

        const match = await bcrypt.compare(data.password, user.passwordHash);

        if(!match) {
            return res.status(302).json({error: 'E-mail ou senha inválido!'});
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        user.token = token;
        await user.save();

        res.json({token, email:data.email});

    },

    signup: async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(300).json({error: 'Dados inválidos!'});
        }

        const data = matchedData(req);

        // Verificando se e-mail já existe

        const user = await User.findOne({
            email: data.email
        });

        if (user) {
            return res.status(303).json({error: 'E-mail já existe!'});
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User ({
            name: data.name,
            email: data.email,
            passwordHash,
            token
        });

        await newUser.save();

        res.json({token});
    }
};