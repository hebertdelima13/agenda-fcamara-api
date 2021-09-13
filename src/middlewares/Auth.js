const User = require('../models/User');

module.exports = {
    private: async (req, res, next) => {

        

        if(!req.query.token && !req.body.token && !req.headers.token) {
            return res.status(400).send({error: 'Token inválido'});
        }

        let token = '';

        if(req.query.token) {
            token = req.query.token;
        }

        if(req.body.token) {
            token = req.body.token;
        }

        if(req.headers.token) {
            token = req.headers.token;
        }

        if(token == '') {
            return res.status(400).send({error: 'Token inválido'});
        }

        const user = await User.findOne({token:token});

        if(!user) {
            return res.status(400).send({error: 'Token inválido'});
        }

        next();
    }
};